// hide some elems when not in viewport
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.image-container img');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    });

    images.forEach((image) => {
        observer.observe(image);
    });
});

/* When the user scrolls down, hide the navbar And when the user scrolls up, that show the navbar */
var prevScrollpos = window.scrollY;
window.onscroll = function () {
    var currentScrollPos = window.scrollY;
    const nav = document.getElementsByClassName('navbar');
    if (prevScrollpos > currentScrollPos) {
        nav[0].style.top = '0px';
    } else {
        nav[0].style.top = '-100px';
    }
    prevScrollpos = currentScrollPos;
};
