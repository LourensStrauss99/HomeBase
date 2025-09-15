// Analytics page script
document.addEventListener('DOMContentLoaded', () => {
    // Check login
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

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

    // Load data
    const views = parseInt(localStorage.getItem('views')) || 0;
    const links = JSON.parse(localStorage.getItem('links')) || [];

    // Calculate totals
    const totalClicks = links.reduce((sum, link) => sum + link.count, 0);
    const clickRate = views > 0 ? ((totalClicks / views) * 100).toFixed(2) : 0;

    // Display overview
    document.getElementById('total-views').textContent = views;
    document.getElementById('total-clicks').textContent = totalClicks;
    document.getElementById('click-rate').textContent = clickRate + '%';

    // Display link stats
    const linkStats = document.getElementById('link-stats');
    links.forEach(link => {
        const statDiv = document.createElement('div');
        statDiv.innerHTML = `
            <p><strong>${link.name}</strong>: ${link.count} clicks</p>
        `;
        linkStats.appendChild(statDiv);
    });
});