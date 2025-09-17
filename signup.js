// Signup script with Firebase
document.addEventListener('DOMContentLoaded', () => {
    let isRedirecting = false;
    
    // Check if user is already logged in
    FirebaseUtils.onAuthStateChanged((user) => {
        if (user && !isRedirecting) {
            // User is signed in, redirect to admin
            isRedirecting = true;
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 100);
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'theme-light';
    document.body.className = savedTheme; // Replace all classes with saved theme

    // Theme change (if theme selector exists)
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = savedTheme;
        themeSelect.addEventListener('change', (e) => {
            const newTheme = e.target.value;
            document.body.className = newTheme;
            localStorage.setItem('theme', newTheme);
        });
    }

    // Password visibility toggles
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach((toggle, index) => {
        const passwordInput = index === 0 ? 
            document.getElementById('password') : 
            document.getElementById('confirm-password');
        
        if (toggle && passwordInput) {
            toggle.addEventListener('click', () => {
                const isPassword = passwordInput.type === 'password';
                
                // Toggle input type
                passwordInput.type = isPassword ? 'text' : 'password';
                
                // Toggle button class for styling
                toggle.classList.toggle('visible', isPassword);
                
                // Update aria-label for accessibility
                toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
            });
        }
    });

    // Photo upload preview functionality
    const profilePhotoInput = document.getElementById('profile-photo');
    const photoPreview = document.getElementById('photo-preview');
    const previewImage = document.getElementById('preview-image');
    const removePhotoBtn = document.getElementById('remove-photo');
    let selectedPhotoFile = null;

    if (profilePhotoInput) {
        profilePhotoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            
            if (file) {
                // Validate file size
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size must be less than 5MB');
                    profilePhotoInput.value = '';
                    return;
                }
                
                // Validate file type
                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Only JPG, PNG, GIF, and WebP files are allowed');
                    profilePhotoInput.value = '';
                    return;
                }
                
                // Show preview
                selectedPhotoFile = file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImage.src = e.target.result;
                    photoPreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Remove photo functionality
        if (removePhotoBtn) {
            removePhotoBtn.addEventListener('click', () => {
                selectedPhotoFile = null;
                profilePhotoInput.value = '';
                photoPreview.style.display = 'none';
                previewImage.src = '';
            });
        }
    }

    // Signup form
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.toLowerCase().trim();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        // Validate username
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            alert('Username can only contain letters, numbers, and underscores!');
            return;
        }
        
        if (username.length < 3 || username.length > 20) {
            alert('Username must be between 3-20 characters!');
            return;
        }
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // Validate password length
        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        try {
            // Check if username is already taken
            const usernameExists = await FirebaseUtils.checkUsernameExists(username);
            if (usernameExists) {
                alert('Username is already taken! Please choose a different one.');
                submitBtn.textContent = 'Sign Up';
                submitBtn.disabled = false;
                return;
            }
            
            const result = await FirebaseUtils.signUp(email, password);
            
            if (result.success) {
                // Upload profile photo if selected
                let photoURL = null;
                let photoPath = null;
                
                if (selectedPhotoFile) {
                    submitBtn.textContent = 'Uploading Photo...';
                    const photoResult = await FirebaseUtils.uploadProfilePhoto(result.user.uid, selectedPhotoFile);
                    
                    if (photoResult.success) {
                        photoURL = photoResult.url;
                        photoPath = photoResult.path;
                    } else {
                        console.warn('Photo upload failed:', photoResult.error);
                        // Continue without photo rather than failing signup
                    }
                }
                
                submitBtn.textContent = 'Saving Profile...';
                
                // Initialize user data in Firestore
                const userData = {
                    username: username,
                    email: email,
                    photoURL: photoURL,
                    photoPath: photoPath,
                    createdAt: new Date().toISOString(),
                    subscription: { plan: 'free', status: 'active' },
                    links: [],
                    analytics: {
                        totalViews: 0,
                        totalClicks: 0,
                        clickCounts: {}
                    }
                };
                
                console.log('Saving user data to Firestore:', userData);
                const saveResult = await FirebaseUtils.saveUserData(result.user.uid, userData);
                
                if (!saveResult.success) {
                    throw new Error('Failed to save user data: ' + saveResult.error);
                }
                
                // Also save username mapping for lookups
                console.log('Saving username mapping:', username, '→', result.user.uid);
                const mappingResult = await FirebaseUtils.saveUsernameMapping(username, result.user.uid);
                
                if (!mappingResult.success) {
                    console.warn('Failed to save username mapping:', mappingResult.error);
                }
                
                alert('Account created successfully! Your HomeBase link is: ' + window.location.origin + '/HomeBase/profile.html?user=' + username);
                window.location.href = 'admin.html';
            } else {
                alert('Signup failed: ' + result.error);
            }
        } catch (error) {
            alert('Signup error: ' + error.message);
        } finally {
            // Reset button state
            submitBtn.textContent = 'Sign Up';
            submitBtn.disabled = false;
        }
    });
});