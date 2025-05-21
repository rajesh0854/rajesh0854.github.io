/**
 * Reptile Cursor - An interactive reptile (snake) cursor that follows mouse movement
 */

class ReptileCursor {
    constructor(options = {}) {
        // Default configuration
        this.config = {
            containerId: options.containerId || 'cursor-effects',
            segmentCount: options.segmentCount || 10,
            segmentLength: options.segmentLength || 15,
            segmentWidth: options.segmentWidth || 12,
            headWidth: options.headWidth || 16,
            speed: options.speed || 0.2,
            color: options.color || '#10b981', // Default to accent green color
            headColor: options.headColor || '#059669', // Darker green for head
            tongueColor: options.tongueColor || '#ef4444', // Red tongue
            eyeColor: options.eyeColor || '#ffffff', // White eyes
            pulseEffect: options.pulseEffect !== undefined ? options.pulseEffect : true
        };

        // Container for the reptile
        this.container = document.getElementById(this.config.containerId);
        if (!this.container) {
            console.error(`Container with ID ${this.config.containerId} not found`);
            return;
        }

        // Mouse position
        this.mouseX = 0;
        this.mouseY = 0;

        // Segments array to store positions
        this.segments = [];

        // Initialize
        this.init();
    }

    init() {
        // Create reptile elements
        this.createReptile();
        
        // Set up event listeners
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        // Start animation loop
        this.animate();
        
        console.log('Reptile cursor initialized');
    }

    createReptile() {
        // Create head element
        this.head = document.createElement('div');
        this.head.classList.add('reptile-head');
        this.head.style.width = `${this.config.headWidth}px`;
        this.head.style.height = `${this.config.headWidth}px`;
        this.head.style.backgroundColor = this.config.headColor;
        this.head.style.position = 'fixed';
        this.head.style.borderRadius = '50% 50% 50% 50%';
        this.head.style.transform = 'translate(-50%, -50%)';
        this.head.style.zIndex = '9999';
        this.head.style.pointerEvents = 'none';
        
        // Create eyes
        const leftEye = document.createElement('div');
        leftEye.classList.add('reptile-eye');
        leftEye.style.width = '4px';
        leftEye.style.height = '4px';
        leftEye.style.backgroundColor = this.config.eyeColor;
        leftEye.style.position = 'absolute';
        leftEye.style.borderRadius = '50%';
        leftEye.style.top = '25%';
        leftEye.style.left = '25%';
        
        const rightEye = document.createElement('div');
        rightEye.classList.add('reptile-eye');
        rightEye.style.width = '4px';
        rightEye.style.height = '4px';
        rightEye.style.backgroundColor = this.config.eyeColor;
        rightEye.style.position = 'absolute';
        rightEye.style.borderRadius = '50%';
        rightEye.style.top = '25%';
        rightEye.style.right = '25%';
        
        // Create tongue
        const tongue = document.createElement('div');
        tongue.classList.add('reptile-tongue');
        tongue.style.width = '10px';
        tongue.style.height = '6px';
        tongue.style.backgroundColor = this.config.tongueColor;
        tongue.style.position = 'absolute';
        tongue.style.bottom = '-3px';
        tongue.style.left = '50%';
        tongue.style.transform = 'translateX(-50%)';
        tongue.style.clipPath = 'polygon(0% 0%, 40% 0%, 50% 100%, 60% 0%, 100% 0%, 80% 100%, 20% 100%)';
        
        // Add animation to tongue
        tongue.style.animation = 'reptileTongue 1.5s infinite';
        
        // Add eyes and tongue to head
        this.head.appendChild(leftEye);
        this.head.appendChild(rightEye);
        this.head.appendChild(tongue);
        
        // Add head to container
        this.container.appendChild(this.head);
        
        // Create body segments
        for (let i = 0; i < this.config.segmentCount; i++) {
            const segment = document.createElement('div');
            segment.classList.add('reptile-segment');
            
            // Calculate gradient color for segments (gradually lighter from head to tail)
            const colorFactor = 1 + (i / this.config.segmentCount) * 0.3;
            const r = parseInt(this.config.color.slice(1, 3), 16);
            const g = parseInt(this.config.color.slice(3, 5), 16);
            const b = parseInt(this.config.color.slice(5, 7), 16);
            
            const segmentColor = `rgb(${Math.min(255, Math.floor(r * colorFactor))}, ${Math.min(255, Math.floor(g * colorFactor))}, ${Math.min(255, Math.floor(b * colorFactor))})`;
            
            // Calculate size (gradually smaller from head to tail)
            const sizeFactor = 1 - (i / this.config.segmentCount) * 0.5;
            const segmentWidth = this.config.segmentWidth * sizeFactor;
            
            segment.style.width = `${segmentWidth}px`;
            segment.style.height = `${segmentWidth}px`;
            segment.style.backgroundColor = segmentColor;
            segment.style.position = 'fixed';
            segment.style.borderRadius = '50%';
            segment.style.transform = 'translate(-50%, -50%)';
            segment.style.zIndex = `${9998 - i}`; // Ensure segments stack correctly
            segment.style.pointerEvents = 'none';
            
            if (this.config.pulseEffect) {
                segment.style.animation = `reptilePulse ${1 + i * 0.1}s infinite alternate`;
            }
            
            this.container.appendChild(segment);
            
            // Initialize segment position data
            this.segments.push({
                element: segment,
                x: 0,
                y: 0
            });
        }
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes reptileTongue {
                0%, 100% { transform: translateX(-50%) scaleY(0); }
                50% { transform: translateX(-50%) scaleY(1); }
            }
            
            @keyframes reptilePulse {
                0% { transform: translate(-50%, -50%) scale(0.9); }
                100% { transform: translate(-50%, -50%) scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    animate() {
        // Update head position with easing
        let headX = 0;
        let headY = 0;
        
        // Apply easing to head movement for smooth following
        headX = this.mouseX;
        headY = this.mouseY;
        
        // Update head position
        this.head.style.left = `${headX}px`;
        this.head.style.top = `${headY}px`;
        
        // Calculate angle for head rotation
        if (this.segments.length > 0 && this.segments[0].x !== 0) {
            const dx = headX - this.segments[0].x;
            const dy = headY - this.segments[0].y;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            this.head.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        }
        
        // Update segment positions with trailing effect
        let prevX = headX;
        let prevY = headY;
        
        this.segments.forEach((segment, index) => {
            // Apply easing for smooth following
            segment.x += (prevX - segment.x) * this.config.speed;
            segment.y += (prevY - segment.y) * this.config.speed;
            
            // Update visual position
            segment.element.style.left = `${segment.x}px`;
            segment.element.style.top = `${segment.y}px`;
            
            // This becomes the target for the next segment
            prevX = segment.x;
            prevY = segment.y;
        });
        
        // Continue animation loop
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Create reptile cursor when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment to ensure cursor-effects container is ready
    setTimeout(() => {
        const reptile = new ReptileCursor({
            // Optional custom configuration can be passed here
        });
    }, 100);
}); 