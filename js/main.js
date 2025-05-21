/**
 * Deep Mining Website JavaScript
 * Handles animations, interactive elements, and AI cursor effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Apply configuration settings
    applyConfigSettings();
    
    // Initialize all components
    initStickyHeader();
    initParticles();
    initSkillBars();
    initScrollAnimations();
    initCursorEffects();
    initBackToTop();
    initChatWidget();
    initDarkMode();
    initTechLogos();
    initHeroAnimation();
    
    // Initialize AI status animation if not handled by ai-typing-effect.js
    initAIStatusAnimation();
});

/**
 * Apply settings from config.js
 */
function applyConfigSettings() {
    // Check if config exists
    if (typeof config === 'undefined') {
        console.error('Configuration not loaded');
        return;
    }
    
    // Apply logo sizes
    if (config.logo) {
        document.documentElement.style.setProperty('--logo-header-size', `${config.logo.headerSize}px`);
        document.documentElement.style.setProperty('--logo-footer-size', `${config.logo.footerSize}px`);
    }
    
    // Apply color theme if needed
    if (config.colors) {
        document.documentElement.style.setProperty('--primary-color', config.colors.primary);
        document.documentElement.style.setProperty('--secondary-color', config.colors.secondary);
        document.documentElement.style.setProperty('--accent-color', config.colors.accent);
        
        // Update RGB variables from hex colors
        const primaryRgb = hexToRgb(config.colors.primary);
        const secondaryRgb = hexToRgb(config.colors.secondary);
        const accentRgb = hexToRgb(config.colors.accent);
        
        if (primaryRgb) {
            document.documentElement.style.setProperty('--primary-color-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
        }
        if (secondaryRgb) {
            document.documentElement.style.setProperty('--secondary-color-rgb', `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`);
        }
        if (accentRgb) {
            document.documentElement.style.setProperty('--accent-color-rgb', `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`);
        }
    }
    
    // Disable animations if specified in config
    if (config.animations && !config.animations.enabled) {
        document.body.classList.add('no-animations');
    }
}

/**
 * Helper function to convert hex to RGB
 */
function hexToRgb(hex) {
    // Remove the # if present
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    return { r, g, b };
}

/**
 * Header becomes sticky on scroll
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Add active class to nav item based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Initialize particle.js for hero section background
 */
function initParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;
    
    heroParticles.id = 'hero-particles'; // Ensure the element has an ID for particlesJS
    
    // Check if particlesJS is loaded
    if (typeof particlesJS !== 'undefined') {
        console.log('Initializing particles');
        particlesJS('hero-particles', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#2563eb'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.2,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#8b5cf6',
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.3
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    } else {
        console.error('particlesJS library not loaded');
    }
}

/**
 * Animate skill bars on scroll
 */
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const width = target.getAttribute('data-width');
                target.style.width = width;
                observer.unobserve(target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    skillFills.forEach(skill => {
        observer.observe(skill);
    });
}

/**
 * GSAP ScrollTrigger animations
 */
function initScrollAnimations() {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap === 'undefined') {
        console.error('GSAP not loaded');
        return;
    }
    
    if (typeof ScrollTrigger === 'undefined') {
        console.error('ScrollTrigger not loaded');
        return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    console.log('Initializing scroll animations');
    
    // Hero section animation
    gsap.from('.hero-text h1', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-text h2, .hero-text p', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-text .btn', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    // Service Cards Animation
    const serviceCards = gsap.utils.toArray('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach((card, i) => {
            gsap.fromTo(card, 
                { y: 50, opacity: 0 }, 
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    delay: i * 0.1
                }
            );
        });
    }
    
    // USP Cards Animation
    const uspCards = gsap.utils.toArray('.usp-card');
    if (uspCards.length > 0) {
        uspCards.forEach((card, i) => {
            gsap.fromTo(card, 
                { y: 30, opacity: 0 }, 
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    delay: i * 0.15
                }
            );
        });
    }
    
    // Section Headers Animation
    const sectionHeaders = gsap.utils.toArray('.section-header');
    if (sectionHeaders.length > 0) {
        sectionHeaders.forEach(header => {
            gsap.fromTo(header, 
                { y: 30, opacity: 0 }, 
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });
    }
}

/**
 * AI-powered cursor effects and reptile cursor
 */
