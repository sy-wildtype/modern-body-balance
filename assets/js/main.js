// Main JavaScript file for Modern Body Balance


// Head Component - Insert favicons, stylesheets and meta tags
function insertHeadElements(pageType = 'root') {
    // Check if head elements already exist to prevent duplicates
    if (document.querySelector('link[rel="icon"]')) {
        return; // Already inserted
    }
    
    // Determine the correct path based on page type
    const assetPath = pageType === 'blog' ? '../assets' : 'assets';
    const faviconPath = `${assetPath}/images/favicon_io`;
    
    // Create the head elements
    const headElements = `
        <!-- Favicons -->
        <link rel="icon" type="image/x-icon" href="${faviconPath}/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="${faviconPath}/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${faviconPath}/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="${faviconPath}/apple-touch-icon.png">
        <link rel="manifest" href="${faviconPath}/site.webmanifest">

        <!-- Meta Tags -->
        <meta name="theme-color" content="#005F02">
        <meta name="msapplication-TileColor" content="#005F02">
    `;
    
    // Insert the elements into the head
    document.head.insertAdjacentHTML('beforeend', headElements);
    
    // Load stylesheets with proper loading detection
    loadStylesheets(assetPath);
}


// Load stylesheets and show content when ready
var contentRevealedByStylesheets = false;
function loadStylesheets(assetPath) {
    let stylesheetsLoaded = 0;
    const totalStylesheets = 2;
    let contentShown = false;
    
    function showContent() {
        if (!contentShown) {
            contentShown = true;
            contentRevealedByStylesheets = true;
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
    
    
    // Load Bootstrap CSS
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css';
    bootstrapCSS.integrity = 'sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr';
    bootstrapCSS.crossOrigin = 'anonymous';
    bootstrapCSS.onload = onStylesheetLoad;
    bootstrapCSS.onerror = onStylesheetLoad; // Show content even if CSS fails
    document.head.appendChild(bootstrapCSS);

    // Load main stylesheet
    const mainCSS = document.createElement('link');
    mainCSS.rel = 'stylesheet';
    mainCSS.href = `${assetPath}/css/style.css`;
    mainCSS.onload = onStylesheetLoad;
    mainCSS.onerror = onStylesheetLoad; // Show content even if CSS fails
    document.head.appendChild(mainCSS);
}

// Navigation Component - Insert navigation HTML
function insertNavigation(pageType = 'root', currentPage = '') {
    // Determine the correct paths based on page type
    const homePath = pageType === 'blog' ? '../index.html' : 'index.html';
    const logoPath = pageType === 'blog' ? '../assets/images/MBB-logo.png' : 'assets/images/MBB-logo.png';
  
    // Define the header HTML (now actually using the paths)
    const navHTML = `
        <nav id="mainHeader" class="navbar navbar-expand-lg border-bottom fixed-top">
            <div class="container justify-content-center">
                <a class="navbar-brand mx-auto" href="index.html">
                    <img src="${logoPath}" alt="Modern Body Balance">
                </a>
            </div>
        </nav>
    `;
  
    // Insert at the very beginning of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
  

// Footer Component - Insert footer HTML
function insertFooter(pageType = 'root') {
    // Determine the correct paths based on page type
    const privacyPath = pageType === 'blog' ? '../privacy-policy.html' : 'privacy-policy.html';
    const termsPath = pageType === 'blog' ? '../terms-of-service.html' : 'terms-of-service.html';
    
    // Create footer HTML
    const footerHTML = `
        <footer>
            <div class="container">
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
            if (!document.querySelector('footer')) {
                insertFooter(pageType);
            }
        });
    } else {
        // DOM already loaded
        if (!document.querySelector('nav')) {
            insertNavigation(pageType, currentPage);
        }
        if (!document.querySelector('footer')) {
            insertFooter(pageType);
        }
    }
})();


// Lazy images load natively; no fade animation to avoid glitchy appearance
function initLazyImageReveal() {
    // Intentionally empty: we keep native lazy loading only, no opacity transition
}

// Reveal body (FOUC fallback for pages that have stylesheet in head and don't use loadStylesheets)
function revealBody() {
    if (contentRevealedByStylesheets) return;
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
}

// Auto-scroll the "Follow us" circle track (infinite loop, synced to display to avoid jump)
function initFollowUsAutoScroll() {
    var container = document.getElementById('scrollContainer');
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var step = 0.35;
    function tick() {
        var half = container.scrollWidth / 2;
        if (half > 0) {
            container.scrollLeft += step;
            if (container.scrollLeft >= half) {
                container.scrollLeft -= half;
            }
        }
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

// Wait for DOM to be fully loaded for additional functionality
document.addEventListener('DOMContentLoaded', function() {
    revealBody();
    initLazyImageReveal();
    initFollowUsAutoScroll();

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


// used for sharing buttons
document.addEventListener('DOMContentLoaded', function () {
  const pageUrl = window.location.href;
  const encodedUrl = encodeURIComponent(pageUrl);
  const pageTitle = document.title || 'Check this out';
  const encodedTitle = encodeURIComponent(pageTitle);
  const defaultText = encodeURIComponent('Check this out!');

  // Optional: Use native share on mobile if available
  function tryNativeShare(textLabel) {
    if (navigator.share) {
      navigator.share({ title: pageTitle, text: textLabel || pageTitle, url: pageUrl })
        .catch(() => {}); // user canceled or not supported by target app
      return true;
    }
    return false;
  }

  // Assign URLs / handlers
  document.querySelectorAll('[aria-label]').forEach(el => {
    const type = el.getAttribute('aria-label');

    if (type === 'X') {
      // X (Twitter)
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${defaultText}`;
      el.setAttribute('href', shareUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.addEventListener('click', e => {
        // try native share first
        if (tryNativeShare('Check this out!')) { e.preventDefault(); }
      });
    }

    if (type === 'LinkedIn') {
      // LinkedIn
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      el.setAttribute('href', shareUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.addEventListener('click', e => {
        if (tryNativeShare()) { e.preventDefault(); }
      });
    }

    if (type === 'Email') {
      // Email
      const subject = encodedTitle;
      const body = encodeURIComponent(`${pageTitle}\n\n${pageUrl}`);
      const mailto = `mailto:?subject=${subject}&body=${body}`;
      el.setAttribute('href', mailto);
      // mailto should open the client; no native share override
    }

    if (type === 'Instagram') {
      // No web share URL for Instagram posts. Best we can do is copy the link.
      const shareUrl = `https://www.instagram.com/modernbodybalance/`;
      el.setAttribute('href', shareUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
      el.addEventListener('click', e => {
        if (tryNativeShare()) { e.preventDefault(); }
      });
    }
  });
});

// copy button function
const copyBtn = document.getElementById("copyBtn");
const popup = document.getElementById("popup");

copyBtn.addEventListener("click", () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    // Show popup
    popup.classList.add("show");

    // Hide after 2 seconds
    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000);
  });
});