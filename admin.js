// Admin dashboard script
document.addEventListener('DOMContentLoaded', () => {
    // Social media platform name detection function
    function detectPlatformName(url) {
        const domain = url.toLowerCase();
        
        if (domain.includes('instagram.com') || domain.includes('ig.me')) {
            return 'Instagram';
        } else if (domain.includes('twitter.com') || domain.includes('x.com') || domain.includes('t.co')) {
            return 'X';
        } else if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
            return 'YouTube';
        } else if (domain.includes('github.com') || domain.includes('git.io')) {
            return 'GitHub';
        } else if (domain.includes('linkedin.com') || domain.includes('lnkd.in')) {
            return 'LinkedIn';
        } else if (domain.includes('tiktok.com') || domain.includes('vm.tiktok.com')) {
            return 'TikTok';
        } else if (domain.includes('facebook.com') || domain.includes('fb.me')) {
            return 'Facebook';
        } else if (domain.includes('snapchat.com') || domain.includes('snap.com')) {
            return 'Snapchat';
        } else if (domain.includes('discord.gg') || domain.includes('discord.com')) {
            return 'Discord';
        } else if (domain.includes('twitch.tv')) {
            return 'Twitch';
        } else if (domain.includes('spotify.com') || domain.includes('spoti.fi')) {
            return 'Spotify';
        } else if (domain.includes('pinterest.com') || domain.includes('pin.it')) {
            return 'Pinterest';
        } else if (domain.includes('reddit.com') || domain.includes('redd.it')) {
            return 'Reddit';
        } else if (domain.includes('telegram.me') || domain.includes('t.me')) {
            return 'Telegram';
        } else if (domain.includes('whatsapp.com') || domain.includes('wa.me')) {
            return 'WhatsApp';
        } else if (domain.includes('paypal.com') || domain.includes('paypal.me')) {
            return 'PayPal';
        } else if (domain.includes('venmo.com')) {
            return 'Venmo';
        } else if (domain.includes('cashapp.com') || domain.includes('cash.me')) {
            return 'Cash App';
        } else if (domain.includes('medium.com')) {
            return 'Medium';
        } else if (domain.includes('substack.com')) {
            return 'Substack';
        } else {
            // Extract domain name for unknown platforms
            try {
                const hostname = new URL(url).hostname;
                const domainParts = hostname.split('.');
                const mainDomain = domainParts[domainParts.length - 2];
                return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
            } catch {
                return 'Custom Link';
            }
        }
    }

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
        // Wait for Simple Icons to load if it hasn't yet
        if (window.simpleIcons && window.simpleIcons[iconSlug]) {
            const icon = window.simpleIcons[iconSlug];
            return `<svg class="admin-link-icon-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <title>${icon.title}</title>
                        <path d="${icon.path}"></path>
                    </svg>`;
        }
        
        // Fallback icons for common platforms if Simple Icons isn't available
        const fallbackIcons = {
            'instagram': `<svg class="admin-link-icon-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <title>Instagram</title>
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>`,
            'x': `<svg class="admin-link-icon-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <title>X</title>
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                  </svg>`,
            'youtube': `<svg class="admin-link-icon-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                          <title>YouTube</title>
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>`,
            'github': `<svg class="admin-link-icon-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                         <title>GitHub</title>
                         <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                       </svg>`,
            'linkedin': `<svg class="admin-link-icon-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                           <title>LinkedIn</title>
                           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                         </svg>`,
            'globe': `<svg class="admin-link-icon-svg" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                        <title>Link</title>
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.5 9.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"/>
                        <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/>
                      </svg>`
        };
        
        // Use fallback icon if available, otherwise generic globe
        return fallbackIcons[iconSlug] || fallbackIcons['globe'];
    }

    let isRedirecting = false;
    let authCheckComplete = false;
    
    // Check Firebase authentication
    FirebaseUtils.onAuthStateChanged((user) => {
        authCheckComplete = true;
        
        if (!user && !isRedirecting) {
            // User is not authenticated, redirect to login
            isRedirecting = true;
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 100);
            return;
        }
        
        if (user) {
            // User is authenticated, continue with admin dashboard
            // Store user info for compatibility with existing code
            localStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email
            }));
        }
    });

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

    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await FirebaseUtils.signOut();
                localStorage.removeItem('user');
                localStorage.removeItem('links');
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Logout error:', error);
                alert('Error logging out. Please try again.');
            }
        });
    }

    // Default links - empty array for new users
    const defaultLinks = [];

    // Load subscription info
    const subscription = JSON.parse(localStorage.getItem('subscription')) || { plan: 'free', status: 'active' };
    displaySubscriptionInfo(subscription);

    // Load links from localStorage or use defaults
    let links = JSON.parse(localStorage.getItem('links')) || defaultLinks;

    // Function to render links
    function renderLinks() {
        const linksContainer = document.getElementById('admin-links');
        linksContainer.innerHTML = '';
        links.forEach((link, index) => {
            const linkDiv = document.createElement('div');
            linkDiv.className = 'admin-link-item';
            
            // Get icon for the link
            const iconSlug = link.icon || detectSocialIcon(link.url);
            const iconHtml = renderIcon(iconSlug);
            
            linkDiv.innerHTML = `
                <span class="admin-link-info">
                    ${iconHtml}
                    <span class="admin-link-details">${link.name}: ${link.url} (Clicks: ${link.count})</span>
                </span>
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
                const newUrl = prompt('New URL:', links[index].url);
                if (newUrl) {
                    // Auto-detect new name and icon based on URL
                    const newName = detectPlatformName(newUrl);
                    const newIcon = detectSocialIcon(newUrl);
                    
                    links[index].name = newName;
                    links[index].url = newUrl;
                    links[index].icon = newIcon;
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
    const linkUrlInput = document.getElementById('link-url');

    addLinkBtn.addEventListener('click', () => {
        const url = linkUrlInput.value.trim();
        
        // Check subscription limits
        const maxLinks = getMaxLinks(subscription.plan);
        if (links.length >= maxLinks) {
            alert(`Free plan limited to ${maxLinks} links. Upgrade to Premium for unlimited links!`);
            return;
        }
        
        if (url) {
            // Auto-detect name and icon for the URL
            const name = detectPlatformName(url);
            const iconSlug = detectSocialIcon(url);
            
            links.push({ name, url, count: 0, icon: iconSlug });
            localStorage.setItem('links', JSON.stringify(links));
            renderLinks();
            linkUrlInput.value = '';
            
            // Show detected platform feedback
            alert(`${name} link added successfully!`);
        } else {
            alert('Please enter a URL.');
        }
    });

    // Helper functions
    function displaySubscriptionInfo(sub) {
        const subInfo = document.getElementById('subscription-info');
        const statusClass = sub.status === 'active' ? 'status-active' : 'status-expired';
        subInfo.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span><strong>Plan:</strong> ${sub.plan.charAt(0).toUpperCase() + sub.plan.slice(1)}</span>
                <span class="status-badge ${statusClass}">${sub.status.toUpperCase()}</span>
            </div>
            ${sub.plan !== 'free' && sub.nextBilling ? `<small>Next billing: ${new Date(sub.nextBilling).toLocaleDateString()}</small>` : ''}
        `;
    }

    function getMaxLinks(plan) {
        switch(plan) {
            case 'free': return 5;
            case 'premium': return Infinity;
            case 'pro': return Infinity;
            default: return 5;
        }
    }

    // Initial render
    renderLinks();
});