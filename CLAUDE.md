# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal portfolio website for Heri Rahmansyah, showcasing skills as an AI Engineer, Data Analyst, and Web Developer. The site features sections for Home, About, Portfolio, Certificates, Skills, and Contact, with interactive elements including dark mode toggle, modal popups for certificates and project previews, and scroll animations.

## Technology Stack
- HTML5
- CSS3 (with custom animations and dark mode support)
- Vanilla JavaScript (DOM manipulation, IntersectionObserver for animations, localStorage for theme persistence)
- Google Fonts (Roboto)
- Font Awesome 6.5.1 for icons

## Common Development Commands

### Development Workflow
This is a static website, so development involves editing HTML, CSS, and JS files directly:
- Edit files in the `herirahmansyah.github.io-main/` directory
- Changes are visible immediately when opening `index.html` in a browser
- No build step or dependencies required

### Testing
- Manual testing in web browser (Chrome, Firefox, Safari, Edge recommended)
- Test responsive design across mobile, tablet, and desktop viewports
- Verify dark mode functionality and persistence via localStorage
- Check all modal functionality (certificates, project previews)
- Validate all external links and social media integration

### Debugging
- Use browser developer tools for inspecting elements, checking console logs, and debugging JavaScript
- The site uses `defer` attribute on script tags, so DOM elements are available when scripts run

## Code Architecture & Structure

### File Organization
```
herirahmansyah.github.io-main/
├── index.html          # Main HTML structure
├── styles.css          # All styling including animations, dark mode, responsive design
├── script.js           # All JavaScript functionality
├── chat-widget.css     # Styles for chat widget (if used)
├── chat-widget.js      # Script for chat widget (if used)
├── *.jpg, *.webp, *.png, *.gif  # Media assets (photos, certificates, project screenshots, demo GIFs)
└── project*.html       # Individual project detail pages
```

### Key Components

#### 1. HTML Structure (`index.html`)
- Semantic HTML5 structure with clear section IDs for navigation
- Contains all content sections: header, hero, about, portfolio, certificates, skills, contact, footer
- Includes modals for certificate viewing and project previews
- Links to external stylesheets and scripts

#### 2. CSS Styling (`styles.css`)
- CSS Reset with `* { margin: 0; padding: 0; box-sizing: border-box; }`
- Dark mode implementation using `.dark` class on body element
- Custom animations:
  - Scroll fade-in animations (`.fade-up`, `.section`)
  - Skill progress bar animations
  - Button hover/active effects
  - Modal zoom animations
- Responsive design with mobile-first approach
- CSS variables for consistent theming (implemented via color changes in dark mode)

#### 3. JavaScript Functionality (`script.js`)
- DOMContentLoaded event listener ensures DOM is ready
- Dark mode toggle with localStorage persistence
- Mobile navigation menu toggle
- Scroll animation using IntersectionObserver for fade-up effects
- Skill progress bar animation that triggers when skills section enters viewport
- Modal functionality for:
  - Certificate viewing (opens full-size certificate images)
  - Project preview (displays GIF demos)
- Modal closing mechanisms: close button, backdrop click, ESC key

#### 4. Assets
- Images: profile photo, project screenshots, certificate images
- GIF: dashboard demo for Power BI project preview
- External resources: Google Fonts, Font Awesome CDN

## Important Implementation Details

### Dark Mode
- Toggled via button in header (`#darkToggle`)
- State saved to localStorage as "dark" or "light"
- Applied by adding/removing `.dark` class on `<body>` element
- All dark mode styles defined in CSS using `body.dark` selector

### Animations
- Uses IntersectionObserver API for performance-efficient scroll animations
- Elements with classes `.fade-up` and `.section` animate in when scrolling
- Skill progress bars animate when skills section enters viewport
- Modals use CSS zoom-in animation

### Modals
- Two modals: certificate modal (`#certModal`) and preview modal (`#previewModal`)
- Both use fixed positioning with semi-transparent backdrop
- Content loaded dynamically via JavaScript (image sources set from data attributes)
- Accessible closing: X button, clicking backdrop, ESC key

### Responsive Design
- Mobile navigation converts to vertical menu on small screens
- Flexbox and CSS Grid used for layouts
- Portfolio section uses CSS Grid with auto-fit for responsive project cards
- Images use `object-fit: cover` for consistent sizing

## Maintenance Guidelines

### Adding New Content
1. **New Project**: Add HTML structure in portfolio section, include image, update project*.html if needed
2. **New Certificate**: Add to certificates section, include image
3. **New Skill**: Add to skills section with appropriate progress percentage
4. **Content Updates**: Edit text in relevant sections, update images as needed

### Styling Changes
- Modify `styles.css` for visual changes
- Use existing CSS classes and patterns for consistency
- Dark mode equivalents should be considered for any color changes

### JavaScript Updates
- Add new functionality in `script.js` following existing patterns
- Use `const` and `let` for variable declarations
- Follow existing event listener patterns
- Consider performance when adding new observers or event listeners

### Asset Management
- Optimize images for web use before adding
- Keep consistent naming conventions
- Update references in HTML/CSS/JS when assets are added/removed

## Browser Compatibility
- Modern browsers: Chrome, Firefox, Safari, Edge (latest versions)
- Uses modern APIs: IntersectionObserver, localStorage, CSS custom properties
- Graceful degradation in older browsers (animations may not work, but content accessible)