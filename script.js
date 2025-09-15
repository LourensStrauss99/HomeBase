// Add interactivity to the links
document.addEventListener('DOMContentLoaded', () => {
    // Track page views
    let views = parseInt(localStorage.getItem('views')) || 0;
    views++;
    localStorage.setItem('views', views);

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
    let clickCounts = JSON.parse(localStorage.getItem('clickCounts')) || {};

    // Function to render links
    function renderLinks() {
        const linksContainer = document.querySelector('.links');
        linksContainer.innerHTML = '';
        links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'link';
            linkElement.innerHTML = `${link.name} <span class="count">${link.count}</span>`;
            linksContainer.appendChild(linkElement);
        });
        attachLinkEvents();
    }

    // Attach events to links
    function attachLinkEvents() {
        const linkElements = document.querySelectorAll('.link');
        linkElements.forEach((linkElement, index) => {
            const link = links[index];
            linkElement.addEventListener('click', (e) => {
                if (link.url === '#') {
                    e.preventDefault();
                }
                link.count++;
                linkElement.querySelector('.count').textContent = link.count;
                localStorage.setItem('links', JSON.stringify(links));
            });

            // Hover effects
            linkElement.addEventListener('mouseenter', () => {
                linkElement.style.transform = 'scale(1.05)';
            });
            linkElement.addEventListener('mouseleave', () => {
                linkElement.style.transform = 'scale(1)';
            });
        });
    }

    // Show add link section only in admin mode
    const addLinkSection = document.getElementById('add-link-section');
    if (window.location.search.includes('admin=true')) {
        addLinkSection.style.display = 'block';

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
    }

    // Initial render
    renderLinks();
});