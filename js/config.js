/**
 * Deep Mining Website Configuration
 * Update these settings to customize website appearance
 */

const config = {
    // Logo settings
    logo: {
        headerSize: 90,    // Height in pixels for the header logo
        footerSize: 80,    // Height in pixels for the footer logo
    },
    
    // Color theme (used by style.css)
    colors: {
        primary: '#2563eb',
        secondary: '#8b5cf6',
        accent: '#10b981',
    },
    
    // Animation settings
    animations: {
        enabled: true,
        cursorEffects: true,
        particlesEnabled: true,
    },
    
    // Email Configuration
    email: {
        // SMTP Configuration
        smtp: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'rajesh.shvrm@gmail.com',
                pass: 'ttnm ahrp wtmy chxl'
            }
        },
        
        // Email Settings
        settings: {
            from: 'rajesh.shvrm@gmail.com',
            to: 'rajesh.shvrm@gmail.com',
            subject: 'New Contact Form Submission'
        }
    }
}; 