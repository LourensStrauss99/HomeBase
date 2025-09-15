// Admin dashboard script
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

    // Default links
    const defaultLinks = [
        { name: 'Instagram', url: '#', count: 0 },
        { name: 'Twitter', url: '#', count: 0 },
        { name: 'YouTube', url: '#', count: 0 },
        { name: 'GitHub', url: '#', count: 0 }
    ];

    // Load links from localStorage or use defaults
    let links = JSON.parse(localStorage.getItem('links')) || defaultLinks;

    // Function to render links
    function renderLinks() {
        const linksContainer = document.getElementById('admin-links');
        linksContainer.innerHTML = '';
        links.forEach((link, index) => {
            const linkDiv = document.createElement('div');
            linkDiv.className = 'admin-link-item';
            linkDiv.innerHTML = `
                <span>${link.name}: ${link.url} (Clicks: ${link.count})</span>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            linksContainer.appendChild(linkDiv);
        });
        attachLinkEvents();
    }

    // Attach events to edit/delete buttons
    function attachLinkEvents() {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const newName = prompt('New name:', links[index].name);
                const newUrl = prompt('New URL:', links[index].url);
                if (newName && newUrl) {
                    links[index].name = newName;
                    links[index].url = newUrl;
                    localStorage.setItem('links', JSON.stringify(links));
                    renderLinks();
                }
            });
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                if (confirm('Delete this link?')) {
                    links.splice(index, 1);
                    localStorage.setItem('links', JSON.stringify(links));
                    renderLinks();
                }
            });
        });
    }

    // Add link functionality
    const addLinkBtn = document.getElementById('add-link-btn');
    const linkNameInput = document.getElementById('link-name');
    const linkUrlInput = document.getElementById('link-url');

    addLinkBtn.addEventListener('click', () => {
        const name = linkNameInput.value.trim();
        const url = linkUrlInput.value.trim();
        if (name && url) {
            links.push({ name, url, count: 0 });
            localStorage.setItem('links', JSON.stringify(links));
            renderLinks();
            linkNameInput.value = '';
            linkUrlInput.value = '';
        } else {
            alert('Please enter both name and URL.');
        }
    });

    // Initial render
    renderLinks();
});