// Article Footer Component
// Standard article footer with links - matches main site footer
// Usage: createArticleFooter({ pageType: 'root' })

(function() {
    'use strict';
    
    function createArticleFooter(config = {}) {
        const { pageType = 'root' } = config;
        const privacyPath = pageType === 'blog' ? '../privacy-policy.html' : 'privacy-policy.html';
        const termsPath = pageType === 'blog' ? '../terms-of-service.html' : 'terms-of-service.html';
        
        return `
            <footer>
                <div class="container footer-text">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <p>&copy; 2026 Better Sleep Guides. All rights reserved.</p>
                            <p>
                                <a href="${privacyPath}">Privacy Policy</a> | 
                                <a href="${termsPath}">Terms of Service</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
    
    window.createArticleFooter = createArticleFooter;
})();

