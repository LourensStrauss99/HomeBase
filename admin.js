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

    // Social media icon detection function
    function detectSocialIcon(url) {
        const domain = url.toLowerCase();
        
        if (domain.includes('instagram.com') || domain.includes('ig.me')) {
            return '📷'; // Instagram emoji
        } else if (domain.includes('twitter.com') || domain.includes('x.com') || domain.includes('t.co')) {
            return '❌'; // X emoji
        } else if (domain.includes('youtube.com') || domain.includes('youtu.be')) {
            return '📺'; // YouTube emoji
        } else if (domain.includes('github.com') || domain.includes('git.io')) {
            return '💻'; // GitHub emoji
        } else if (domain.includes('linkedin.com') || domain.includes('lnkd.in')) {
            return '💼'; // LinkedIn emoji
        } else if (domain.includes('tiktok.com') || domain.includes('vm.tiktok.com')) {
            return '🎵'; // TikTok emoji
        } else if (domain.includes('facebook.com') || domain.includes('fb.me')) {
            return '👥'; // Facebook emoji
        } else if (domain.includes('snapchat.com') || domain.includes('snap.com')) {
            return '👻'; // Snapchat emoji
        } else if (domain.includes('discord.gg') || domain.includes('discord.com')) {
            return '🎮'; // Discord emoji
        } else if (domain.includes('twitch.tv')) {
            return '🎮'; // Twitch emoji
        } else if (domain.includes('spotify.com') || domain.includes('spoti.fi')) {
            return '🎧'; // Spotify emoji
        } else if (domain.includes('pinterest.com') || domain.includes('pin.it')) {
            return '📌'; // Pinterest emoji
        } else if (domain.includes('reddit.com') || domain.includes('redd.it')) {
            return '🔗'; // Reddit emoji
        } else if (domain.includes('telegram.me') || domain.includes('t.me')) {
            return '💬'; // Telegram emoji
        } else if (domain.includes('whatsapp.com') || domain.includes('wa.me')) {
            return '📱'; // WhatsApp emoji
        } else if (domain.includes('paypal.com') || domain.includes('paypal.me')) {
            return '💳'; // PayPal emoji
        } else if (domain.includes('venmo.com')) {
            return '💰'; // Venmo emoji
        } else if (domain.includes('cashapp.com') || domain.includes('cash.me')) {
            return '💵'; // Cash App emoji
        } else if (domain.includes('medium.com')) {
            return '✍️'; // Medium emoji
        } else if (domain.includes('substack.com')) {
            return '📰'; // Substack emoji
        } else {
            return '🔗'; // Generic link emoji
        }
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

    // Default links
    const defaultLinks = [
        { name: 'Instagram', url: '#', count: 0 },
        { name: 'X', url: '#', count: 0 },
        { name: 'YouTube', url: '#', count: 0 },
        { name: 'GitHub', url: '#', count: 0 }
    ];

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
            const iconSrc = link.icon || detectSocialIcon(link.url);
            
            // Check if icon is emoji or image URL
            const isEmoji = iconSrc.length <= 4 && !iconSrc.includes('http');
            
            linkDiv.innerHTML = `
                <span class="admin-link-info">
                    ${isEmoji ? 
                        `<span class="admin-link-icon-emoji">${iconSrc}</span>` : 
                        `<img src="${iconSrc}" alt="${link.name}" class="admin-link-icon">`
                    }
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
            const iconSrc = detectSocialIcon(url);
            
            links.push({ name, url, count: 0, icon: iconSrc });
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