// Signup script with Firebase
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    FirebaseUtils.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, redirect to admin
            window.location.href = 'admin.html';
        }
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    document.body.classList.add(savedTheme);

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
        
        // Save theme preference
        const currentTheme = document.body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
        localStorage.setItem('theme', currentTheme);
    });

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