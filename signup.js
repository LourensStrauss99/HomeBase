// Sign up script
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }

    // Load saved background
    const savedBg = localStorage.getItem('background');
    if (savedBg) {
        document.body.style.setProperty('--bg-image', `url(${savedBg})`);
        document.body.classList.add('custom-bg');
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    });

    // Sign up form
    document.getElementById('signup-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple storage (not secure)
        const user = { username, email, password };
        localStorage.setItem('user', JSON.stringify(user));
        alert('Signed up successfully! You can now customize your HomeBase.');
        window.location.href = 'customize.html';
    });
});