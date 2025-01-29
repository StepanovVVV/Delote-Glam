// Header/burger-menu
document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu-mob');
    const body = document.body;
    const overlay = document.querySelector('.header__overlay');
    const menuLinks = document.querySelectorAll('.header__menu a');

    if (burger) {
        burger.addEventListener('click', function () {
            const isActive = burger.classList.toggle('active');
            menu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('no-scroll', isActive);
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function () {
            burger.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    }

    if (menuLinks.length > 0) {
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                burger.classList.remove('active');
                menu.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }
});

// LazyLoad img/iframe/video
$(document).ready(function () {
    $('img[src]').each(function () {
        var $img = $(this);
        var src = $img.attr('src');
        $img.attr('data-lazy-src', src);
        $img.attr('loading', 'lazy');
        $img.removeAttr('src');
        $img.addClass('lazyload');
    });

    var lazyLoadInstance = new LazyLoad({
        elements_selector: 'img[data-lazy-src], .pre-lazyload, [data-pre-lazyload], video[data-lazy-src]',
        data_src: "lazy-src",
        data_srcset: "lazy-srcset",
        data_sizes: "lazy-sizes",
        skip_invisible: false,
        class_loading: "lazyloading",
        class_loaded: "lazyloaded"
    });

    window.addEventListener('LazyLoad::Initialized', function (e) {
    }, false);

    $(document).on("init", ".slick-slider", function (e, slick) {
        lazyLoadInstance.loadAll(slick.$slider[0].getElementsByTagName('img'));
    });

    // Init parallax
    if (typeof $.fn.jarallax !== 'undefined') {
        $('.jarallax').jarallax({
            speed: 0.5
        });

        $('.jarallax-inline').jarallax({
            speed: 0.5,
            keepImg: true,
            onInit: function () {
                lazyLoadInstance.update();
            }
        });
    }

    $(document).on('updated_wc_div', function () {
        lazyLoadInstance.loadAll();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        lazyImages.forEach(function (lazyImage) {
            lazyImage.src = lazyImage.dataset.src;
        });
    }
});

//Remove placeholder on click
$('input,textarea').on('focus', function () {
    var $this = $(this);
    if ($this.attr('placeholder')) {
        $this.data('placeholder', $this.attr('placeholder'));
        $this.attr('placeholder', '');
    }
}).on('blur', function () {
    var $this = $(this);
    if ($this.data('placeholder')) {
        $this.attr('placeholder', $this.data('placeholder'));
    }
});

// Function for start page
function showPageAfterDelay() {
    if (document.readyState === 'complete') {
        setTimeout(function () {
            document.body.classList.remove('hidden');
        }, 300);
    } else {
        window.addEventListener('load', function () {
            setTimeout(function () {
                document.body.classList.remove('hidden');
            }, 300);
        });
    }
}

showPageAfterDelay();

// Add class for header scroll
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');

    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }

        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// For scroll page
const headerScroll = document.querySelector('.header');
const menuLinks = document.querySelectorAll('a[href^="#"]');

menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        if (link.hasAttribute('data-fancybox')) {
            return; 
        }

        e.preventDefault();

        const targetId = this.getAttribute('href');

        if (targetId && targetId !== '#!' && targetId !== '#') {
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = headerScroll.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                let offsetPosition = targetPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Accordion
$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        var dropdownlink = this.el.find('.accordion__title');
        dropdownlink.on('click', {
                el: this.el,
                multiple: this.multiple
            },
            this.dropdown);
    };

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el,
            $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.accordion__info').not($next).slideUp().parent().removeClass('open');
        }
    }

    var accordion = new Accordion($('.accordion'), false);
})

// Tabs
$(function () {
    $("div.tabs__btns").on("click", "div.tabs__btn:not(.active)", function () {
        $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")
            .closest("div.tabs")
            .find("div.tabs__item")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
    });
});

// For active form
const inputs = document.querySelectorAll('.form__input');
const labels = document.querySelectorAll('.form__label');

if (inputs.length > 0 && labels.length > 0) {
    inputs.forEach((input, index) => {
        const label = labels[index];

        input.addEventListener('focus', function () {
            label.classList.add('active');
        });

        input.addEventListener('blur', function () {
            if (input.value === '') {
                label.classList.remove('active');
            }
        });
    });
}

