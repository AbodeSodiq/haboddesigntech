// After debug
document.addEventListener("DOMContentLoaded", function () {
    fetch('header.html')  // Fetch the header file
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load header");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            setupNavbar(); // Call function to activate navbar scripts
        })
        .catch(error => console.error('Error loading header:', error));
});

// Load the footer
document.addEventListener("DOMContentLoaded", function () {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});

// Function to activate navigation bar functionality after loading
function setupNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Add shrink effect on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });
}



// For review section
const carousel = document.querySelector('.reviews-carousel');
const leftButton = document.querySelector('.left-btn');
const rightButton = document.querySelector('.right-btn');

let autoScrollInterval;
let isDragging = false;
let startX;
let scrollLeft;
const reviewWidth = carousel.querySelector('.review').offsetWidth + 20; // Include gap

// Scroll functions
function scrollLeftHandler() {
    carousel.scrollBy({ left: -reviewWidth, behavior: 'smooth' });
}

function scrollRightHandler() {
    carousel.scrollBy({ left: reviewWidth, behavior: 'smooth' });
}

function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        if (carousel.scrollLeft >= maxScrollLeft) {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            scrollRightHandler();
        }
    }, 5000); // Scroll every 3 seconds
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Drag functionality
carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    stopAutoScroll(); // Stop auto-scroll while dragging
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust sensitivity
    carousel.scrollLeft = scrollLeft - walk;
});

carousel.addEventListener('mouseup', () => {
    isDragging = false;
    startAutoScroll(); // Resume auto-scroll after dragging
});

carousel.addEventListener('mouseleave', () => {
    isDragging = false;
    startAutoScroll(); // Resume auto-scroll after mouse leaves
});

// Touch support for mobile devices
carousel.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    stopAutoScroll();
});

carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
});

carousel.addEventListener('touchend', () => {
    isDragging = false;
    startAutoScroll();
});

// Button event listeners
rightButton.addEventListener('click', scrollRightHandler);
leftButton.addEventListener('click', scrollLeftHandler);

// Start auto-scroll on page load
startAutoScroll();



// JavaScript for WhatsApp Floating Button
document.addEventListener("DOMContentLoaded", function () {
    const chatButton = document.getElementById("chat-button");
    const chatPopup = document.getElementById("chat-popup");
    const chatOption = document.getElementById("chat-option");

    // Toggle popup visibility
    chatButton.addEventListener("click", function () {
        chatPopup.classList.toggle("show");
    });

    // Open WhatsApp link when chat option is clicked
    chatOption.addEventListener("click", function () {
        window.open("https://wa.me/1234567890", "_blank"); // Replace with your WhatsApp number
    });
});



// engineering center

function toggleDescription(box) {
    // Check if this box is already active
    let isActive = box.classList.contains("active");

    // Close all boxes first
    document.querySelectorAll('.service-box').forEach(item => {
        item.classList.remove("active");
    });

    // If it wasn't active before, open it now
    if (!isActive) {
        box.classList.add("active");
    }
}

function requestService() {
    window.open("https://wa.me/2348145313364", "_blank");
}

// FAQ section
document.addEventListener("DOMContentLoaded", function () {
    // Function to animate elements when they appear in the viewport
    function animateOnScroll(selector, animationClasses) {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return; // Prevent errors if no elements exist

        elements.forEach((element, index) => {
            const animationType = animationClasses[index % animationClasses.length];
            element.classList.add(animationType);

            const observer = new IntersectionObserver(
                (entries, observerInstance) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            element.classList.add("visible");
                            observerInstance.unobserve(element);
                        }
                    });
                },
                { threshold: 0.2 }
            );
            observer.observe(element);
        });
    }

    // Animate "What You Will Learn" section
    animateOnScroll(".content-box", ["left-slide", "right-slide", "zoom-fade"]);

    // Animate FAQ Section
    const faqSection = document.querySelector(".faq-section");
    if (faqSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    faqSection.classList.add("visible");
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(faqSection);
    }

    animateOnScroll(".faq-item", ["left-slide", "right-slide", "fade-in"]);

    // FAQ Toggle (Expand Answer)
    document.querySelectorAll(".faq-item").forEach((item) => {
        item.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });
});


// Login Section
document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission
            let errorMessage = document.getElementById("error-message");
            if (errorMessage) {
                errorMessage.style.display = "block"; // Show error message
            }
        });
    }
});
