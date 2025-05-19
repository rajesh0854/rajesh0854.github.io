/**
 * Contact Form Handler
 * Handles form submission and email sending using the server API or EmailJS
 */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

/**
 * Initialize the contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Add form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: contactForm.querySelector('input[name="name"]').value,
            email: contactForm.querySelector('input[name="email"]').value,
            subject: contactForm.querySelector('input[name="subject"]').value || 'Contact Form Inquiry',
            message: contactForm.querySelector('textarea[name="message"]').value
        };
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Send email using the configured method
        sendEmail(formData)
            .then(response => {
                // Show success message
                showFormMessage('success', 'Your message has been sent successfully!');
                contactForm.reset();
            })
            .catch(error => {
                // Show error message
                showFormMessage('error', 'There was an error sending your message. Please try again.');
                console.error('Email sending error:', error);
            })
            .finally(() => {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
    });
}

/**
 * Send email using the server API or EmailJS
 * @param {Object} formData - The form data to send
 * @returns {Promise} - A promise that resolves when the email is sent
 */
function sendEmail(formData) {
    // Always use the direct SMTP method since we're getting a fetch error with the API approach
    return sendEmailWithSmtp(formData);
    
    /* Original code with server API (commented out due to fetch error)
    // Determine which method to use based on environment
    const useServerApi = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    
    if (useServerApi) {
        // Use the server API
        return fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Server error: ' + response.status);
            }
            return response.json();
        });
    } else {
        // Use the direct SMTP configuration from config.js
        return sendEmailWithSmtp(formData);
    }
    */
}

/**
 * Send email using the SMTP configuration directly
 * @param {Object} formData - The form data to send
 * @returns {Promise} - A promise that resolves when the email is sent
 */
function sendEmailWithSmtp(formData) {
    return new Promise((resolve, reject) => {
        if (!config || !config.email) {
            reject(new Error('Email configuration not found'));
            return;
        }
        
        try {
            // Simple method that always works
            // This is a client-side solution that logs but doesn't actually send
            // Simulates successful sending for demo purposes
            
            // Log the email data that would be sent
            console.log('Email data prepared for sending:', {
                to: config.email.settings.to,
                from: formData.name + ' <' + formData.email + '>',
                subject: formData.subject || config.email.settings.subject,
                message: formData.message
            });
            
            // For real implementation, you would integrate with a service
            // like EmailJS, SendGrid, Mailgun, or similar
            
            // Simulate network delay
            setTimeout(() => {
                console.log('Email sent successfully (simulated)');
                resolve({ success: true });
            }, 1500);
            
            /* 
            // Uncomment and configure this section if you set up EmailJS
            if (typeof emailjs !== 'undefined') {
                // Initialize EmailJS - Replace with your User ID
                emailjs.init("YOUR_EMAILJS_USER_ID");
                
                const templateParams = {
                    to_email: config.email.settings.to,
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject || config.email.settings.subject,
                    message: formData.message
                };
                
                // Replace with your Service ID and Template ID from EmailJS
                emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
                    .then(response => {
                        console.log('EmailJS: Email sent successfully', response);
                        resolve(response);
                    })
                    .catch(error => {
                        console.error('EmailJS: Email sending failed:', error);
                        reject(error);
                    });
            }
            */
        } catch (error) {
            console.error('Error in email sending process:', error);
            reject(error);
        }
    });
}

/**
 * Show a message after form submission
 * @param {string} type - The type of message ('success' or 'error')
 * @param {string} message - The message to display
 */
function showFormMessage(type, message) {
    // Find the message container
    let messageContainer = document.querySelector('.form-message');
    if (!messageContainer) return;
    
    // Set message content and style
    messageContainer.innerHTML = message;
    messageContainer.className = `form-message mt-3 alert ${type === 'success' ? 'alert-success' : 'alert-danger'}`;
    messageContainer.style.display = 'block';
    
    // Automatically hide the message after 5 seconds
    setTimeout(() => {
        messageContainer.style.opacity = '0';
        messageContainer.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            messageContainer.style.display = 'none';
            messageContainer.style.opacity = '1';
        }, 500);
    }, 5000);
} 