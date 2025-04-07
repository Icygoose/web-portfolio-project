# Web Development Portfolio Project

## Overview
This is a personal portfolio website with two main components:
1. A Web Development Best Practices Checker
2. A professional CV/Resume page

The project was developed as part of the CITS5505 Web Development course at the University of Western Australia.

## Features

### Best Practices Checker
- Interactive checklist of web development best practices
- Progress tracking with visual feedback
- Reward system that displays cute animal images when enough items are checked
- Detailed explanations for each best practice
- Persistent state using localStorage

### CV/Resume Page
- Professional presentation of skills, experience, and education
- Interactive skill bars with animations
- Timeline-based experience display
- Responsive design for all device sizes
- Contact form for potential employers or clients
- Social media links

### Shared Features
- Dark/Light theme toggle with persistent preference
- Responsive design that works on mobile, tablet, and desktop
- Modern UI with smooth animations and transitions
- Accessibility considerations (ARIA attributes, semantic HTML)

## Technologies Used
- HTML5
- CSS3 (Custom variables, Flexbox, Grid, Animations)
- JavaScript (ES6+)
- External APIs for animal images:
  - The Cat API
  - Dog CEO API
  - RandomFox API

## Setup and Installation
1. Clone or download the repository
2. No build process or dependencies required - this is a vanilla HTML/CSS/JS project
3. Open `index.html` in a web browser to view the Best Practices Checker
4. Navigate to the CV page using the navigation menu

## Project Structure
```
CITS5505_WEBDEV/
├── README.md                        # Project documentation
└── IndividualProject/
    ├── css/
    │   └── styles.css              # Custom styles for layout and theme
    ├── js/
    │   └── script.js               # JavaScript for interactivity and AJAX features
    ├── image/
    │   └── PHOTO.JPG               # Profile picture used on CV page
    ├── index.html                  # Best Practices Checker page
    ├── cv.html                     # Personal CV page
```

## Usage
- **Best Practices Checker**: Check off the practices you follow in your web development workflow. Receive a cute animal image as a reward when you reach 80% completion.
- **CV Page**: View professional information, skills, and experience. Use the contact form to get in touch.
- **Theme Toggle**: Click the moon/sun icon in the navigation to switch between light and dark themes.

## Future Improvements
- Add more categories of best practices
- Implement form validation and actual form submission
- Add printable version of CV
- Expand project portfolio section
- Add more interactive elements and animations

## References
- GitHub Copilot
- Font Awesome
- MDN Web Docs
- W3C Web Accessibility Initiative
- The Cat API, Dog CEO API, and RandomFox API
- Online learning resources

## License
This project is created for educational purposes as part of university coursework.

## Author
Icy Chen - University of Western Australia
