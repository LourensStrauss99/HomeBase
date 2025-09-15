// Login script
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

    // Login form
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username === username && user.password === password) {
            alert('Logged in successfully!');
            window.location.href = 'admin.html';
        } else {
            alert('Invalid credentials.');
        }
    });
});