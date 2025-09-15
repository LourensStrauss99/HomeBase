// Customize page script
document.addEventListener('DOMContentLoaded', () => {
    // Check login
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    });

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

    // Theme selection
    document.getElementById('light-theme-btn').addEventListener('click', () => {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
    });

    document.getElementById('dark-theme-btn').addEventListener('click', () => {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    });

    // Background image
    document.getElementById('bg-image').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const bgUrl = reader.result;
                document.body.style.setProperty('--bg-image', `url(${bgUrl})`);
                document.body.classList.add('custom-bg');
                localStorage.setItem('background', bgUrl);
            };
            reader.readAsDataURL(file);
        }
    });

    // Remove background
    document.getElementById('remove-bg').addEventListener('click', () => {
        document.body.style.removeProperty('--bg-image');
        document.body.classList.remove('custom-bg');
        localStorage.removeItem('background');
    });
});