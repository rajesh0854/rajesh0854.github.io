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
    }
    
    // Disable animations if specified in config
    if (config.animations && !config.animations.enabled) {
        document.body.classList.add('no-animations');
    }
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
 * AI-powered cursor effects
 */
function initCursorEffects() {
    const cursorEffects = document.getElementById('cursor-effects');
    if (!cursorEffects) return;
    
    console.log('Initializing cursor effects');
    
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    
    cursorEffects.appendChild(cursor);
    cursorEffects.appendChild(cursorDot);
    
    // Cursor position variables
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;
    
    // Track cursor position
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        // Create particle trail effect (reduced frequency for better performance)
        if (Math.random() > 0.95) {
            createTrailParticle(e.clientX, e.clientY);
        }
    });
    
    // Animate cursors with smooth movement
    function animateCursors() {
        // Smooth follow for dot
        const dotSpeed = 0.3;
        dotX += (cursorX - dotX) * dotSpeed;
        dotY += (cursorY - dotY) * dotSpeed;
        
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        // Main cursor follows exact position
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursors);
    }
    
    // Create a trail particle
    function createTrailParticle(x, y) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        
        // Random size for variety
        const size = Math.random() * 5 + 3;
        trail.style.width = `${size}px`;
        trail.style.height = `${size}px`;
        
        // Random color from our palette
        const colors = [
            'rgba(37, 99, 235, 0.6)',   // Primary blue
            'rgba(139, 92, 246, 0.6)',  // Secondary purple
            'rgba(16, 185, 129, 0.6)'   // Accent green
        ];
        trail.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        cursorEffects.appendChild(trail);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (trail && trail.parentNode) {
                cursorEffects.removeChild(trail);
            }
        }, 500);
    }
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .nav-link, .service-card, .tech-logo, .usp-card, input, textarea, .btn'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
            cursor.style.mixBlendMode = 'normal';
            
            // Add scale effect to dot
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '30px';
            cursor.style.height = '30px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.mixBlendMode = 'difference';
            
            // Reset dot scale
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Start the animation loop
    animateCursors();
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
    
    // Create more visually appealing 3D floating elements
    const elements = [
        { icon: 'fa-code', color: '#2563eb', size: 60, delay: 0, duration: 6 },
        { icon: 'fa-mobile-alt', color: '#8b5cf6', size: 50, delay: 0.7, duration: 8 },
        { icon: 'fa-database', color: '#10b981', size: 45, delay: 1.4, duration: 7 },
        { icon: 'fa-robot', color: '#f59e0b', size: 55, delay: 2.1, duration: 9 },
        { icon: 'fa-brain', color: '#ef4444', size: 48, delay: 2.8, duration: 7.5 },
        { icon: 'fa-microchip', color: '#3b82f6', size: 42, delay: 3.5, duration: 6.5 },
        { icon: 'fa-cogs', color: '#6366f1', size: 52, delay: 4.2, duration: 8.5 }
    ];
    
    elements.forEach((element, index) => {
        const floatingEl = document.createElement('div');
        
        // Position randomly but ensure they're distributed around the container
        const angle = (index / elements.length) * Math.PI * 2;
        const radius = Math.min(heroAnimation.offsetWidth, heroAnimation.offsetHeight) * 0.35;
        const centerX = heroAnimation.offsetWidth / 2;
        const centerY = heroAnimation.offsetHeight / 2;
        
        const posX = centerX + radius * Math.cos(angle);
        const posY = centerY + radius * Math.sin(angle);
        
        // Add some randomness to the exact positions
        const randomOffset = Math.random() * 50 - 25;
        
        floatingEl.style.position = 'absolute';
        floatingEl.style.width = `${element.size}px`;
        floatingEl.style.height = `${element.size}px`;
        floatingEl.style.borderRadius = '50%';
        floatingEl.style.backgroundColor = element.color;
        floatingEl.style.color = 'white';
        floatingEl.style.display = 'flex';
        floatingEl.style.alignItems = 'center';
        floatingEl.style.justifyContent = 'center';
        floatingEl.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
        floatingEl.style.left = `${posX + randomOffset}px`;
        floatingEl.style.top = `${posY + randomOffset}px`;
        
        // Create more sophisticated animation with keyframes
        const keyframes = `
            @keyframes float-${index} {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 10}deg);
                }
                50% {
                    transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 10}deg);
                }
                75% {
                    transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 10}deg);
                }
                100% {
                    transform: translate(0, 0) rotate(0deg);
                }
            }
        `;
        
        // Add the keyframes to the document
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        floatingEl.style.animation = `float-${index} ${element.duration}s ease-in-out ${element.delay}s infinite`;
        
        floatingEl.innerHTML = `<i class="fas ${element.icon}" style="font-size: ${element.size / 2.2}px"></i>`;
        
        // Add subtle pulse effect on hover
        floatingEl.addEventListener('mouseenter', () => {
            floatingEl.style.transform = 'scale(1.1)';
            floatingEl.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
            floatingEl.style.zIndex = '10';
            floatingEl.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        floatingEl.addEventListener('mouseleave', () => {
            floatingEl.style.transform = 'scale(1)';
            floatingEl.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            floatingEl.style.zIndex = '1';
        });
        
        heroAnimation.appendChild(floatingEl);
    });
    
    // Add connecting lines using canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    heroAnimation.appendChild(canvas);
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = heroAnimation.offsetWidth;
        canvas.height = heroAnimation.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animate connecting lines
    const ctx = canvas.getContext('2d');
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw lines between elements
        const floatingElements = heroAnimation.querySelectorAll('div');
        
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.15)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < floatingElements.length; i++) {
            const el1 = floatingElements[i];
            const x1 = el1.offsetLeft + el1.offsetWidth / 2;
            const y1 = el1.offsetTop + el1.offsetHeight / 2;
            
            for (let j = i + 1; j < floatingElements.length; j++) {
                const el2 = floatingElements[j];
                const x2 = el2.offsetLeft + el2.offsetWidth / 2;
                const y2 = el2.offsetTop + el2.offsetHeight / 2;
                
                // Calculate distance
                const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                
                // Only draw lines if elements are close enough with dynamic max distance
                const maxDistance = Math.min(canvas.width, canvas.height) * 0.4;
                
                if (distance < maxDistance) {
                    // Adjust opacity based on distance
                    const opacity = 0.2 * (1 - distance / maxDistance);
                    ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
                    
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Add subtle background particles
    const particlesCanvas = document.createElement('canvas');
    particlesCanvas.style.position = 'absolute';
    particlesCanvas.style.top = '0';
    particlesCanvas.style.left = '0';
    particlesCanvas.style.width = '100%';
    particlesCanvas.style.height = '100%';
    particlesCanvas.style.zIndex = '-1';
    heroAnimation.appendChild(particlesCanvas);
    
    // Resize particles canvas
    function resizeParticlesCanvas() {
        particlesCanvas.width = heroAnimation.offsetWidth;
        particlesCanvas.height = heroAnimation.offsetHeight;
    }
    
    resizeParticlesCanvas();
    window.addEventListener('resize', resizeParticlesCanvas);
    
    // Initialize background particles
    const particlesCtx = particlesCanvas.getContext('2d');
    const particles = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * particlesCanvas.width,
            y: Math.random() * particlesCanvas.height,
            radius: Math.random() * 3 + 1,
            color: `rgba(${Math.floor(Math.random() * 100 + 150)}, ${Math.floor(Math.random() * 100 + 150)}, ${Math.floor(Math.random() * 100 + 150)}, 0.2)`,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
        });
    }
    
    // Animate particles
    function animateParticles() {
        particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        
        particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > particlesCanvas.width) {
                particle.speedX *= -1;
            }
            
            if (particle.y < 0 || particle.y > particlesCanvas.height) {
                particle.speedY *= -1;
            }
            
            // Draw particle
            particlesCtx.beginPath();
            particlesCtx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            particlesCtx.fillStyle = particle.color;
            particlesCtx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
} 