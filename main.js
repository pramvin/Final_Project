document.addEventListener('DOMContentLoaded', function () {
    loadTrending();

    document.getElementById('confessionForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const text = document.getElementById('confessionText').value;
        fetch('http://localhost:8000/submit_confession.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'confession_text=' + encodeURIComponent(text)
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('submitMessage').textContent = data.message;
            if (data.success) {
                document.getElementById('confessionForm').reset();
                loadTrending();
            }
        });
    });

    document.getElementById('searchBtn').addEventListener('click', function () {
        const query = document.getElementById('searchInput').value;
        fetch('http://localhost:8000/search.php?query=' + encodeURIComponent(query))
        .then(res => res.json())
        .then(data => {
            renderConfessions(data.confessions, 'searchResults');
        });
    });
});

function loadTrending() {
    fetch('http://localhost:8000/trending.php')
    .then(res => res.json())
    .then(data => {
        renderConfessions(data.confessions, 'trendingConfessions');
    });
}

function renderConfessions(confessions, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    if (!confessions || confessions.length === 0) {
        container.textContent = 'No confessions found.';
        return;
    }
    confessions.forEach(conf => {
        const div = document.createElement('div');
        div.className = 'confession';
        div.innerHTML = `
            <div class="text">${escapeHTML(conf.confession)}</div>
            <div class="reactions">
                <button class="reaction-btn" onclick="react(${conf.id}, 'love')">❤️ ${conf.love_reacts}</button>
                <button class="reaction-btn" onclick="react(${conf.id}, 'laugh')">😂 ${conf.laugh_reacts}</button>
                <button class="reaction-btn" onclick="react(${conf.id}, 'cry')">😭 ${conf.cry_reacts}</button>
                <button class="reaction-btn" onclick="react(${conf.id}, 'shy')">😳 ${conf.shy_reacts}</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function react(confessionId, type) {
    fetch('http://localhost:8000/react.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'confession_id=' + encodeURIComponent(confessionId) + '&reaction_type=' + encodeURIComponent(type)
    })
    .then(res => res.json())
    .then(() => {
        loadTrending();
        if (document.getElementById('searchResults').innerHTML.trim() !== '') {
            document.getElementById('searchBtn').click();
        }
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[tag] || tag);
}
