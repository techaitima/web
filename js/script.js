/**
 * BotForge AI - Main JavaScript
 * Professional landing page interactions
 */

(function() {
    'use strict';

    // ============================================
    // INITIALIZATION
    // ============================================
    console.log('🚀 BotForge AI - Script loaded successfully');
    console.log('📅 Loaded at:', new Date().toLocaleString('ru-RU'));

    document.addEventListener('DOMContentLoaded', function() {
        console.log('✅ DOM fully loaded and parsed');
        
        // Initialize all modules
        initMobileMenu();
        initSmoothScroll();
        initFormHandling();
        initScrollAnimations();
        initHeaderScroll();
        initKeyboardNavigation();
        
        // Add page loaded class for animations
        document.body.classList.add('page-loaded');
        
        // Welcome animation
        showWelcomeAnimation();
    });

    // ============================================
    // WELCOME ANIMATION
    // ============================================
    function showWelcomeAnimation() {
        const headline = document.querySelector('.hero__headline');
        if (headline) {
            headline.style.opacity = '0';
            headline.style.transform = 'translateY(20px)';
            
            setTimeout(function() {
                headline.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                headline.style.opacity = '1';
                headline.style.transform = 'translateY(0)';
            }, 200);
        }
    }

    // ============================================
    // MOBILE MENU
    // ============================================
    function initMobileMenu() {
        const menuBtn = document.querySelector('.header__menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const menuOverlay = document.querySelector('.mobile-menu__overlay');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

        if (!menuBtn || !mobileMenu || !menuOverlay) {
            console.warn('Mobile menu elements not found');
            return;
        }

        function openMobileMenu() {
            menuBtn.classList.add('is-active');
            menuBtn.setAttribute('aria-expanded', 'true');
            mobileMenu.classList.add('is-open');
            mobileMenu.setAttribute('aria-hidden', 'false');
            menuOverlay.classList.add('is-visible');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            menuBtn.classList.remove('is-active');
            menuBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('is-open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            menuOverlay.classList.remove('is-visible');
            document.body.style.overflow = '';
        }

        menuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('is-open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        menuOverlay.addEventListener('click', closeMobileMenu);

        mobileMenuLinks.forEach(function(link) {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                closeMobileMenu();
                menuBtn.focus();
            }
        });

        console.log('📱 Mobile menu initialized');
    }

    // ============================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ============================================
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        console.log('🔗 Smooth scroll initialized');
    }

    // ============================================
    // EMAIL VALIDATION & FORM HANDLING
    // ============================================
    function initFormHandling() {
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email.toLowerCase());
        }

        function handleFormSubmit(form, messageElement) {
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            // Clear previous messages
            messageElement.textContent = '';
            messageElement.className = 'form-message';
            emailInput.classList.remove('input--error');

            // Validate email
            if (!email) {
                emailInput.classList.add('input--error');
                messageElement.textContent = 'Пожалуйста, введите email';
                messageElement.classList.add('form-message--error');
                emailInput.focus();
                return false;
            }

            if (!validateEmail(email)) {
                emailInput.classList.add('input--error');
                messageElement.textContent = 'Пожалуйста, введите корректный email';
                messageElement.classList.add('form-message--error');
                emailInput.focus();
                return false;
            }

            // Success - log to console
            console.log('📧 Email submitted:', email);
            console.log('📝 Form:', form.id);

            // Show success message with animation
            messageElement.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
            messageElement.classList.add('form-message--success');
            messageElement.style.animation = 'fadeInUp 0.5s ease';
            
            // Clear the input
            emailInput.value = '';

            return true;
        }

        // Hero form
        const heroForm = document.getElementById('hero-form');
        const heroFormMessage = document.getElementById('hero-form-message');

        if (heroForm && heroFormMessage) {
            heroForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmit(heroForm, heroFormMessage);
            });
        }

        // Signup form
        const signupForm = document.getElementById('signup-form');
        const signupFormMessage = document.getElementById('signup-form-message');

        if (signupForm && signupFormMessage) {
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmit(signupForm, signupFormMessage);
            });
        }

        console.log('📝 Form handling initialized');
    }

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');

        if (!animatedElements.length) {
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    // Add staggered delay for multiple elements
                    setTimeout(function() {
                        entry.target.classList.add('is-visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(element) {
            observer.observe(element);
        });

        console.log('✨ Scroll animations initialized');
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        function handleScroll() {
            const currentScroll = window.pageYOffset;

            // Add/remove scrolled class
            if (currentScroll > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }

        // Throttle scroll event
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        console.log('📜 Header scroll effect initialized');
    }

    // ============================================
    // KEYBOARD NAVIGATION SUPPORT
    // ============================================
    function initKeyboardNavigation() {
        // Focus visible for buttons and links
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });

        console.log('⌨️ Keyboard navigation initialized');
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = function() {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }

})();
