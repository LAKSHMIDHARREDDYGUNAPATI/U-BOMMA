document.addEventListener('DOMContentLoaded', () => {
    // 1. Search Logic
    const searchToggle = document.getElementById('searchToggle');
    const searchContainer = document.getElementById('searchContainer');
    const searchInput = document.getElementById('searchInput');

    searchToggle.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const movieCards = document.querySelectorAll('.movie-card');
        movieCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            card.style.display = title.includes(term) ? 'flex' : 'none';
        });
    });
});

// 2. Share Functionality
function shareMovie(movieName) {
    const shareUrl = window.location.origin + window.location.pathname;
    const shareText = `Download ${movieName} on U-BOMMA!`;

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

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
