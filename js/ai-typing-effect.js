/**
 * AI Status Typing Effect
 * Creates a visually appealing typing animation with status indicators
 */

class AITypingEffect {
    constructor(element, options = {}) {
        // The element where the typing effect will appear
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        
        // Default options
        this.options = {
            strings: options.strings || ['AI assistant online', 'Processing data', 'Analyzing information', 'Ready for commands'],
            typeSpeed: options.typeSpeed || 80,
            backSpeed: options.backSpeed || 50,
            backDelay: options.backDelay || 1000,
            startDelay: options.startDelay || 500,
            loop: options.loop !== undefined ? options.loop : true,
            showCursor: options.showCursor !== undefined ? options.showCursor : true,
            cursorChar: options.cursorChar || '|',
            onComplete: options.onComplete || function() {},
            preText: options.preText || 'Status: ',
            statusIndicator: options.statusIndicator !== undefined ? options.statusIndicator : true,
            statusStates: options.statusStates || ['connecting', 'active', 'processing', 'standby'],
            glitchProbability: options.glitchProbability || 0.03,
            smartBackspace: options.smartBackspace !== undefined ? options.smartBackspace : true
        };
        
        // Internal properties
        this.isTyping = false;
        this.currentString = '';
        this.currentIndex = 0;
        this.stringIndex = 0;
        this.cursorElement = null;
        this.statusElement = null;
        
        // Initialize the typing effect
        this.init();
    }
    
    init() {
        // Create wrapper if it doesn't exist
        if (!this.element) {
            console.error('Element not found');
            return;
        }
        
        // Add the AI status typing container class
        this.element.classList.add('ai-status-container');
        
        // Create status indicator if enabled
        if (this.options.statusIndicator) {
            this.statusElement = document.createElement('span');
            this.statusElement.classList.add('ai-status-indicator');
            this.element.appendChild(this.statusElement);
            
            // Set initial status
            this.updateStatus(this.options.statusStates[0]);
        }
        
        // Create pre-text element
        if (this.options.preText) {
            const preTextElement = document.createElement('span');
            preTextElement.classList.add('ai-status-pretext');
            preTextElement.textContent = this.options.preText;
            this.element.appendChild(preTextElement);
        }
        
        // Create typing text element
        this.typingElement = document.createElement('span');
        this.typingElement.classList.add('ai-status-text');
        this.element.appendChild(this.typingElement);
        
        // Create cursor if enabled
        if (this.options.showCursor) {
            this.cursorElement = document.createElement('span');
            this.cursorElement.classList.add('ai-status-cursor');
            this.cursorElement.innerHTML = this.options.cursorChar;
            this.element.appendChild(this.cursorElement);
            
            // Add animation to cursor
            this.cursorElement.classList.add('blink');
        }
        
        // Start typing
        setTimeout(() => this.startTyping(), this.options.startDelay);
    }
    
    startTyping() {
        this.isTyping = true;
        this.currentString = this.options.strings[this.stringIndex];
        this.currentIndex = 0;
        
        if (this.options.statusIndicator) {
            this.updateStatus(this.options.statusStates[1]); // Set to 'active' status
        }
        
        this.typeNextChar();
    }
    
    typeNextChar() {
        if (!this.isTyping) return;
        
        // If we're done with the current string
        if (this.currentIndex >= this.currentString.length) {
            if (this.options.statusIndicator) {
                this.updateStatus(this.options.statusStates[3]); // Set to 'standby' status
            }
            
            // Wait before deleting
            setTimeout(() => this.startDeleting(), this.options.backDelay);
            return;
        }
        
        // Random glitch effect
        if (Math.random() < this.options.glitchProbability) {
            // Brief glitch
            this.typingElement.innerHTML = this.currentString.substring(0, this.currentIndex) + this.getRandomChar();
            
            // After a brief delay, correct it
            setTimeout(() => {
                if (this.isTyping) {
                    this.typingElement.innerHTML = this.currentString.substring(0, this.currentIndex);
                    this.typeNextChar();
                }
            }, 50);
            return;
        }
        
        // Type the next character
        this.typingElement.innerHTML = this.currentString.substring(0, this.currentIndex + 1);
        this.currentIndex++;
        
        // Schedule the next character
        const delay = this.options.typeSpeed + Math.random() * 50; // Add slight randomness
        setTimeout(() => this.typeNextChar(), delay);
    }
    
    startDeleting() {
        if (!this.isTyping) return;
        
        if (this.options.statusIndicator) {
            this.updateStatus(this.options.statusStates[2]); // Set to 'processing' status
        }
        
        this.deleteNextChar();
    }
    
    deleteNextChar() {
        if (!this.isTyping) return;
        
        // If all characters are deleted
        if (this.currentIndex <= 0) {
            // Move to the next string in the array
            this.stringIndex = (this.stringIndex + 1) % this.options.strings.length;
            
            // If we've gone through all strings and we're not looping, stop
            if (this.stringIndex === 0 && !this.options.loop) {
                this.isTyping = false;
                this.options.onComplete();
                return;
            }
            
            // Otherwise, start typing the next string
            setTimeout(() => this.startTyping(), 500);
            return;
        }
        
        // Smart backspace: if the next string starts with what we've already typed, don't delete it
        if (this.options.smartBackspace) {
            const nextString = this.options.strings[
                (this.stringIndex + 1) % this.options.strings.length
            ];
            
            const currentTyped = this.currentString.substring(0, this.currentIndex);
            if (nextString.startsWith(currentTyped)) {
                this.stringIndex = (this.stringIndex + 1) % this.options.strings.length;
                this.currentString = nextString;
                setTimeout(() => this.typeNextChar(), 500);
                return;
            }
        }
        
        // Delete one character
        this.currentIndex--;
        this.typingElement.innerHTML = this.currentString.substring(0, this.currentIndex);
        
        // Schedule the next deletion
        const delay = this.options.backSpeed;
        setTimeout(() => this.deleteNextChar(), delay);
    }
    
    updateStatus(status) {
        if (!this.statusElement) return;
        
        // Remove all existing status classes
        this.options.statusStates.forEach(state => {
            this.statusElement.classList.remove(`status-${state}`);
        });
        
        // Add the new status class
        this.statusElement.classList.add(`status-${status}`);
    }
    
    getRandomChar() {
        const chars = '!@#$%^&*()_-+={}[]|;:,./<>?';
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    stop() {
        this.isTyping = false;
    }
    
    start() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.startTyping();
        }
    }
    
    reset() {
        this.stop();
        this.typingElement.innerHTML = '';
        this.stringIndex = 0;
        this.start();
    }
    
    // Method to add new strings to the typing effect
    addStrings(strings) {
        if (Array.isArray(strings)) {
            this.options.strings = [...this.options.strings, ...strings];
        } else if (typeof strings === 'string') {
            this.options.strings.push(strings);
        }
    }
}

// Initialize on document load
document.addEventListener('DOMContentLoaded', function() {
    // Check if the AI status element exists
    const aiStatusElement = document.getElementById('ai-status');
    if (aiStatusElement) {
        window.aiTypingEffect = new AITypingEffect('#ai-status', {
            strings: [
                'AI systems online',
                'Neural networks activated',
                'Processing data streams',
                'Analyzing metrics',
                'Ready for assistance',
                'Quantum algorithms engaged',
                'Security protocols active'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            startDelay: 1000
        });
    }
}); 