function initCursorEffects() {
    const cursorEffects = document.getElementById('cursor-effects');
    if (!cursorEffects) return;
    
    console.log('Initializing cursor effects');
    
    // We now use the reptile-cursor.js for the main cursor effect
    // This container will be used by that script
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .nav-link, .service-card, .tech-logo, .usp-card, input, textarea, .btn'
    );
    
    // We'll still set up event listeners for interactive elements
    // The reptile cursor will be affected by the CSS classes we add
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Add a class that our reptile cursor can detect
            document.body.classList.add('hovering-interactive');
        });
        
        el.addEventListener('mouseleave', () => {
            // Remove the class when not hovering
            document.body.classList.remove('hovering-interactive');
        });
    });
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    const showAfter = 300;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > showAfter) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Chat widget functionality
 */
function initChatWidget() {
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.getElementById('chat-container');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input-field');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    // Toggle chat
    chatButton.addEventListener('click', () => {
        chatContainer.style.display = chatContainer.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close chat
    chatClose.addEventListener('click', () => {
        chatContainer.style.display = 'none';
    });
    
    // Send message
    function sendMessage() {
        if (chatInput.value.trim() !== '') {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.classList.add('message', 'user');
            userMessage.innerHTML = `<p>${chatInput.value}</p>`;
            chatMessages.appendChild(userMessage);
            
            // Clear input
            const userText = chatInput.value;
            chatInput.value = '';
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate AI response
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.classList.add('message', 'bot');
                
                // Simple AI responses based on keywords
                let response = "Thank you for your message. Our team will get back to you shortly.";
                
                if (userText.toLowerCase().includes('help')) {
                    response = "I'd be happy to help! Please let me know what specific service you're interested in.";
                } else if (userText.toLowerCase().includes('price') || userText.toLowerCase().includes('cost')) {
                    response = "Our pricing depends on the specific requirements of your project. Would you like to schedule a consultation to discuss your needs?";
                } else if (userText.toLowerCase().includes('contact')) {
                    response = "You can reach us at info@deepmining.tech or call us at +1 (555) 123-4567.";
                }
                
                botMessage.innerHTML = `<p>${response}</p>`;
                chatMessages.appendChild(botMessage);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 800);
        }
    }
    
    chatSend.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

/**
 * Dark/Light mode toggle
 */
function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return; // Exit if element doesn't exist
    
    const themeIcon = themeToggle.querySelector('i');
    
    if (!themeIcon) return; // Exit if icon doesn't exist
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });
}

/**
 * Populate technology logos
 */
