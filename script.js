document.addEventListener("DOMContentLoaded", function () {
    // Load Header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;
            return new Promise(resolve => setTimeout(resolve, 100)); // Ensure rendering completes
        })
        .then(() => setupNavbar())
        .catch(error => console.error("Error loading header:", error));

    // Load Footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Error loading footer:", error));

    function setupNavbar() {
        const navbar = document.getElementById("navbar");
        const menuToggle = document.getElementById("menu-toggle");
        const navLinks = document.getElementById("nav-links");
        
        if (menuToggle && navLinks) {
            menuToggle.addEventListener("click", () => {
                navLinks.classList.toggle("active");
            });
        }

        // Add shrink effect on scroll
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.classList.add("shrink");
            } else {
                navbar.classList.remove("shrink");
            }
        });
    }

    // Reviews Carousel
    const carousel = document.querySelector(".reviews-carousel");
    if (carousel) {
        const leftButton = document.querySelector(".left-btn");
        const rightButton = document.querySelector(".right-btn");
        let autoScrollInterval;
        let isDragging = false;
        let startX;
        let scrollLeft;
        const reviewWidth = carousel.querySelector(".review").offsetWidth + 20;

        function scrollLeftHandler() {
            carousel.scrollBy({ left: -reviewWidth, behavior: "smooth" });
        }

        function scrollRightHandler() {
            carousel.scrollBy({ left: reviewWidth, behavior: "smooth" });
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
                if (carousel.scrollLeft >= maxScrollLeft) {
                    carousel.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    scrollRightHandler();
                }
            }, 5000);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // Drag and touch support
        function startDragging(e) {
            isDragging = true;
            startX = e.pageX || e.touches[0].pageX;
            scrollLeft = carousel.scrollLeft;
            stopAutoScroll();
        }

        function moveDragging(e) {
            if (!isDragging) return;
            const x = (e.pageX || e.touches[0].pageX) - startX;
            carousel.scrollLeft = scrollLeft - x * 1.5;
        }

        function endDragging() {
            isDragging = false;
            startAutoScroll();
        }

        carousel.addEventListener("mousedown", startDragging);
        carousel.addEventListener("mousemove", moveDragging);
        carousel.addEventListener("mouseup", endDragging);
        carousel.addEventListener("mouseleave", endDragging);
        carousel.addEventListener("touchstart", startDragging);
        carousel.addEventListener("touchmove", moveDragging);
        carousel.addEventListener("touchend", endDragging);

        rightButton.addEventListener("click", scrollRightHandler);
        leftButton.addEventListener("click", scrollLeftHandler);

        startAutoScroll();
    }

    // WhatsApp Floating Button
    const chatButton = document.getElementById("chat-button");
    const chatPopup = document.getElementById("chat-popup");
    const chatOption = document.getElementById("chat-option");

    if (chatButton && chatPopup && chatOption) {
        chatButton.addEventListener("click", () => {
            chatPopup.classList.toggle("show");
        });
        chatOption.addEventListener("click", () => {
            window.open("https://wa.me/1234567890", "_blank");
        });
    }

    // Engineering Center Service Toggle
    document.querySelectorAll(".service-box").forEach(box => {
        box.addEventListener("click", function () {
            document.querySelectorAll(".service-box").forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // FAQ Section Animation
    function animateOnScroll(selector, animationClass) {
        document.querySelectorAll(selector).forEach(element => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.classList.add("visible");
                        observer.unobserve(element);
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(element);
        });
    }

    animateOnScroll(".content-box", "fade-in");
    animateOnScroll(".faq-item", "fade-in");

    // FAQ Toggle
    document.querySelectorAll(".faq-item").forEach(item => {
        item.addEventListener("click", () => item.classList.toggle("active"));
    });

    // Login Form
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            document.getElementById("error-message").style.display = "block";
        });
    }
});
