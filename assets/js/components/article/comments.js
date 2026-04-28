// Comments Component
// Renders a comments section with pre-seeded comments and a submit form
// Usage: createComments({ comments: [...] })
// Each comment: { name, date, text }

(function() {
    'use strict';

    const AVATAR_COLORS = ['#C9A8B8', '#A8C4C9', '#B8C9A8', '#C9BBA8', '#A8A8C9', '#C9C4A8'];

    function getInitial(name) {
        return name ? name.charAt(0).toUpperCase() : '?';
    }

    function renderComment(c, index) {
        const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
        return `
            <div class="comment-item">
                <div class="comment-avatar" style="background-color:${color}">${getInitial(c.name)}</div>
                <div class="comment-body">
                    <div class="comment-meta">
                        <span class="comment-name">${c.name}</span>
                        <span class="comment-date">${c.date}</span>
                    </div>
                    <p class="comment-text">${c.text}</p>
                </div>
            </div>
        `;
    }

    function createComments(config) {
        const { comments = [] } = config;

        const commentItems = comments.map((c, i) => renderComment(c, i)).join('');

        return `
            <div class="comments-section">
                <h2 class="comments-heading">Comments</h2>
                <div class="comments-list" id="comments-list">
                    ${commentItems}
                </div>
                <form class="comment-form" id="comment-form">
                    <div class="comment-form-row">
                        <input type="text" class="comment-input" id="comment-name" placeholder="Your name" required>
                    </div>
                    <div class="comment-form-row">
                        <textarea class="comment-input comment-textarea" id="comment-text" placeholder="Leave a comment..." rows="3" required></textarea>
                    </div>
                    <button type="submit" class="comment-submit">Post Comment</button>
                </form>
            </div>
        `.trim();
    }

    function initCommentForm() {
        const form = document.getElementById('comment-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameEl = document.getElementById('comment-name');
            const textEl = document.getElementById('comment-text');
            const name = nameEl.value.trim();
            const text = textEl.value.trim();
            if (!name || !text) return;

            const now = new Date();
            const date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            const list = document.getElementById('comments-list');
            const index = list.children.length;
            const div = document.createElement('div');
            div.innerHTML = renderComment({ name, date, text }, index);
            list.appendChild(div.firstElementChild);

            nameEl.value = '';
            textEl.value = '';
            list.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    window.createComments = createComments;
    window.initCommentForm = initCommentForm;
})();
