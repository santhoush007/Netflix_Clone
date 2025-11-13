window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = '#141414';
    } else {
        nav.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 10%, transparent)';
    }
});

document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.zIndex = '3';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
    });
});

document.querySelector('.play-btn').addEventListener('click', function() {
    alert('Playing Money Heist...');
});

document.querySelector('.more-info-btn').addEventListener('click', function() {
    alert('Loading more information about Money Heist...');
});