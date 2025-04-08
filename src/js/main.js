/* =====================================================
Resume section tabs and tab contents
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".resume-tab-content");

    tabButtons.forEach((btn, index) => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();

            tabButtons.forEach(button => button.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            this.classList.add("active");
            tabContents[index].classList.add("active");
        });
    });
});

/* =====================================================
Service modal open/close function
===================================================== */

const serviceCardWithModals = document.querySelectorAll(".service-container .card-with-modal");

serviceCardWithModals.forEach((serviceCardWithModal) => {
    const serviceCard = serviceCardWithModal.querySelector(".service-card");
    const serviceBackDrop = serviceCardWithModal.querySelector(".service-modal-backdrop");
    const serviceModal = serviceCardWithModal.querySelector(".service-modal");
    const modalCloseBtn = serviceCardWithModal.querySelector(".modal-close-btn");

    serviceCard.addEventListener("click", () => {
        serviceBackDrop.style.display = "flex";

        setTimeout(() => {
            serviceBackDrop.classList.add("active");
        }, 100);

        setTimeout(() => {
            serviceModal.classList.add("active");
        }, 300);
    });

    modalCloseBtn.addEventListener("click", () => {
        serviceModal.classList.remove("active");

        setTimeout(() => {
            serviceBackDrop.classList.remove("active");
        }, 500);

        setTimeout(() => {
            serviceBackDrop.style.display = "none";
        }, 100);
    });

});

/* =====================================================
Portfolio modals, tabs and cards
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const portfolioTabs = document.querySelectorAll(".portfolio-tabs");

    portfolioTabs.forEach((tabs) => {
        const portfolioTabBtns = tabs.querySelectorAll(".tab-btn");
        const cardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

        portfolioTabBtns.forEach((tabBtn) => {
            tabBtn.addEventListener("click", () => {
                const filter = tabBtn.getAttribute("data-filter");

                cardsWithModals.forEach((cardWithModal) => {
                    if (filter === "all" || cardWithModal.classList.contains(filter)) {

                        cardWithModal.style.display = "block";
                        setTimeout(() => {
                            cardWithModal.style.opacity = "1";
                            cardWithModal.style.transition = "0.5s ease";
                        }, 1);
                    } else {
                        cardWithModal.style.display = "none";

                        setTimeout(() => {
                            cardWithModal.style.opacity = "0";
                            cardWithModal.style.transition = "0.5s ease";
                        }, 1);
                    }
                });

                portfolioTabBtns.forEach((button) => {
                    button.classList.remove("active");
                }
                );
                tabBtn.classList.add("active");
            });
        });
    });
});

const portfolioCardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

portfolioCardsWithModals.forEach((portfolioCardWithModal) => {
    const portfolioCard = portfolioCardWithModal.querySelector(".portfolio-card");
    const portfolioBackDrop = portfolioCardWithModal.querySelector(".portfolio-modal-backdrop");
    const portfolioModal = portfolioCardWithModal.querySelector(".portfolio-modal");
    const modalCloseBtn = portfolioCardWithModal.querySelector(".modal-close-btn");

    portfolioCard.addEventListener("click", () => {
        portfolioBackDrop.style.display = "flex";

        setTimeout(() => {
            portfolioBackDrop.classList.add("active");
        }, 300);

        setTimeout(() => {
            portfolioModal.classList.add("active");
        }, 300);
    });

    modalCloseBtn.addEventListener("click", () => {
        portfolioModal.classList.remove("active");

        setTimeout(() => {
            portfolioBackDrop.classList.remove("active");
        }, 500);

        setTimeout(() => {
            portfolioBackDrop.style.display = "none";
        }, 100);
    });
});

/* =====================================================
Testimonial Swiper
===================================================== */

