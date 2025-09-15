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

    // Signup form
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
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
            const result = await FirebaseUtils.signUp(email, password);
            
            if (result.success) {
                // Initialize user data in Firestore
                const userData = {
                    email: email,
                    createdAt: new Date().toISOString(),
                    subscription: { plan: 'free', status: 'active' },
                    links: [],
                    analytics: {
                        totalViews: 0,
                        totalClicks: 0,
                        clickCounts: {}
                    }
                };
                
                await FirebaseUtils.saveUserData(result.user.uid, userData);
                
                alert('Account created successfully! Redirecting to admin panel...');
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