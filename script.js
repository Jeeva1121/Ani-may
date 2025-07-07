document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero .slide');
    const dotsContainer = document.querySelector('.hero .slider-dots');
    const prevButton = document.querySelector('.hero .prev-arrow');
    const nextButton = document.querySelector('.hero .next-arrow');
    let currentSlideIndex = 0;
    let autoSlideInterval;
    const slideDuration = 7000; // 7 seconds per slide
    let dots = [];

    if (slides.length && dotsContainer && prevButton && nextButton) {
        function initDots() {
            dotsContainer.innerHTML = '';
            dots = [];
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.index = index;
                if (index === currentSlideIndex) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    showSlide(index);
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
                dots.push(dot);
            });
        }

        function updateDots() {
            dots.forEach((dot, index) => {
                if (index === currentSlideIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function showSlide(index) {
            const currentVideo = slides[currentSlideIndex].querySelector('.hero-video-background');
            if (currentVideo) {
                currentVideo.pause();
            }

            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (index + slides.length) % slides.length;
            slides[currentSlideIndex].classList.add('active');

            const nextVideo = slides[currentSlideIndex].querySelector('.hero-video-background');
            if (nextVideo) {
                nextVideo.play().catch(error => {
                    // console.warn("Video autoplay prevented for slide:", currentSlideIndex, error);
                });
            }
            updateDots();
        }

        function nextSlide() {
            showSlide(currentSlideIndex + 1);
        }

        function prevSlide() {
            showSlide(currentSlideIndex - 1);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, slideDuration);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        if (slides.length > 0) {
            let isActiveSet = false;
            slides.forEach((slide, index) => {
                if (slide.classList.contains('active')) {
                    currentSlideIndex = index;
                    isActiveSet = true;
                } else {
                    slide.classList.remove('active');
                }
            });
            if (!isActiveSet && slides.length > 0) {
                currentSlideIndex = 0;
                slides[currentSlideIndex].classList.add('active');
            }

            initDots();

            const initialActiveSlide = slides[currentSlideIndex];
            if (initialActiveSlide) {
                const initialVideo = initialActiveSlide.querySelector('.hero-video-background');
                if (initialVideo) {
                    initialVideo.play().catch(error => {
                        // console.warn("Initial video autoplay prevented:", error);
                    });
                }
            }

            nextButton.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide();
            });

            prevButton.addEventListener('click', () => {
                prevSlide();
                resetAutoSlide();
            });

            startAutoSlide();

            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.addEventListener('mouseenter', stopAutoSlide);
                heroSection.addEventListener('mouseleave', startAutoSlide);
            }
        }
    } // End of hero slider check

    // JavaScript for search toggle (if any) has been removed as the new search bar is always visible.
    // You can add JavaScript here if you need to handle search submissions, e.g.:
    // const searchForm = document.querySelector('.search-bar-header-new'); // Assuming you wrap it in a form
    // const searchInput = document.querySelector('.search-input-header-new');
    // if (searchForm) {
    //     searchForm.addEventListener('submit', function(event) {
    //         event.preventDefault();
    //         const searchTerm = searchInput.value;
    //         console.log('Search term:', searchTerm);
    //         // Implement your search logic here
    //     });
    // }
});