var swiper = new Swiper(".client-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/* =====================================================
Send/Receive emails from contact form - EmailJS
===================================================== */

(function () {
    emailjs.init({
        publicKey: "RJ7vSDjpcRXtIAvmR",
    });
})();

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const contactFormAlert = document.querySelector(".contact-form-alert");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            emailjs.sendForm("service_43jhroh", "template_8yjer1g", contactForm)
                .then(() => {
                    contactFormAlert.innerHTML = "<span>Message Sent Successfully!</span> <i class='ri-checkbox-circle-fill'></i>";
                    (function () {
                        emailjs.init({
                            publicKey: "RJ7vSDjpcRXtIAvmR",
                        });
                    })();

                    document.addEventListener("DOMContentLoaded", function () {
                        const contactForm = document.getElementById("contact-form");
                        const contactFormAlert = document.querySelector(".contact-form-alert");

                        if (contactForm) {
                            contactForm.addEventListener("submit", function (event) {
                                event.preventDefault();

                                emailjs.sendForm("service_43jhroh", "template_8yjer1g", contactForm)
                                    .then(() => {
                                        contactFormAlert.innerHTML = "<span>Message Sent Successfully!</span> <i class='ri-checkbox-circle-fill'></i>";
                                        contactForm.reset();
                                    })
                                    .catch((error) => {
                                        contactFormAlert.innerHTML = "<span>Message Not Sent!</span> <i class='ri-error-warning-fill'></i>";
                                        console.error("EmailJS Error:", error);
                                    });
                            });
                        } else {
                            console.error("Error: contact-form element not found.");
                        }
                    });

                })
                .catch((error) => {
                    contactFormAlert.innerHTML = "<span>Message Not Sent!</span> <i class='ri-error-warning-fill'></i>";
                    console.error("EmailJS Error:", error);
                });
        });
    } else {
        console.error("Error: contact-form element not found.");
    }
});

/* =====================================================
Shrink the height of the header on scroll
===================================================== */
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");

    header.classList.toggle("shrink", window.scrollY > 0);
});

/* =====================================================
Bottom navigation menu
===================================================== */

// Each bottom navigation menu items active on page scroll.
window.addEventListener("scroll", () => {
    const navMenuSections = document.querySelectorAll(".nav-menu-section");
    const scrollY = window.scrollY;

    navMenuSections.forEach((navMenuSection) => {
        let sectionHeight = navMenuSection.offsetHeight;
        let sectionTop = navMenuSection.offsetTop - 50;
        let id = navMenuSection.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            let link = document.querySelector(".bottom-nav .menu li a[href*='" + id + "']");
            if (link) link.classList.add("current");
        } else {
            let link = document.querySelector(".bottom-nav .menu li a[href*='" + id + "']");
            if (link) link.classList.remove("current");
        }
    });
});

// Javascript to show bottom navigation menu on home(page load).
window.addEventListener("DOMContentLoaded", () => {
    const bottomNav = document.querySelector(".bottom-nav");

    bottomNav.classList.toggle("active", window.scrollY < 10);
});

// Javascript to show/hide bottom navigation menu on home(scroll).
const bottomNav = document.querySelector(".bottom-nav");
const menuHideBtn = document.querySelector(".menu-hide-btn");
const menuShowBtn = document.querySelector(".menu-show-btn");
var navTimeout;

window.addEventListener("scroll", () => {
    bottomNav.classList.add("active");
    menuShowBtn.classList.remove("active");

    if (window.scrollY < 10) {
        menuHideBtn.classList.remove("active");

        function scrollStopped() {
            bottomNav.classList.add("active");
        }

        clearTimeout(navTimeout);
        navTimeout = setTimeout(scrollStopped, 2000);
    }

    if (window.scrollY > 10) {
        menuHideBtn.classList.add("active");
        menuShowBtn.classList.remove("active");

        function scrollStopped() {
            bottomNav.classList.remove("active");
            menuShowBtn.classList.add("active");
        }

        clearTimeout(navTimeout);
        navTimeout = setTimeout(scrollStopped, 2000);
    }
});

// Hide bottom navigation menu on click menu-hide-btn.
menuHideBtn.addEventListener("click", () => {
    bottomNav.classList.toggle("active");
    menuHideBtn.classList.toggle("active");
    menuShowBtn.classList.toggle("active");
});


// Show bottom navigation menu on click menu-show-btn.
menuShowBtn.addEventListener("click", () => {
    bottomNav.classList.toggle("active");
    menuHideBtn.classList.toggle("active");
    menuShowBtn.classList.toggle("active");
});

/* =====================================================
To-top-button with scroll indicator bar
===================================================== */
window.addEventListener("scroll", () => {
    const toTopBtn = document.querySelector(".to-top-btn");

    toTopBtn.classList.toggle("active", window.scrollY > 0);

    // Scroll indicator bar on scroll.
    const scrollIndicator = document.querySelector(".scroll-indicator-bar");

    const pageScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = (pageScroll / height) * 100;

    scrollIndicator.style.height = scrolled + "%";

});

/* =====================================================
Customized cursor on mousemove
===================================================== */
const cursor = document.querySelector(".cursor");
const cousorDot = cursor.querySelector(".cursor-dot");
const cursorCircle = cursor.querySelector(".cursor-circle");

document.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
});

