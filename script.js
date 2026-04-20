// script.js

// 1. Navbar style update on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Intersection Observer for Fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElements.forEach(el => {
    appearOnScroll.observe(el);
});

// Trigger appear immediately for elements already in view on load
document.addEventListener('DOMContentLoaded', () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
            el.classList.add('appear');
            appearOnScroll.unobserve(el);
        }
    });
});

// 3. Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

// Check for saved user preference, if any, on load
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    bodyElement.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    let theme = 'light';
    if (bodyElement.classList.contains('dark-mode')) {
        theme = 'dark';
        themeToggleBtn.textContent = '☀️';
    } else {
        themeToggleBtn.textContent = '🌙';
    }
    // Save the user's preference in localStorage
    localStorage.setItem('theme', theme);
});
