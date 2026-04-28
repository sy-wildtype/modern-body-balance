// Blog Recommendations Component
// Creates a "You Might Also Like" section with 3 article cards
// Usage: createBlogRecs({ articles: [...], pageType: 'root' })
// Each article: { title, image, url, category }

(function() {
    'use strict';

    function resolveImagePath(image, pageType) {
        const assetPath = pageType === 'blog' ? '../assets' : 'assets';
        return image.startsWith('http') || image.startsWith('/')
            ? image
            : `${assetPath}/images/${image}`;
    }

    function createBlogRecs(config) {
        const {
            articles = [],
            pageType = 'root'
        } = config;

        if (!articles.length) {
            console.warn('createBlogRecs: No articles provided');
            return '';
        }

        const cards = articles.slice(0, 3).map(article => {
            const imgPath = resolveImagePath(article.image, pageType);
            const categoryHTML = article.category
                ? `<span class="blog-rec-category">${article.category}</span>`
                : '';
            return `
                <a href="${article.url}" class="blog-rec-card">
                    <div class="blog-rec-img-wrapper">
                        <img src="${imgPath}" alt="${article.title}" class="blog-rec-img">
                        ${categoryHTML}
                    </div>
                    <p class="blog-rec-title">${article.title}</p>
                </a>
            `;
        }).join('');

        return `
            <div class="blog-recs-section">
                <h3 class="blog-recs-heading">You Might Also Like</h3>
                <div class="blog-recs-grid">
                    ${cards}
                </div>
            </div>
        `.trim();
    }

    window.createBlogRecs = createBlogRecs;
})();
