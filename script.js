// Add interactivity to the links
document.addEventListener('DOMContentLoaded', () => {
    // Social media icon detection function using Simple Icons
    function detectSocialIcon(url) {
        const domain = url.toLowerCase();
        
        // Return the Simple Icons slug name for each platform
        if (domain.includes('instagram.com') || domain.includes('ig.me')) {
            return 'instagram';
        } else if (domain.includes('twitter.com') || domain.includes('x.com') || domain.includes('t.co')) {
            return 'x';
        } else if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
            return 'youtube';
        } else if (domain.includes('github.com') || domain.includes('git.io')) {
            return 'github';
        } else if (domain.includes('linkedin.com') || domain.includes('lnkd.in')) {
            return 'linkedin';
        } else if (domain.includes('tiktok.com') || domain.includes('vm.tiktok.com')) {
            return 'tiktok';
        } else if (domain.includes('facebook.com') || domain.includes('fb.me')) {
            return 'facebook';
        } else if (domain.includes('snapchat.com') || domain.includes('snap.com')) {
            return 'snapchat';
        } else if (domain.includes('discord.gg') || domain.includes('discord.com')) {
            return 'discord';
        } else if (domain.includes('twitch.tv')) {
            return 'twitch';
        } else if (domain.includes('spotify.com') || domain.includes('spoti.fi')) {
            return 'spotify';
        } else if (domain.includes('pinterest.com') || domain.includes('pin.it')) {
            return 'pinterest';
        } else if (domain.includes('reddit.com') || domain.includes('redd.it')) {
            return 'reddit';
        } else if (domain.includes('telegram.me') || domain.includes('t.me')) {
            return 'telegram';
        } else if (domain.includes('whatsapp.com') || domain.includes('wa.me')) {
            return 'whatsapp';
        } else if (domain.includes('paypal.com') || domain.includes('paypal.me')) {
            return 'paypal';
        } else if (domain.includes('venmo.com')) {
            return 'venmo';
        } else if (domain.includes('cashapp.com') || domain.includes('cash.me')) {
            return 'cashapp';
        } else if (domain.includes('medium.com')) {
            return 'medium';
        } else if (domain.includes('substack.com')) {
            return 'substack';
        } else {
            return 'globe'; // Generic link icon
        }
    }

    // Function to render SVG icon from Simple Icons
    function renderIcon(iconSlug) {
        // Check if Simple Icons is loaded and has the icon
        if (window.simpleIcons && window.simpleIcons[iconSlug]) {
            const icon = window.simpleIcons[iconSlug];
            return `<svg class="link-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <title>${icon.title}</title>
                        <path d="${icon.path}"></path>
                    </svg>`;
        }
        // Fallback to a generic icon
        return `<svg class="link-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <title>Link</title>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>
                </svg>`;
    }

    // Track page views
    let views = parseInt(localStorage.getItem('views')) || 0;
    views++;
    localStorage.setItem('views', views);

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'theme-light';
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

    // Default links - empty array for new users
    const defaultLinks = [];

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
            const iconSlug = link.icon || detectSocialIcon(link.url);
            const iconHtml = renderIcon(iconSlug);
            
            linkElement.innerHTML = `
                ${iconHtml}
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