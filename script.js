// Add interactivity to the links
document.addEventListener('DOMContentLoaded', () => {
    // Social media icon detection function
    function detectSocialIcon(url) {
        const domain = url.toLowerCase();
        
        if (domain.includes('instagram.com') || domain.includes('ig.me')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg';
        } else if (domain.includes('twitter.com') || domain.includes('x.com') || domain.includes('t.co')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg';
        } else if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg';
        } else if (domain.includes('github.com') || domain.includes('git.io')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg';
        } else if (domain.includes('linkedin.com') || domain.includes('lnkd.in')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg';
        } else if (domain.includes('tiktok.com') || domain.includes('vm.tiktok.com')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tiktok.svg';
        } else if (domain.includes('facebook.com') || domain.includes('fb.me')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg';
        } else if (domain.includes('snapchat.com') || domain.includes('snap.com')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/snapchat.svg';
        } else if (domain.includes('discord.gg') || domain.includes('discord.com')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg';
        } else if (domain.includes('twitch.tv')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitch.svg';
        } else if (domain.includes('spotify.com') || domain.includes('spoti.fi')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg';
        } else if (domain.includes('pinterest.com') || domain.includes('pin.it')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pinterest.svg';
        } else if (domain.includes('reddit.com') || domain.includes('redd.it')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/reddit.svg';
        } else if (domain.includes('telegram.me') || domain.includes('t.me')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/telegram.svg';
        } else if (domain.includes('whatsapp.com') || domain.includes('wa.me')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/whatsapp.svg';
        } else if (domain.includes('paypal.com') || domain.includes('paypal.me')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/paypal.svg';
        } else if (domain.includes('venmo.com')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/venmo.svg';
        } else if (domain.includes('cashapp.com') || domain.includes('cash.me')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/cashapp.svg';
        } else if (domain.includes('medium.com')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/medium.svg';
        } else if (domain.includes('substack.com')) {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/substack.svg';
        } else {
            return 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/link.svg'; // Generic link
        }
    }

    // Track page views
    let views = parseInt(localStorage.getItem('views')) || 0;
    views++;
    localStorage.setItem('views', views);

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'theme-default';
    document.body.className = savedTheme; // Replace all classes with saved theme

    // Theme selector
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        // Set current theme in dropdown
        themeSelect.value = savedTheme;
        
        // Listen for theme changes
        themeSelect.addEventListener('change', (e) => {
            const newTheme = e.target.value;
            
            // Remove all theme classes
            document.body.className = '';
            
            // Add new theme class
            document.body.classList.add(newTheme);
            
            // Save theme preference
            localStorage.setItem('theme', newTheme);
        });
    }

    // Default links
    const defaultLinks = [
        { name: 'Instagram', url: '#', count: 0 },
        { name: 'X', url: '#', count: 0 },
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
            
            // Get icon for the link
            const iconSrc = link.icon || detectSocialIcon(link.url);
            
            linkElement.innerHTML = `
                <img src="${iconSrc}" alt="${link.name}" class="link-icon">
                <span class="link-text">${link.name}</span>
                <span class="count">${link.count}</span>
            `;
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