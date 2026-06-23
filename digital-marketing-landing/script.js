document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = question.classList.contains('active');
            
            // Close all other accordions
            faqItems.forEach(otherItem => {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                
                if (otherQuestion !== question) {
                    otherQuestion.classList.remove('active');
                    otherAnswer.style.height = '0px';
                }
            });

            // Toggle current accordion
            if (!isOpen) {
                question.classList.add('active');
                const answerInner = answer.querySelector('.answer-inner');
                answer.style.height = `${answerInner.offsetHeight}px`;
            } else {
                question.classList.remove('active');
                answer.style.height = '0px';
            }
        });
    });

    // Checkout Modal Logic
    const modalOverlay = document.getElementById('checkoutModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalTriggers = document.querySelectorAll('.open-modal-trigger');

    function openModal() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close when clicking outside the white card (on the dark overlay)
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Smooth Scroll for Anchor Links (excluding modal triggers)
    document.querySelectorAll('a[href^="#"]:not(.open-modal-trigger)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Sticky Mobile CTA Logic
    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.querySelector('.hero');
    const offerSection = document.getElementById('oferta');

    if (stickyCta && heroSection && offerSection) {
        // Create an Intersection Observer to track if the Hero section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If Hero section is NOT intersecting (user scrolled past it), show the Sticky CTA
                if (!entry.isIntersecting) {
                    stickyCta.classList.add('visible');
                    document.body.classList.add('sticky-active');
                } else {
                    stickyCta.classList.remove('visible');
                    document.body.classList.remove('sticky-active');
                }
            });
        }, { threshold: 0.1 }); // Trigger when only 10% of Hero is visible
        
        observer.observe(heroSection);

        // Optional: Hide Sticky CTA when the actual Offer section is in view to avoid double buttons
        const offerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyCta.classList.remove('visible'); // Hide when seeing the main offer
                    document.body.classList.remove('sticky-active');
                } else if (window.scrollY > heroSection.offsetHeight) {
                    // Only bring it back if we are still past the hero section
                    stickyCta.classList.add('visible');
                    document.body.classList.add('sticky-active');
                }
            });
        }, { threshold: 0.2 });
        
        offerObserver.observe(offerSection);
    }
});
