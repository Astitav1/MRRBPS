document.addEventListener('DOMContentLoaded', () => {

    const body = document.body; 
    const navbar = document.querySelector('.navbar');
    let navbarHeight = navbar?.offsetHeight || 70;
    window.addEventListener('resize', () => {
        navbarHeight = navbar?.offsetHeight || 70;
    });


    const navLinksForScroll = document.querySelectorAll('.nav-links a[href^="#"], .btn-primary[href^="#"], .register-btn a[href^="#"]');
    navLinksForScroll.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 15; 

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });

                    if (navLinks && body.classList.contains('nav-open')) closeMobileNav();
                    updateActiveNavLink(href);
                }
            }
        });
    });

    function updateActiveNavLink(activeHref) {
         document.querySelectorAll('.nav-links a').forEach(navLink => {
             if (navLink.getAttribute('href') === activeHref) {
                 navLink.classList.add('active');
             } else {
                 navLink.classList.remove('active');
             }
         });
    }

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    function openMobileNav() { if (navLinks && navToggle) { body.classList.add('nav-open'); navToggle.setAttribute('aria-expanded', 'true'); } }
    function closeMobileNav() { if (navLinks && navToggle) { body.classList.remove('nav-open'); navToggle.setAttribute('aria-expanded', 'false'); } }
    if (navToggle && navLinks) { navToggle.addEventListener('click', () => { body.classList.contains('nav-open') ? closeMobileNav() : openMobileNav(); }); }
    document.addEventListener('click', (event) => { if (body.classList.contains('nav-open') && !navLinks.contains(event.target) && !navToggle.contains(event.target)) closeMobileNav(); });


    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    const heroSection = document.getElementById('home');

    if (slider && slides.length > 0) {
        let currentSlide = 0; const totalSlides = slides.length; let slideInterval;
        const slideWidthPercentage = 100 / totalSlides;
        slider.style.width = `${totalSlides * 100}%`;
        slides.forEach(slide => slide.style.width = `${slideWidthPercentage}%`);

        function updateHeroBackground(index) {  if(heroSection && slides[index]) { const bgImage = slides[index].style.backgroundImage; if (bgImage) { heroSection.style.backgroundImage = bgImage; } } }
        function showSlide(index) {  currentSlide = (index + totalSlides) % totalSlides; const offset = -currentSlide * 100; slider.style.transform = `translateX(${offset / totalSlides}%)`; updateHeroBackground(currentSlide); }
        function startSlideShow() {  stopSlideShow(); slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000); }
        function stopSlideShow() { clearInterval(slideInterval); }

        if (prevButton && nextButton) { prevButton.addEventListener('click', () => { showSlide(currentSlide - 1); stopSlideShow(); startSlideShow(); }); nextButton.addEventListener('click', () => { showSlide(currentSlide + 1); stopSlideShow(); startSlideShow(); }); }
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) { sliderContainer.addEventListener('mouseenter', stopSlideShow); sliderContainer.addEventListener('mouseleave', startSlideShow); }

        showSlide(currentSlide); startSlideShow();
    } else if (heroSection) {  }

     if (heroSection) { const parallaxFactor = 0.3; window.addEventListener('scroll', () => { const scrollPosition = window.pageYOffset; const newYPos = -(scrollPosition * parallaxFactor); heroSection.style.backgroundPosition = `center ${newYPos}px`; }, { passive: true }); /* Improve scroll performance */ }


    const backToTopButton = document.getElementById('back-to-top-btn');
    if (backToTopButton) {
        window.addEventListener('scroll', () => { window.scrollY > 300 ? backToTopButton.classList.add('show') : backToTopButton.classList.remove('show'); }, { passive: true });
        backToTopButton.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

    // --- Contact Form Handler (Basic Placeholder) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) { contactForm.addEventListener('submit', (e) => { /* ... (code remains same) ... */ e.preventDefault(); const name = contactForm.querySelector('#name-input').value; const email = contactForm.querySelector('#email-input').value; const message = contactForm.querySelector('#message-input').value; if (name && email && message) { alert('Thank you for your message! We will get back to you soon. (This is a demo - form data not sent)'); contactForm.reset(); } else { alert('Please fill in all fields.'); } }); }

    const popupOverlay = document.getElementById('popup-ad-overlay');
    const popupCloseBtn = document.querySelector('.popup-close-btn');
    const popupContent = document.getElementById('popup-ad-content');
    let popupTimer;
    function showPopup() { if (popupOverlay) { popupOverlay.classList.add('popup-visible'); body.classList.add('no-scroll'); } }
    function hidePopup() { if (popupOverlay) { popupOverlay.classList.remove('popup-visible'); body.classList.remove('no-scroll'); } }
    function setupPopup() { const popupDelay = 1200; if (sessionStorage.getItem('popupDismissed') !== 'true') popupTimer = setTimeout(showPopup, popupDelay); if (popupCloseBtn) popupCloseBtn.addEventListener('click', () => { hidePopup(); clearTimeout(popupTimer); sessionStorage.setItem('popupDismissed', 'true'); }); if (popupOverlay && popupContent) popupOverlay.addEventListener('click', (event) => { if (event.target === popupOverlay) { hidePopup(); clearTimeout(popupTimer); sessionStorage.setItem('popupDismissed', 'true'); } }); document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && popupOverlay?.classList.contains('popup-visible')) { hidePopup(); clearTimeout(popupTimer); sessionStorage.setItem('popupDismissed', 'true'); } }); }
    setupPopup();


    const sections = document.querySelectorAll('section[id]');
    let scrollTimeout;

    function setActiveNavLinkOnScroll() {
        clearTimeout(scrollTimeout); 
        scrollTimeout = setTimeout(() => { 
            let currentSectionId = '';
            const scrollPosition = window.pageYOffset + navbarHeight + 20; 

            sections.forEach(section => {
                if (section.offsetTop <= scrollPosition) {
                    currentSectionId = section.getAttribute('id');
                }
            });
            // Prioritize 'home' if very near the top
             if (window.pageYOffset < (heroSection?.offsetHeight || window.innerHeight) / 2) {
                 currentSectionId = 'home';
             }


            if (currentSectionId) {
                updateActiveNavLink(`#${currentSectionId}`);
            } else {
                document.querySelectorAll('.nav-links a.active').forEach(link => link.classList.remove('active'));
            }
        }, 50); 
    }
    window.addEventListener('scroll', setActiveNavLinkOnScroll, { passive: true });
    setActiveNavLinkOnScroll();


    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
            
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    document.addEventListener('DOMContentLoaded', () => {
    
        const contactWidget = document.getElementById('sticky-contact-widget');
        const contactToggleBtn = document.getElementById('contact-widget-toggle');
    
        if (contactWidget && contactToggleBtn) {
            contactToggleBtn.addEventListener('click', (e) => {
                e.stopPropagation(); 
                const isExpanded = contactWidget.classList.toggle('widget-expanded');
                contactToggleBtn.setAttribute('aria-expanded', isExpanded);
                contactToggleBtn.setAttribute('aria-label', isExpanded ? 'Close Contact Options' : 'Open Contact Options');
            });
    
            document.addEventListener('click', (event) => {
                if (contactWidget.classList.contains('widget-expanded') && !contactWidget.contains(event.target)) {
                    contactWidget.classList.remove('widget-expanded');
                    contactToggleBtn.setAttribute('aria-expanded', 'false');
                    contactToggleBtn.setAttribute('aria-label', 'Open Contact Options');
                }
            });
    
        } else {
            console.warn("Sticky contact widget elements not found.");
        }

    
    
    }); 

});