function initTechLogos() {
    const techGrid = document.querySelector('.tech-grid');
    if (!techGrid) return;
    
    console.log('Initializing technology logos');
    
    // Clear existing content
    techGrid.innerHTML = '';
    
    // Technology stack with Font Awesome icons instead of SVG files
    const techLogos = [
        { name: 'HTML5', icon: 'fab fa-html5', color: '#E34F26' },
        { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572B6' },
        { name: 'JavaScript', icon: 'fab fa-js', color: '#F7DF1E' },
        { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
        { name: 'Vue.js', icon: 'fab fa-vuejs', color: '#4FC08D' },
        { name: 'Angular', icon: 'fab fa-angular', color: '#DD0031' },
        { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
        { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
        { name: 'PHP', icon: 'fab fa-php', color: '#777BB4' },
        { name: 'Java', icon: 'fab fa-java', color: '#007396' },
        { name: 'WordPress', icon: 'fab fa-wordpress', color: '#21759B' },
        { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
        { name: 'AWS', icon: 'fab fa-aws', color: '#232F3E' },
        { name: 'Docker', icon: 'fab fa-docker', color: '#2496ED' },
        { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952B3' },
        { name: 'Sass', icon: 'fab fa-sass', color: '#CC6699' }
    ];
    
    // Populate tech logos
    techLogos.forEach(tech => {
        const techLogo = document.createElement('div');
        techLogo.classList.add('tech-logo');
        techLogo.innerHTML = `
            <div class="tech-icon" style="color: ${tech.color}">
                <i class="${tech.icon}"></i>
            </div>
            <span class="tech-name">${tech.name}</span>
        `;
        
        // Add hover animation effect
        techLogo.addEventListener('mouseenter', () => {
            const icon = techLogo.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        techLogo.addEventListener('mouseleave', () => {
            const icon = techLogo.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
        
        techGrid.appendChild(techLogo);
    });
}

/**
 * Hero section animation
 */
function initHeroAnimation() {
    const heroAnimation = document.querySelector('.hero-animation');
    if (!heroAnimation) return;
    
    console.log('Initializing hero animation');
    
    // Clear any existing content
    heroAnimation.innerHTML = '';
    
    // Create more visually appealing 3D floating elements with circular rotation
    // Added more AI-related icons for a complete circle
    const elements = [
        { icon: 'fa-code', color: '#2563eb', size: 56, duration: 20, orbitRadius: 150, orbitOffset: 0 },
        { icon: 'fa-mobile-alt', color: '#8b5cf6', size: 50, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 0.125 },
        { icon: 'fa-database', color: '#10b981', size: 46, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 0.25 },
        { icon: 'fa-robot', color: '#f59e0b', size: 52, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 0.375 },
        { icon: 'fa-brain', color: '#ef4444', size: 48, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 0.5 },
        { icon: 'fa-microchip', color: '#3b82f6', size: 44, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 0.625 },
        { icon: 'fa-network-wired', color: '#14b8a6', size: 48, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 0.75 },
        { icon: 'fa-chart-network', color: '#8b5cf6', size: 50, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 0.875 },
        { icon: 'fa-server', color: '#f97316', size: 46, duration: 20, orbitRadius: 150, orbitOffset: Math.PI },
        { icon: 'fa-cloud', color: '#06b6d4', size: 52, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 1.125 },
        { icon: 'fa-cogs', color: '#6366f1', size: 54, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 1.25 },
        { icon: 'fa-laptop-code', color: '#8b5cf6', size: 50, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 1.375 },
        { icon: 'fa-project-diagram', color: '#10b981', size: 48, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 1.5 },
        { icon: 'fa-sitemap', color: '#ec4899', size: 46, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 1.625 },
        { icon: 'fa-code-branch', color: '#f59e0b', size: 44, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 1.75 },
        { icon: 'fa-atom', color: '#2563eb', size: 52, duration: 20, orbitRadius: 150, orbitOffset: Math.PI * 1.875 }
    ];
    
    // Create orbit container
    const orbitContainer = document.createElement('div');
    orbitContainer.style.position = 'absolute';
    orbitContainer.style.top = '50%';
    orbitContainer.style.left = '50%';
    orbitContainer.style.transform = 'translate(-50%, -50%)';
    orbitContainer.style.width = '100%';
    orbitContainer.style.height = '100%';
    heroAnimation.appendChild(orbitContainer);
    
    // Animation timestamp for orbital calculations
    let startTime = Date.now();
    
    elements.forEach((element, index) => {
        const floatingEl = document.createElement('div');
        
        // Apply base styles for the orbital elements
        floatingEl.style.position = 'absolute';
        floatingEl.style.width = `${element.size}px`;
        floatingEl.style.height = `${element.size}px`;
        floatingEl.style.borderRadius = '50%';
        floatingEl.style.backgroundColor = element.color;
        floatingEl.style.color = 'white';
        floatingEl.style.display = 'flex';
        floatingEl.style.alignItems = 'center';
        floatingEl.style.justifyContent = 'center';
        floatingEl.style.boxShadow = `0 10px 30px rgba(0,0,0,0.15), 0 0 15px ${element.color}40`;
        floatingEl.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
        
        // Add icon
        floatingEl.innerHTML = `<i class="fas ${element.icon}" style="font-size: ${element.size / 2.2}px; filter: drop-shadow(0 0 5px rgba(255,255,255,0.8));"></i>`;
        
        // Subtle pulse effect with CSS animation
        const keyframes = `
            @keyframes pulse-orbit-${index} {
                0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
                50% { transform: translate(-50%, -50%) scale(1.1) rotate(180deg); }
            }
        `;
        
        // Add the keyframes to the document
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        // Apply the pulse animation
        floatingEl.style.animation = `pulse-orbit-${index} 5s ease-in-out infinite`;
        
        // Add hover effect
        floatingEl.addEventListener('mouseenter', () => {
            floatingEl.style.transform = 'translate(-50%, -50%) scale(1.2)';
            floatingEl.style.boxShadow = `0 15px 40px rgba(0,0,0,0.25), 0 0 20px ${element.color}80`;
            floatingEl.style.zIndex = '10';
        });
        
        floatingEl.addEventListener('mouseleave', () => {
            floatingEl.style.transform = 'translate(-50%, -50%) scale(1)';
            floatingEl.style.boxShadow = `0 10px 30px rgba(0,0,0,0.15), 0 0 15px ${element.color}40`;
            floatingEl.style.zIndex = '1';
        });
        
        orbitContainer.appendChild(floatingEl);
        
        // Add element to animation frame update
        element.domElement = floatingEl;
    });
    
    // Create AI control system at the center
    const aiControlCenter = document.createElement('div');
    aiControlCenter.style.position = 'absolute';
    aiControlCenter.style.width = '80px';
    aiControlCenter.style.height = '80px';
    aiControlCenter.style.borderRadius = '50%';
    aiControlCenter.style.background = 'radial-gradient(circle, rgba(37,99,235,1) 0%, rgba(139,92,246,1) 100%)';
    aiControlCenter.style.boxShadow = '0 0 30px rgba(37,99,235,0.7), 0 0 50px rgba(139,92,246,0.5)';
    aiControlCenter.style.top = '50%';
    aiControlCenter.style.left = '50%';
    aiControlCenter.style.transform = 'translate(-50%, -50%)';
    aiControlCenter.style.display = 'flex';
    aiControlCenter.style.alignItems = 'center';
    aiControlCenter.style.justifyContent = 'center';
    aiControlCenter.style.zIndex = '5';
    
    // Add brain icon to center
    const centerIcon = document.createElement('i');
    centerIcon.className = 'fas fa-brain';
    centerIcon.style.fontSize = '32px';
    centerIcon.style.color = 'white';
    centerIcon.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.8))';
    centerIcon.style.animation = 'pulseCenter 2s ease-in-out infinite';
    aiControlCenter.appendChild(centerIcon);
    
    // Add rotating circles around the AI control center
    for (let i = 0; i < 3; i++) {
        const rotatingRing = document.createElement('div');
        rotatingRing.style.position = 'absolute';
        rotatingRing.style.top = '50%';
        rotatingRing.style.left = '50%';
        rotatingRing.style.width = `${100 + i * 20}px`;
        rotatingRing.style.height = `${100 + i * 20}px`;
        rotatingRing.style.borderRadius = '50%';
        rotatingRing.style.border = `1px solid rgba(255, 255, 255, ${0.3 - i * 0.08})`;
        rotatingRing.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        rotatingRing.style.animation = `rotate-ring-${i} ${8 + i * 2}s linear infinite`;
        rotatingRing.style.pointerEvents = 'none';
        
        // Add keyframes for this ring
        const ringKeyframes = document.createElement('style');
        ringKeyframes.textContent = `
            @keyframes rotate-ring-${i} {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(${i % 2 === 0 ? '' : '-'}360deg); }
            }
        `;
        document.head.appendChild(ringKeyframes);
        
        aiControlCenter.appendChild(rotatingRing);
    }
    
    // Add scan effect
    const scanEffect = document.createElement('div');
    scanEffect.style.position = 'absolute';
    scanEffect.style.top = '50%';
    scanEffect.style.left = '50%';
    scanEffect.style.width = '130%';
    scanEffect.style.height = '130%';
    scanEffect.style.borderRadius = '50%';
    scanEffect.style.background = 'radial-gradient(circle, rgba(37,99,235,0.1) 0%, rgba(37,99,235,0) 70%)';
    scanEffect.style.transform = 'translate(-50%, -50%) scale(0.8)';
    scanEffect.style.animation = 'scanEffect 3s ease-in-out infinite';
    scanEffect.style.pointerEvents = 'none';
    scanEffect.style.zIndex = '2';
    
    // Add keyframes for scan effect
    const scanKeyframes = document.createElement('style');
    scanKeyframes.textContent = `
        @keyframes scanEffect {
            0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
        }
        
        @keyframes pulseCenter {
            0%, 100% { transform: scale(1); opacity: 0.95; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
    `;
    document.head.appendChild(scanKeyframes);
    
    aiControlCenter.appendChild(scanEffect);
    orbitContainer.appendChild(aiControlCenter);
    
    // Create data flow animations from center to icons
    elements.forEach((element, index) => {
        const dataFlow = document.createElement('div');
        dataFlow.style.position = 'absolute';
        dataFlow.style.top = '50%';
        dataFlow.style.left = '50%';
        dataFlow.style.width = '2px';
        dataFlow.style.height = `${element.orbitRadius}px`;
        dataFlow.style.transformOrigin = 'bottom center';
        dataFlow.style.transform = `translate(-50%, -100%) rotate(${index * (360 / elements.length)}deg)`;
        dataFlow.style.zIndex = '1';
        dataFlow.style.pointerEvents = 'none';
        
        // Create data point that travels along the path
        const dataPoint = document.createElement('div');
        dataPoint.style.position = 'absolute';
        dataPoint.style.bottom = '0';
        dataPoint.style.left = '50%';
        dataPoint.style.width = '4px';
        dataPoint.style.height = '4px';
        dataPoint.style.borderRadius = '50%';
        dataPoint.style.backgroundColor = element.color;
        dataPoint.style.transform = 'translate(-50%, -50%)';
        dataPoint.style.boxShadow = `0 0 5px ${element.color}`;
        dataPoint.style.animation = `dataTravel-${index} ${3 + Math.random() * 2}s infinite`;
        dataPoint.style.animationDelay = `${index * 0.3}s`;
        
        // Create keyframes for data point travel
        const dataKeyframes = document.createElement('style');
        dataKeyframes.textContent = `
            @keyframes dataTravel-${index} {
                0% { bottom: 0; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { bottom: 100%; opacity: 0; }
            }
        `;
        document.head.appendChild(dataKeyframes);
        
        dataFlow.appendChild(dataPoint);
        orbitContainer.appendChild(dataFlow);
    });
    
    // Create orbital animation
    function animateOrbits() {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000; // Convert to seconds
        
        elements.forEach(element => {
            // Calculate position on the orbit
            const angle = (elapsed / element.duration) * Math.PI * 2 + element.orbitOffset;
            const x = Math.cos(angle) * element.orbitRadius;
            const y = Math.sin(angle) * element.orbitRadius;
            
            // Position the element
            element.domElement.style.left = `calc(50% + ${x}px)`;
            element.domElement.style.top = `calc(50% + ${y}px)`;
        });
        
        // Continue animation loop
        requestAnimationFrame(animateOrbits);
    }
    
    // Start animation
    animateOrbits();
    
    // Add connecting lines using canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    orbitContainer.appendChild(canvas);
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = heroAnimation.offsetWidth;
        canvas.height = heroAnimation.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animate connecting lines
    function animateConnections() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate center point of the canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Draw lines between elements
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.15)';
        ctx.lineWidth = 1;
        
        // Draw circular orbital path
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.1)';
        ctx.arc(centerX, centerY, elements[0].orbitRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw connecting lines between adjacent elements
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const el1Rect = element.domElement.getBoundingClientRect();
            const x1 = el1Rect.left + el1Rect.width / 2 - orbitContainer.getBoundingClientRect().left;
            const y1 = el1Rect.top + el1Rect.height / 2 - orbitContainer.getBoundingClientRect().top;
            
            // Connect to next element (circular)
            const nextIdx = (i + 1) % elements.length;
            const nextElement = elements[nextIdx];
            const el2Rect = nextElement.domElement.getBoundingClientRect();
            const x2 = el2Rect.left + el2Rect.width / 2 - orbitContainer.getBoundingClientRect().left;
            const y2 = el2Rect.top + el2Rect.height / 2 - orbitContainer.getBoundingClientRect().top;
            
            // Draw line with gradient
            const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, element.color + '40');
            gradient.addColorStop(1, nextElement.color + '40');
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            
            // Connect to center with fading line
            const gradientToCenter = ctx.createLinearGradient(x1, y1, centerX, centerY);
            gradientToCenter.addColorStop(0, element.color + '40');
            gradientToCenter.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
            
            ctx.beginPath();
            ctx.strokeStyle = gradientToCenter;
            ctx.moveTo(x1, y1);
            ctx.lineTo(centerX, centerY);
            ctx.stroke();
        }
        
        requestAnimationFrame(animateConnections);
    }
    
    animateConnections();
}

/**
 * Initialize AI status animation integration
 */
function initAIStatusAnimation() {
    // Check if the AI status typing effect is already instantiated
    if (typeof window.aiTypingEffect === 'undefined') {
        // Create data stream animations
        createDataStreamLines();
        
        // Add interaction effects
        const aiStatusContainer = document.querySelector('.hero-ai-status');
        if (aiStatusContainer) {
            // Add hover effects with GSAP if available
            if (typeof gsap !== 'undefined') {
                aiStatusContainer.addEventListener('mouseenter', () => {
                    gsap.to(aiStatusContainer, {
                        scale: 1.02,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
                
                aiStatusContainer.addEventListener('mouseleave', () => {
                    gsap.to(aiStatusContainer, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            }
        }
    }
}

/**
 * Create dynamic data stream lines
 */
function createDataStreamLines() {
    const dataStream = document.querySelector('.ai-status-data-stream');
    if (!dataStream) return;
    
    // Clear existing lines
    dataStream.innerHTML = '';
    
    // Create random data lines
    const lineCount = 8;
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.classList.add('data-line');
        
        // Randomize position and animation delay
        line.style.top = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 2}s`;
        line.style.width = `${50 + Math.random() * 50}%`;
        
        dataStream.appendChild(line);
    }
} 