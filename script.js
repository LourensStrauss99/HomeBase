// Add interactivity to the links
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');
    });

    // Click tracking
    let clickCounts = JSON.parse(localStorage.getItem('clickCounts')) || {};
    const links = document.querySelectorAll('.link');
    
    links.forEach(link => {
        const linkText = link.textContent.split(' ')[0]; // Get the platform name
        if (!clickCounts[linkText]) clickCounts[linkText] = 0;
        
        const countSpan = link.querySelector('.count');
        countSpan.textContent = clickCounts[linkText];
        
        link.addEventListener('click', (e) => {
            // Prevent default if href is #
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                clickCounts[linkText]++;
                countSpan.textContent = clickCounts[linkText];
                localStorage.setItem('clickCounts', JSON.stringify(clickCounts));
                console.log(`${linkText} clicked ${clickCounts[linkText]} times`);
                // Here you can add actual URLs or navigation logic
            }
        });
        
        // Add hover effect with JS for more control
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'scale(1.05)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'scale(1)';
        });
    });
});