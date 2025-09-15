// Customize page script
document.addEventListener('DOMContentLoaded', () => {
    // Check Firebase authentication
    FirebaseUtils.onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }
        // Store user info for compatibility
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email
        }));
        // Initialize customize
        initializeCustomize(user);
    });

    function initializeCustomize(currentUser) {

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
        document.body.style.background = `url(${savedBg})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
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
                document.body.style.background = `url(${bgUrl})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                localStorage.setItem('background', bgUrl);
            };
            reader.readAsDataURL(file);
        }
    });

    // Remove background
    document.getElementById('remove-bg').addEventListener('click', () => {
        document.body.style.background = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundPosition = '';
        localStorage.removeItem('background');
    });
    }
});