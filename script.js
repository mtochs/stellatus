// Remove previous parallax scroll listener
// document.addEventListener('scroll', function() { ... });

const canvas = document.getElementById('oceanfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial size

const numParticles = 200; // Ocean particles (bubbles, debris, etc.)
const particles = [];

function initParticles() {
    particles.length = 0; // Clear existing particles on resize
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 0.5, // Size range for bubbles/particles
            alpha: Math.random() * 0.4 + 0.2, // Opacity range (more subtle)
            speed: Math.random() * 0.5 + 0.1, // Speed range (slower than stars)
            drift: Math.random() * 0.2 - 0.1, // Horizontal drift
            type: Math.random() > 0.7 ? 'bubble' : 'particle' // Different particle types
        });
    }
}

initParticles();
window.addEventListener('resize', initParticles); // Re-initialize particles on resize

function animateOcean() {
    // Create ocean depth gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#001122'); // Dark blue at top
    gradient.addColorStop(0.3, '#002244'); // Slightly lighter
    gradient.addColorStop(0.7, '#003366'); // Mid-depth blue
    gradient.addColorStop(1, '#004488'); // Lighter blue at bottom (deeper)
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        // Move particle up (we are descending effect) with slight horizontal drift
        particle.y -= particle.speed;
        particle.x += particle.drift;

        // Wrap around vertically and horizontally
        if (particle.y < 0 - particle.radius) {
            particle.y = canvas.height + particle.radius;
            particle.x = Math.random() * canvas.width; // Re-randomize x position
        }
        if (particle.x > canvas.width + particle.radius) {
            particle.x = 0 - particle.radius;
        } else if (particle.x < 0 - particle.radius) {
            particle.x = canvas.width + particle.radius;
        }

        // Draw particle based on type
        ctx.globalAlpha = particle.alpha;
        
        if (particle.type === 'bubble') {
            // Draw bubbles as circles with slight glow
            ctx.fillStyle = '#66aaff';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Draw particles as small dots
            ctx.fillStyle = '#88ccff';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius * 0.7, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    ctx.globalAlpha = 1.0; // Reset global alpha

    requestAnimationFrame(animateOcean); // Loop animation
}

animateOcean();

// --- Contact Form Handling ---
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const statusElement = document.getElementById('form-status');

    // Basic obfuscation (split parts, join later)
    const part1 = "mike";
    const part2 = ".ochs";
    const domain1 = "stellat";
    const domain2 = ".us";
    const recipient = part1 + part2 + '@' + domain1 + domain2; // mike.ochs@stellat.us

    const subject = `Website Contact Form Submission from ${name}`;
    let body = `Name: ${name}\nEmail: ${email}\n`;
    if (message) {
        body += `\nMessage:\n${message}`;
    }

    // Encode for mailto link
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Attempt to open mail client
    try {
        window.location.href = mailtoLink;
        statusElement.textContent = 'Your email client should open. Please send the message.';
        // Clear form (optional)
        // document.getElementById('contactForm').reset();
    } catch (e) {
        statusElement.textContent = 'Could not open email client. Please copy details manually.';
        console.error("Mailto link error:", e);
        // Optionally display the mailto link for manual copying
        // statusElement.innerHTML += `<br><a href="${mailtoLink}">Click here to try manually</a>`;
    }
});

// --- Mobile Navigation Toggle ---
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Optional: Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
} 