// Login script with Firebase
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
    const savedTheme = localStorage.getItem('theme') || 'theme-default';
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

    // Login form
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        // Show loading state
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        try {
            const result = await FirebaseUtils.signIn(email, password);
            
            if (result.success) {
                alert('Logged in successfully!');
                window.location.href = 'admin.html';
            } else {
                alert('Login failed: ' + result.error);
            }
        } catch (error) {
            alert('Login error: ' + error.message);
        } finally {
            // Reset button state
            submitBtn.textContent = 'Login';
            submitBtn.disabled = false;
        }
    });
});