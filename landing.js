// Landing page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme selector functionality
    const themeSelect = document.getElementById('theme-select');
    
    // Initialize theme from localStorage or default
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-default';
    document.body.className = savedTheme;
    themeSelect.value = savedTheme;
    
    // Handle theme changes
    themeSelect.addEventListener('change', function() {
        const selectedTheme = this.value;
        document.body.className = selectedTheme;
        localStorage.setItem('selectedTheme', selectedTheme);
    });
    
    // Check if user is already authenticated
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in, redirect to their profile
            window.location.href = 'profile.html';
        }
    });
    
    // Add smooth scrolling to auth links
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});