// Cursor effects on hover website elements.
const cursorHoverLinks = document.querySelectorAll("body a, .theme-btn, .main-btn, .portfolio-card, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .tab-btn, .service-card, .portfolio-card, .modal-close-btn, .contact-social-links li, .contact-form .submit-btn, .menu-hide-btn, .menu-show-btn");

cursorHoverLinks.forEach((link) => {
    link.addEventListener("mouseover", () => {
        cousorDot.classList.add("large");
        cursorCircle.style.display = "none";
    });
});

cursorHoverLinks.forEach((link) => {
    link.addEventListener("mouseout", () => {
        cousorDot.classList.remove("large");
        cursorCircle.style.display = "block";
    });
});

/* =====================================================
Website dark/light theme
===================================================== */

// Change theme and save current theme on click the theme button.
const themeBtn = document.querySelector(".theme-btn");

// Ensure themeBtn exists before adding an event listener
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        // Change theme icon and theme on click
        themeBtn.classList.toggle("active-sun-icon");
        document.body.classList.toggle("light-theme");

        // Save theme icon and theme in localStorage
        const getCurrentIcon = themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
        const getCurrentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";

        localStorage.setItem("saved-icon", getCurrentIcon);
        localStorage.setItem("saved-theme", getCurrentTheme);
    });

    // Get saved theme icon and theme on document load
    document.addEventListener("DOMContentLoaded", () => {
        const savedIcon = localStorage.getItem("saved-icon");
        const savedTheme = localStorage.getItem("saved-theme");

        if (savedIcon === "sun") {
            themeBtn.classList.add("active-sun-icon");
        } else {
            themeBtn.classList.remove("active-sun-icon");
        }

        if (savedTheme === "light") {
            document.body.classList.add("light-theme");
        } else {
            document.body.classList.remove("light-theme");
        }
    });
}

/* =====================================================
ScrollReveal JS animations
===================================================== */

// Common reveal options to create reveal animations.
// ScrollReveal({
//     reset: true,
//     distance: '30px',
//     duration: 2500,
//     delay: 400
// });

// ScrollReveal({
//     reset: true,
//     distance: '30px',
//     duration: 3500,
//     delay: 400
// });

// Target elements and specify options to create reveal animations.
// ScrollReveal().reveal('.avatar-img', { delay: 100, origin: 'top' });
// ScrollReveal().reveal('.avatar-info, .section-title', { delay: 300, origin: 'top' });
// ScrollReveal().reveal('.home-social, .home-scroll-btn, .copy-right', { delay: 600, origin: 'bottom' });
// ScrollReveal().reveal('.about-img', { delay: 700, origin: 'bottom' });
// ScrollReveal().reveal('.about-info, .footer .logo', { delay: 300, origin: 'bottom' });
// ScrollReveal().reveal('.pro-card, .about-buttons, .main-btn, .resume-tabs, .tab-btn, .portfolio-tabs .tab-btn', { delay: 500, origin: 'right', interval: 200 });
// ScrollReveal().reveal('#resume .section-content', { delay: 700, origin: 'bottom' });
// ScrollReveal().reveal('.service-card, .portfolio-card, .contact-itom, .contact-social-links li, .footer-menu .menu-item', { delay: 300, origin: 'bottom', interval: 300 });
// ScrollReveal().reveal('.client-swiper, .contact-form-body', { delay: 700, origin: 'right' });
// ScrollReveal().reveal('.contact-info h3', { delay: 100, origin: 'bottom', interval: 300 });

// ScrollReveal().reveal('.avatar-img', { delay: 10, origin: 'top' });
// ScrollReveal().reveal('.avatar-info, .section-title', { delay: 10, origin: 'top' });
// ScrollReveal().reveal('.home-social, .home-scroll-btn, .copy-right', { delay: 10, origin: 'bottom' });
// ScrollReveal().reveal('.about-img', { delay: 10, origin: 'bottom' });
// ScrollReveal().reveal('.about-info, .footer .logo', { delay: 10, origin: 'bottom' });
// ScrollReveal().reveal('.pro-card, .about-buttons, .main-btn', { delay: 10, origin: 'right' });
// ScrollReveal().reveal('#resume .section-content', { delay: 10, origin: 'bottom' });
// ScrollReveal().reveal(' .contact-itom, .contact-social-links li, .footer-menu .menu-item', { delay: 10, origin: 'bottom' });
// ScrollReveal().reveal('.client-swiper, .contact-form-body', { delay: 10, origin: 'right' });
// ScrollReveal().reveal('.contact-info h3', { delay: 10, origin: 'bottom'});

