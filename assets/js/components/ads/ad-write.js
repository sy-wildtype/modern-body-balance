// Ad Write Component
// Creates a full-width ad with background image, dark overlay, and left-aligned white text
// Usage: createAdWhite({ image, logo, headline, body, ctaText, ctaUrl, pageType })

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
            logo,
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
        const isClickable = ctaUrl && ctaUrl !== '#';
        const wrapperTag = isClickable ? 'a' : 'div';
        const hrefAttr = isClickable ? `href="${ctaUrl}" target="_blank" rel="noopener noreferrer"` : '';
        const wrapperClass = `ad-section ad${isClickable ? ' ad-clickable' : ''}`;

        const logoHTML = logo ? `<div class="ad-logo">${logo}</div>` : '';
        const headlineHTML = headline ? `<div class="ad-headline">${headline}</div>` : '';
        const bodyHTML = body ? `<div class="ad-body">${body}</div>` : '';
        const ctaHTML = ctaText ? `<div class="ad-cta-wrapper"><span class="ad-cta">${ctaText}</span></div>` : '';

        return `
            <${wrapperTag} class="${wrapperClass}" style="background-image: url('${imagePath}');" ${hrefAttr}>
              ${logoHTML}
              ${headlineHTML}
              ${bodyHTML}
              ${ctaHTML}
              <span class="ad-label">Ad</span>
            </${wrapperTag}>
        `.trim();
    }

    window.createAdWhite = createAdWhite;
})();
