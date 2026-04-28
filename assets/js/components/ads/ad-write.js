// Ad Write Component
// Creates a full-width ad with image background and bottom-left text overlay
// Usage: createAdWhite({ image, brand, headline, body, ctaText, ctaUrl, pageType })

(function() {
    'use strict';

    function resolveImagePath(image, pageType) {
        const assetPath = pageType === 'blog' ? '../assets' : 'assets';
        return image.startsWith('http') || image.startsWith('/')
            ? image
            : `${assetPath}/images/${image}`;
    }

    function createAdWhite(config) {
        const {
            image,
            brand,
            headline,
            body,
            ctaText,
            ctaUrl,
            pageType = 'root'
        } = config;

        if (!image) {
            console.warn('createAdWhite: Missing required image');
            return '';
        }

        const imagePath = resolveImagePath(image, pageType);
        const ctaHTML = ctaText && ctaUrl
            ? `<a href="${ctaUrl}" class="ad-overlay-cta" target="_blank" rel="noopener noreferrer">${ctaText}</a>`
            : '';
        const brandHTML = brand ? `<p class="ad-overlay-brand">${brand}</p>` : '';
        const headlineHTML = headline ? `<p class="ad-overlay-headline">${headline}</p>` : '';
        const bodyHTML = body ? `<p class="ad-overlay-body">${body}</p>` : '';

        return `
            <div class="ad-overlay-section ad">
              <img src="${imagePath}" alt="${headline || brand || ''}" class="ad-overlay-img">
              <div class="ad-overlay-content">
                ${brandHTML}
                ${headlineHTML}
                ${bodyHTML}
                ${ctaHTML}
              </div>
              <span class="ad-label">Ad</span>
            </div>
        `.trim();
    }

    window.createAdWhite = createAdWhite;
})();
