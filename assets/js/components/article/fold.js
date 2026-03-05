// Fold Component (Article Header/Fold)
// Creates the fold section with title, optional author, optional leading title, optional breadcrumb, optional date, and image
// Usage: createFold({ title: 'Title', authorName: 'Author', authorImage: 'img.png', authorBio: 'Bio text', leadingTitle: 'Subtitle', imageSrc: 'hero.png', breadcrumb: true, dateText: 'Updated on...', pageType: 'root' })
// Dependencies: breadcrumb.js (optional, has fallback)

(function() {
    'use strict';

    function createFold(config) {
        const {
            title,
            authorName = null,
            authorImage = null,
            authorImageAlt = null,
            authorBio = null,
            leadingTitle = null,
            imageSrc,
            imageAlt,
            imageCaption = '',
            breadcrumb = false,
            homePath = 'index.html',
            homeText = 'Home',
            dateText = '',
            pageType = 'root',
            articleUrl = ''
        } = config;

        if (!title) {
            console.error('Fold component requires title');
            return '';
        }

        // Breadcrumb (optional)
        let breadcrumbHTML = '';
        if (breadcrumb) {
            if (typeof createBreadcrumb !== 'undefined') {
                breadcrumbHTML = createBreadcrumb({ homePath, homeText });
            } else {
                // Fallback if breadcrumb component not loaded
                breadcrumbHTML = `
                    <div class="breadcrumb-section">
                        <div class="breadcrumb">
                            <a href="${homePath}" class="custom-btn btn-sm shadow-sm">${homeText}</a>
                        </div>
                    </div>
                `;
            }
        }

        // Date section (optional)
        let dateHTML = '';
        if (dateText) {
            dateHTML = `<div class="article-date-updated">${dateText}</div>`;
        }

        // Leading title (optional subtitle) - now italicized
        const leadingTitleHTML = leadingTitle
            ? `<p class="fold-leading-subtitle">${leadingTitle}</p>`
            : '';

        // Author section with profile image and bio
        let authorHTML = '';
        if (authorName) {
            const assetPath = pageType === 'blog' ? '../assets' : 'assets';
            const authorImagePath = authorImage
                ? (authorImage.startsWith('/') || authorImage.startsWith('http')
                    ? authorImage
                    : `${assetPath}/images/${authorImage}`)
                : null;

            const authorImgHTML = authorImagePath
                ? `<img class="author-profile-image" src="${authorImagePath}" alt="${authorImageAlt || `Author ${authorName}`}">`
                : '';

            const authorBioHTML = authorBio
                ? `<div class="author-bio-section">
                    <h4>About the Editor:</h4>
                    <p>${authorBio}</p>
                   </div>`
                : '';

            authorHTML = `
                <div class="author-profile-section">
                    ${authorImgHTML}
                    <span class="author-name">${authorName}</span>
                </div>
                ${authorBioHTML}
            `;
        }

        // Social sharing buttons
        const currentUrl = articleUrl || (typeof window !== 'undefined' ? window.location.href : '');
        const encodedUrl = encodeURIComponent(currentUrl);
        const encodedTitle = encodeURIComponent(title);

        const socialShareHTML = `
            <div class="social-share-buttons">
                <a href="https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}" target="_blank" rel="noopener noreferrer" class="social-btn social-twitter" aria-label="Share on Twitter">
                    <i class="bi bi-twitter-x"></i>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="social-btn social-instagram" aria-label="Share on Instagram">
                    <i class="bi bi-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="social-btn social-linkedin" aria-label="Share on LinkedIn">
                    <i class="bi bi-linkedin"></i>
                </a>
                <a href="mailto:?subject=${encodedTitle}&body=${encodedUrl}" class="social-btn social-email" aria-label="Share via Email">
                    <i class="bi bi-envelope"></i>
                </a>
                <button class="social-btn social-copy" onclick="navigator.clipboard.writeText('${currentUrl}'); this.innerHTML='<i class=\\'bi bi-check\\'></i>'; setTimeout(() => this.innerHTML='<i class=\\'bi bi-link-45deg\\'></i>', 2000);" aria-label="Copy link">
                    <i class="bi bi-link-45deg"></i>
                </button>
            </div>
        `;

        // Image (optional, but common)
        let imageHTML = '';
        if (imageSrc) {
            const assetPath = pageType === 'blog' ? '../assets' : 'assets';
            const imagePath = imageSrc.startsWith('http') || imageSrc.startsWith('/')
                ? imageSrc
                : `${assetPath}/images/${imageSrc}`;

            imageHTML = `
                <div class="fold-image-wrapper">
                    <img src="${imagePath}" alt="${imageAlt || ''}" class="fold-image">
                </div>
            `;
        }

        return `
            ${breadcrumbHTML}
            <div class="fold-section">
                <h1 class="fold-title">${title}</h1>
                ${dateHTML}
                ${leadingTitleHTML}
                ${authorHTML}
                ${imageHTML}
            </div>
        `;
    }

    window.createFold = createFold;
})();
