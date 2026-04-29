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

/**
 * Editorial site header (logo + wordmark + primary links).
 * Single markup source for homepage and all article-style pages.
 */
function buildEditorialHeaderHTML(paths) {
    const {
        homePath,
        logoPath,
        blogsPath,
        nutritionPath,
        movementPath,
        lifestylePath
    } = paths;
    return `
        <header class="header-editorial">
            <div class="header-editorial__top">
                <a href="${homePath}" class="header-editorial__wordmark">
                    <img src="${logoPath}" alt="" class="header-editorial__logo" width="52" height="52" decoding="async">
                    <span class="header-editorial__brand-text">Modern Body Balance</span>
                </a>
            </div>
            <div class="header-editorial__rule" aria-hidden="true"></div>
            <nav class="header-editorial__links" aria-label="Primary">
                <a href="${nutritionPath}">Nutrition</a>
                <a href="${movementPath}">Movement</a>
                <a href="${lifestylePath}">Lifestyle</a>
                <a href="${blogsPath}">All Articles</a>
            </nav>
        </header>
    `;
}

// Navigation Component - Insert navigation HTML
function insertNavigation(pageType = 'root', currentPage = '') {
    if (document.querySelector('header.header-editorial')) {
        return;
    }

    const homePath = pageType === 'blog' ? '../index.html' : 'index.html';
    const logoPath = pageType === 'blog' ? '../assets/images/logo/MBB-logo.png' : 'assets/images/logo/MBB-logo.png';

    const blogsPath = pageType === 'blog' ? '../blogs.html' : 'blogs.html';
    const nutritionPath = pageType === 'blog' ? '../eating-well-balanced-diet.html' : 'eating-well-balanced-diet.html';
    const movementPath = pageType === 'blog' ? '../move-your-body.html' : 'move-your-body.html';
    const lifestylePath = pageType === 'blog' ? '../rest-pillar-wellness.html' : 'rest-pillar-wellness.html';

    const navigationHTML = buildEditorialHeaderHTML({
        homePath,
        logoPath,
        blogsPath,
        nutritionPath,
        movementPath,
        lifestylePath
    });

    document.body.insertAdjacentHTML('afterbegin', navigationHTML);
}

// Footer Component - Insert footer HTML
function insertFooter(pageType = 'root') {
    // Determine the correct paths based on page type
    const privacyPath = pageType === 'blog' ? '../privacy-policy.html' : 'privacy-policy.html';

    // Create footer HTML (newsletter; gradient via CSS)
    const footerHTML = `
        <footer class="site-footer">
            <section class="site-footer-newsletter" aria-labelledby="footer-newsletter-heading">
                <div class="container">
                    <div class="site-footer-newsletter-inner">
                        <h2 id="footer-newsletter-heading" class="site-footer-newsletter-title">Subscribe to our newsletter</h2>
                        <p class="site-footer-newsletter-deck">Wellness ideas, new stories, and gentle reminders to stay balanced—occasionally in your inbox, never spammy.</p>
                        <form class="site-footer-newsletter-form" action="https://formsubmit.co/support@pacagen.com" method="POST">
                            <input type="hidden" name="_subject" value="Newsletter signup: Modern Body Balance">
                            <label class="visually-hidden" for="site-footer-email">Email address</label>
                            <input type="email" id="site-footer-email" name="email" class="site-footer-newsletter-input" placeholder="Your email address" required autocomplete="email" maxlength="254">
                            <button type="submit" class="site-footer-newsletter-btn">Subscribe</button>
                        </form>
                        <p class="site-footer-newsletter-fineprint">By subscribing you agree we may contact you about Modern Body Balance. Read our <a href="${privacyPath}">Privacy Policy</a> to see how we handle your information.</p>
                    </div>
                </div>
            </section>
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
            insertNavigation(pageType, currentPage);
            // Only insert main footer if there's no article-footer element (article pages handle their own footer)
            if (!document.querySelector('footer') && !document.getElementById('article-footer')) {
                insertFooter(pageType);
            }
        });
    } else {
        // DOM already loaded
        insertNavigation(pageType, currentPage);
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