// Mask for phones
$(function () {
    $("#phone, #phone-2").mask("+55 (999) 999-99-99");
});

// Home slider
$(document).ready(function () {
    var $slider = $('.home-slider__slick');
    var slideCount = $slider.children().length;

    $slider.slick({
        dots: slideCount > 1,
        arrows: false, 
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    arrows: false,
                }
            }
        ] 
    });
});

// Gallary slider
$('.brands__slider').slick({
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
            breakpoint: 760,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ]
});

// Fancybox
$(document).ready(function() {
    if ($('[data-fancybox="gallery"]').length) {
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
                "zoom",
                "slideShow",
                "fullScreen",
                "thumbs",
                "close"
            ],
            loop: true,
            protect: true,
            wheel: false,
            touch: false,
        });
    }

    if ($('[data-fancybox="popup"]').length) {
        $('[data-fancybox="popup"]').fancybox({
            buttons: [
                "zoom",
                "slideShow",
                "fullScreen",
                "thumbs",
                "close"
            ],
            closeButton: false, // Disable default close button
            loop: true,
            protect: true,
        });
    }

    // Custom close button for the popup
    $('.popup__close').on('click', function() {
        $.fancybox.close();  // Close Fancybox popup when the custom close button is clicked
    });
});

// Read more btn
document.addEventListener('DOMContentLoaded', function () {
    const readMoreBtn = document.querySelector('.read-more-btn');
    const hiddenText = document.querySelector('.hidden-text');

    if (readMoreBtn && hiddenText) {
        readMoreBtn.addEventListener('click', function() {
            if (hiddenText.style.display === 'none') {
                hiddenText.style.display = 'block';
                this.textContent = 'Read less';
            } else {
                hiddenText.style.display = 'none';
                this.textContent = 'Read more';
            }
        });
    }
});

// Toggle Orientatio nClass
window.addEventListener('resize', function() {
    var scrollDownElement = document.querySelector('.scrooll-down');
    
    if (scrollDownElement) {
        if (window.innerWidth <= 1024) {
            if (window.innerWidth > window.innerHeight) {
                scrollDownElement.classList.add('landscape');
                scrollDownElement.classList.remove('portrait');
            } else {
                scrollDownElement.classList.add('portrait');
                scrollDownElement.classList.remove('landscape');
            }
        } else {
            scrollDownElement.classList.remove('landscape', 'portrait');
        }
    }
});

(function() {
    var scrollDownElement = document.querySelector('.scrooll-down');
    
    if (scrollDownElement) {
        if (window.innerWidth <= 1024) {
            if (window.innerWidth > window.innerHeight) {
                scrollDownElement.classList.add('landscape');
                scrollDownElement.classList.remove('portrait');
            } else {
                scrollDownElement.classList.add('portrait');
                scrollDownElement.classList.remove('landscape');
            }
        } else {
            scrollDownElement.classList.remove('landscape', 'portrait');
        }
    }
})();

// Popup info
document.addEventListener('DOMContentLoaded', function () {
    var openButtons = document.querySelectorAll('.btn-open');
    var closeButtons = document.querySelectorAll('.info__btn-close');

    openButtons.forEach(function (openButton) {
        openButton.addEventListener('click', function (event) {
            event.preventDefault();
            var bodyWrapper = this.closest('.body-wrapper');
            var infoElement = bodyWrapper.querySelector('.info');
            
            infoElement.classList.add('active');
            bodyWrapper.classList.add('no-scroll');
        });
    });

    closeButtons.forEach(function (closeButton) {
        closeButton.addEventListener('click', function () {
            var bodyWrapper = this.closest('.body-wrapper');
            var infoElement = bodyWrapper.querySelector('.info');

            infoElement.classList.remove('active');
            bodyWrapper.classList.remove('no-scroll');
        });
    });
});

// Reviews
let rating = 0; // Current rating

// Display rating when clicking on stars
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function () {
        rating = parseInt(this.getAttribute('data-value'));
        updateStarDisplay();
    });

    star.addEventListener('mouseover', function () {
        this.classList.add('hover');
    });

    star.addEventListener('mouseout', function () {
        this.classList.remove('hover');
    });
});

