// Article Footer Component
// Standard article footer with links - matches main site footer
// Usage: createArticleFooter({ pageType: 'root' })

(function() {
    'use strict';
    
    function createArticleFooter(config = {}) {
        const { pageType = 'root' } = config;
        const privacyPath = pageType === 'blog' ? '../privacy-policy.html' : 'privacy-policy.html';

        return `
            <footer class="site-footer">
                <section class="site-footer-newsletter" aria-labelledby="footer-newsletter-heading">
                    <div class="container">
                        <div class="site-footer-newsletter-inner">
                            <h2 id="footer-newsletter-heading" class="site-footer-newsletter-title">Subscribe to our newsletter</h2>
                            <p class="site-footer-newsletter-deck">Wellness ideas, new stories, and gentle reminders to stay balanced—occasionally in your inbox, never spammy.</p>
                            <form class="site-footer-newsletter-form" action="https://formsubmit.co/support@pacagen.com" method="POST">
                                <input type="hidden" name="_subject" value="Newsletter signup: Modern Body Balance">
                                <label class="visually-hidden" for="site-footer-email-article">Email address</label>
                                <input type="email" id="site-footer-email-article" name="email" class="site-footer-newsletter-input" placeholder="Your email address" required autocomplete="email" maxlength="254">
                                <button type="submit" class="site-footer-newsletter-btn">Subscribe</button>
                            </form>
                            <p class="site-footer-newsletter-fineprint">By subscribing you agree we may contact you about Modern Body Balance. Read our <a href="${privacyPath}">Privacy Policy</a> to see how we handle your information.</p>
                        </div>
                    </div>
                </section>
            </footer>
        `;
    }
    
    window.createArticleFooter = createArticleFooter;
})();

