// Main JavaScript file for Modern Body Balance

// Head Component - Insert favicon and stylesheets
function insertHeadElements(pageType = 'root') {
    // Determine the correct path based on page type
    const assetPath = pageType === 'blog' ? '../assets' : 'assets';
    
    // Check if favicon elements already exist to prevent duplicates
    const faviconExists = document.querySelector('link[rel="icon"]');
    
    // Only add favicon links if they don't exist
    if (!faviconExists) {
    // Create the head elements
    const headElements = `
        <!-- Favicon (Modern Body Balance) -->
            <link rel="icon" type="image/x-icon" href="${assetPath}/images/favicon/favicon.ico">
            <link rel="icon" type="image/png" sizes="16x16" href="${assetPath}/images/favicon/favicon-16x16.png">
            <link rel="icon" type="image/png" sizes="32x32" href="${assetPath}/images/favicon/favicon-32x32.png">
            <link rel="apple-touch-icon" sizes="180x180" href="${assetPath}/images/favicon/apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="192x192" href="${assetPath}/images/favicon/android-chrome-192x192.png">
            <link rel="icon" type="image/png" sizes="512x512" href="${assetPath}/images/favicon/android-chrome-512x512.png">
            <link rel="manifest" href="${assetPath}/images/favicon/site.webmanifest">

        <!-- Additional Meta Tags -->
            <meta name="theme-color" content="#C9A8B8">
            <meta name="msapplication-TileColor" content="#C9A8B8">
    `;
    
    // Insert the elements into the head
    document.head.insertAdjacentHTML('beforeend', headElements);
    }
    
    // Always load stylesheets (check if already loaded)
    const styleSheetExists = document.querySelector(`link[href*="${assetPath}/css/style.css"]`) || 
                             document.querySelector('link[href*="style.css"]');
    
    if (!styleSheetExists) {
    loadStylesheets(assetPath);
    } else {
        // Stylesheets already loaded, show content immediately
        setTimeout(() => {
            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';
        }, 100);
    }
}

// Load stylesheets and show content when ready
function loadStylesheets(assetPath) {
    let stylesheetsLoaded = 0;
    const totalStylesheets = 2;
    let contentShown = false;
    
    function showContent() {
        if (!contentShown) {
            contentShown = true;
            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';
        }
    }
    
    function onStylesheetLoad() {
        stylesheetsLoaded++;
        if (stylesheetsLoaded === totalStylesheets) {
            // All stylesheets loaded, show the content
            showContent();
        }
    }
    
    // Fallback: Show content after 2 seconds even if CSS doesn't load
    setTimeout(showContent, 2000);
    
    // Load main stylesheet
    const mainCSS = document.createElement('link');
    mainCSS.rel = 'stylesheet';
    mainCSS.href = `${assetPath}/css/style.css`;
    mainCSS.onload = onStylesheetLoad;
    mainCSS.onerror = onStylesheetLoad; // Show content even if CSS fails
    document.head.appendChild(mainCSS);
    
    // Load Bootstrap CSS
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css';
    bootstrapCSS.integrity = 'sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr';
    bootstrapCSS.crossOrigin = 'anonymous';
    bootstrapCSS.onload = onStylesheetLoad;
    bootstrapCSS.onerror = onStylesheetLoad; // Show content even if CSS fails
    document.head.appendChild(bootstrapCSS);
}

// Navigation Component - Insert navigation HTML
function insertNavigation(pageType = 'root', currentPage = '') {
    // Determine the correct paths based on page type
    const homePath = pageType === 'blog' ? '../index.html' : 'index.html';
    const logoPath = pageType === 'blog' ? '../assets/images/logo/MBB-logo.png' : 'assets/images/logo/MBB-logo.png';
    const blogPath = pageType === 'blog' ? 'index.html' : 'blog/index.html';
    
    // Check if we're on an article page (has article-fold element)
    const isArticlePage = document.getElementById('article-fold') !== null;
    
    // Create navigation HTML - show brand text only on non-article pages
    const brandTextHTML = isArticlePage ? '' : '<span class="brand-text">Modern Body Balance</span>';

    const navigationHTML = `
        <header>
            <nav>
                <a href="${homePath}" class="nav-brand">
                    <img src="${logoPath}" alt="Modern Body Balance Logo" id="logo">
                    ${brandTextHTML}
                </a>
            </nav>
        </header>
    `;
    
    // Insert navigation at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navigationHTML);
}

// Footer Component - Insert footer HTML
function insertFooter(pageType = 'root') {
    // Determine the correct paths based on page type
    const privacyPath = pageType === 'blog' ? '../privacy-policy.html' : 'privacy-policy.html';
    const termsPath = pageType === 'blog' ? '../terms-of-service.html' : 'terms-of-service.html';
    
    // Create footer HTML
    const footerHTML = `
        <footer>
            <div class="container footer-text">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <p>&copy; 2026 Modern Body Balance. All rights reserved.</p>
                        <p>
                            <a href="${privacyPath}">Privacy Policy</a> | 
                            <a href="${termsPath}">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    // Insert footer at the end of body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Load components immediately when script loads (before DOM ready)
(function() {
    // Check if we're in a blog subdirectory
    const isInBlog = window.location.pathname.includes('/blog/');
    const pageType = isInBlog ? 'blog' : 'root';
    
    // Determine current page for active state
    let currentPage = '';
    if (window.location.pathname.includes('/blog/')) {
        currentPage = 'blog';
    } else if (window.location.pathname.includes('quiz.html')) {
        currentPage = 'quiz';
    }
    
    // Insert head elements immediately
    insertHeadElements(pageType);
    
    // Insert navigation and footer when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (!document.querySelector('nav')) {
                insertNavigation(pageType, currentPage);
            }
            // Only insert main footer if there's no article-footer element (article pages handle their own footer)
            if (!document.querySelector('footer') && !document.getElementById('article-footer')) {
                insertFooter(pageType);
            }
        });
    } else {
        // DOM already loaded
        if (!document.querySelector('nav')) {
            insertNavigation(pageType, currentPage);
        }
        // Only insert main footer if there's no article-footer element (article pages handle their own footer)
        if (!document.querySelector('footer') && !document.getElementById('article-footer')) {
            insertFooter(pageType);
        }
    }
})();

// Wait for DOM to be fully loaded for additional functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});