// Update the display of stars
function updateStarDisplay() {
    document.querySelectorAll('.star').forEach(star => {
        if (parseInt(star.getAttribute('data-value')) <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Function to submit a review
function submitReview() {
    let nameElement = document.getElementById('name');
    let reviewElement = document.getElementById('review');

    // Проверяем наличие необходимых элементов
    if (nameElement && reviewElement) {
        let name = nameElement.value;
        let review = reviewElement.value;

        if (name && review && rating > 0) {
            // Get the current date
            let currentDate = new Date();
            let formattedDate = currentDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });

            // Create a review object
            let newReview = {
                date: formattedDate,
                rating: rating,
                name: name,
                review: review
            };

            // Get existing reviews from localStorage
            let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

            // Add the new review to the beginning of the array
            reviews.unshift(newReview);

            // Save the updated reviews list to localStorage
            localStorage.setItem('reviews', JSON.stringify(reviews));

            // Clear the form after submission
            nameElement.value = '';
            reviewElement.value = '';
            rating = 0;
            updateStarDisplay();

            // Reload the reviews list on the page
            loadReviews();
        } else {
            alert('Please fill in all fields and select a rating.');
        }
    }
}

// Function to load and display reviews
function loadReviews() {
    // Проверяем наличие контейнера для отзывов
    let reviewsContainer = document.getElementById('reviewsContainer');
    if (reviewsContainer) {
        // Get the reviews list from localStorage
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

        reviewsContainer.innerHTML = ''; // Clear the container before adding new reviews

        // Loop through reviews and add them to the page
        reviews.forEach(review => {
            let newReview = document.createElement('div');
            newReview.classList.add('reviews__review');
            newReview.innerHTML = `
                <span class="reviews__date">${review.date}</span>
                <div class="rating">${'&#9733;'.repeat(review.rating)}${'&#9734;'.repeat(5 - review.rating)}</div>
                <h3>${review.name}</h3>
                <p>${review.review}</p>
            `;
            reviewsContainer.appendChild(newReview);
        });
    }
}

// Load reviews on page load
window.onload = function() {
    // Проверяем наличие контейнера для отзывов перед загрузкой
    if (document.getElementById('reviewsContainer')) {
        loadReviews();
    }
};

// Function to automatically resize the height of the textarea
const reviewElement = document.getElementById('review');
if (reviewElement) {
    reviewElement.addEventListener('input', function () {
        this.style.height = 'auto'; 
        this.style.height = this.scrollHeight + 'px';
    });
}

// For phones add/delete class active
document.addEventListener('DOMContentLoaded', function () {
    const phonesIcon = document.querySelector('.phones__icon');
    const phonesWrap = document.querySelector('.phones__wrap');
    const phonesSocials = document.querySelector('.phones__socials');

    if (phonesIcon && phonesWrap && phonesSocials) {
        function toggleActiveClass() {
            phonesWrap.classList.toggle('active');
            phonesSocials.classList.toggle('active');
        }

        function closeOnClickOutside(event) {
            if (!phonesIcon.contains(event.target) && 
                !phonesWrap.contains(event.target) && 
                !phonesSocials.contains(event.target)) {
                phonesWrap.classList.remove('active');
                phonesSocials.classList.remove('active');
            }
        }

        phonesIcon.addEventListener('click', toggleActiveClass);

        document.addEventListener('click', closeOnClickOutside);
    }
});

// Btn for scroll up 
document.addEventListener('DOMContentLoaded', function () {
    const scrollUpButton = document.querySelector('.scroll-up');

    if (scrollUpButton) {

        function toggleScrollUpButton() {
            if (window.scrollY > 100) {
                scrollUpButton.classList.add('show');
            } else {
                scrollUpButton.classList.remove('show');
            }
        }

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        toggleScrollUpButton(); 

        window.addEventListener('scroll', toggleScrollUpButton);

        scrollUpButton.addEventListener('click', scrollToTop);
    }
});

// Redirect To ThankYouPage for test
function redirectToThankYouPage(event) {
    event.preventDefault(); 

    window.location.href = 'thank-you.html';
}

