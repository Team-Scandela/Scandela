


document.addEventListener('DOMContentLoaded', function () {
    new Splide('#thumbnail-carousel', {
        perPage: 3,
        gap: '2rem',
        snap: 'true',
        type: 'loop',
        drag: 'free',
        focus: 'center',
        breakpoints: {
            640: {
                perPage: 2,
                gap: '.7rem',
                height: '6rem',
            },
            480: {
                perPage: 1,
                gap: '.7rem',
                height: '6rem',
            },
        },
        autoScroll: {
            speed: 2,
        },
    }).mount(window.splide.Extensions);
});
