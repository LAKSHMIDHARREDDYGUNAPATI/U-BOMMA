document.addEventListener('DOMContentLoaded', () => {
    // 1. Search Logic
    const searchToggle = document.getElementById('searchToggle');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');
    const movieCards = document.querySelectorAll('.premium-card');

    searchToggle.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        movieCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            card.style.display = title.includes(term) ? 'block' : 'none';
        });
    });

    // 2. Real-time Views Simulation
    movieCards.forEach(card => {
        const viewEl = card.querySelector('.view-count');

        // Start from a small random number or 0
        let views = Math.floor(Math.random() * 5);
        viewEl.innerText = views.toLocaleString();

        // Update loop - creates a sense of "live" traffic
        setInterval(() => {
            // High probability of increase to feel "live"
            if (Math.random() > 0.4) {
                views += Math.floor(Math.random() * 5) + 1;
                viewEl.innerText = views.toLocaleString();
            }
        }, 3000); // Update every 3 seconds for better real-time feel
    });
});

// 3. Share Functionality
function shareMovie(movieName, btn) {
    const shareUrl = window.location.origin + window.location.pathname;
    const shareText = `Watch ${movieName} on U-BOMMA!`;

    if (navigator.share) {
        navigator.share({
            title: 'U-BOMMA',
            text: shareText,
            url: shareUrl,
        }).catch(err => console.log('Error sharing:', err));
    } else {
        const tempInput = document.createElement('input');
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        showToast('Link copied to clipboard!');
    }
}

// 4. Load Player on Click
function loadPlayer(container) {
    const overlay = container.querySelector('.thumbnail-overlay');
    const wrapper = container.querySelector('.player-wrapper');
    const iframeCode = wrapper.getAttribute('data-src');

    // Fade out overlay
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        wrapper.style.display = 'block';
        wrapper.innerHTML = iframeCode;
    }, 500);
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
