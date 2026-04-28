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
            pageType = 'root'
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

            authorHTML = `
                <div class="author-profile-section">
                    ${authorImgHTML}
                    <span class="author-name">${authorName}</span>
                </div>
            `;
        }

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
                <div class="fold-layout">
                    ${imageHTML}
                    <div class="fold-text-content">
                        <h1 class="fold-title">${title}</h1>
                        ${leadingTitleHTML}
                        <div class="fold-meta">
                            ${authorHTML}
                            ${dateHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    window.createFold = createFold;
})();
