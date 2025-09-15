// Login script with Firebase
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