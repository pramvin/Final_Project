// Run the following code once the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const BASE_URL = window.location.origin;
    console.log("JS loaded");

    loadTrending(); // Load trending confessions on page load

    // Add event listener for confession form submission
    document.getElementById('confessionForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Form submit intercepted");
        const text = document.getElementById('confessionText').value; // Get the confession text input

        // Send a POST request to submit the confession
        fetch(`${BASE_URL}/submit_confession.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'confession_text=' + encodeURIComponent(text) // Encode the text for safe transmission
        })
        .then(res => res.json()) // Parse the JSON response
        .then(data => {
            document.getElementById('submitMessage').textContent = data.message; // Show success/failure message
            if (data.success) {
                document.getElementById('confessionForm').reset(); // Reset the form if submission succeeded
                loadTrending(); // Reload trending confessions
            }
        });
    });

    // Add event listener for search button click
    document.getElementById('searchBtn').addEventListener('click', function () {
        const query = document.getElementById('searchInput').value; // Get the search query
        
        // Send a GET request to search confessions
        fetch(`${BASE_URL}/search.php?query=` + encodeURIComponent(query))
        .then(res => res.json()) // Parse the JSON response
        .then(data => {
            renderConfessions(data.confessions, 'searchResults'); // Render search results
        });
    });
});

// Function to load trending confessions
function loadTrending() {
    const BASE_URL = window.location.origin;
    fetch(`${BASE_URL}/trending.php`) // Send a request to get trending confessions
    .then(res => res.json()) // Parse the response
    .then(data => {
        renderConfessions(data.confessions, 'trendingConfessions'); // Display trending confessions
    });
}

// Function to render confessions to a given container
function renderConfessions(confessions, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear the container first

    if (!confessions || confessions.length === 0) {
        container.textContent = 'No confessions found.'; // Show message if no confessions
        return;
    }

    // Loop through confessions and create DOM elements
    confessions.forEach(conf => {
        const div = document.createElement('div');
        div.className = 'confession';
        div.innerHTML = `
            <div class="text">${escapeHTML(conf.confession)}</div> <!-- Display confession text safely -->
            <div class="reactions">
                <button class="reaction-btn" onclick="react(${conf.id}, 'love')">❤️ ${conf.love_reacts}</button>
                <button class="reaction-btn" onclick="react(${conf.id}, 'laugh')">😂 ${conf.laugh_reacts}</button>
                <button class="reaction-btn" onclick="react(${conf.id}, 'cry')">😭 ${conf.cry_reacts}</button>
                <button class="reaction-btn" onclick="react(${conf.id}, 'shy')">😳 ${conf.shy_reacts}</button>
            </div>
        `;
        container.appendChild(div); // Add confession element to the container
    });
}

// Function to handle reaction button clicks
function react(confessionId, type) {
    const BASE_URL = window.location.origin;
    fetch(`${BASE_URL}/react.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'confession_id=' + encodeURIComponent(confessionId) + '&reaction_type=' + encodeURIComponent(type)
    })
    .then(res => res.json()) // Parse the response
    .then(() => {
        loadTrending(); // Refresh trending confessions to reflect new reactions

        // If search results are shown, re-run the search to update reactions
        if (document.getElementById('searchResults').innerHTML.trim() !== '') {
            document.getElementById('searchBtn').click();
        }
    });
}

// Utility function to safely escape HTML (prevents XSS attacks)
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[tag] || tag);
}
