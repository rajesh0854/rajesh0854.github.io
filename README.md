# Deep Mining - Technology Solutions Website

A cutting-edge, modern and visually stunning website for the Deep Mining technology solutions company.

## Features

- Modern, responsive design with sleek animations
- Interactive service cards and technology showcases
- Dark/light mode toggle
- AI-powered cursor effects
- Contact form with email functionality
- Live chat widget

## Email Configuration

The website includes a contact form with email functionality. There are two ways to use it:

### 1. Client-side approach (EmailJS)

For simple deployment without a backend server, this website uses EmailJS service to send emails directly from the frontend code.

To configure EmailJS:

1. Sign up at [EmailJS](https://www.emailjs.com/) and create an account
2. Create an email service and template
3. Update the `js/contact.js` file with your EmailJS credentials:
   - Replace `YOUR_EMAILJS_USER_ID` with your actual user ID
   - Update the `serviceID` and `templateID` with your values

### 2. Server-side approach (Node.js)

For a more secure implementation, the website includes a Node.js server that handles email sending with the SMTP configuration.

To set up the server:

1. Navigate to the `server` directory
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` with your SMTP settings
4. Start the server: `npm start`

The email configuration is stored in `js/config.js` for client-side access and in the server's environment variables for the server-side approach.

## SMTP Configuration

The website is pre-configured with the following SMTP settings:

```javascript
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
```

**Important notes about using Gmail SMTP:**

1. Make sure that "Less secure app access" is enabled in your Google account, or
2. Use an App Password if you have 2-factor authentication enabled
3. The password provided in the configuration is an App Password, not the actual Gmail password

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser to view the website
3. For email functionality, follow the setup instructions above

## Customization

The website appearance and behavior can be customized through the `js/config.js` file:

- Logo sizes
- Color theme
- Animation settings
- Email configuration

## Technologies Used

- HTML5
- CSS3 with custom properties and animations
- JavaScript (ES6+)
- Bootstrap 5 for responsive layout
- GSAP for advanced animations
- Particles.js for background effects
- Font Awesome for icons

## File Structure

```
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── assets/
│   └── images/             # Image assets
│       ├── logo.svg        # Company logo
│       ├── logo-light.svg  # Light version of logo
│       ├── favicon.ico     # Favicon
│       └── tech/           # Technology logos
└── README.md               # Project documentation
```

## Browser Compatibility

The website is optimized for modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Optimized images and SVG graphics
- Minified external libraries
- CSS animations optimized for performance
- JavaScript optimized to avoid layout thrashing
- Lazy loading for off-screen content

## License

This project is created for demonstration purposes.

## Credits

- Fonts: Google Fonts (Poppins, Montserrat)
- Icons: Font Awesome
- Animation libraries: GSAP, Particles.js
- Framework: Bootstrap 5 