// Enhanced Star Generation with Twinkling Effects
document.addEventListener('DOMContentLoaded', function() {
    // Create stars container
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.appendChild(starsContainer);
    
    // Create three star layers
    for (let i = 1; i <= 3; i++) {
        const layer = document.createElement('div');
        layer.className = `stars-layer stars-layer-${i}`;
        starsContainer.appendChild(layer);
        
        // Generate stars for each layer
        generateStars(layer, i);
    }
    
    // Add parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Different scroll speeds for each layer
        document.querySelector('.stars-layer-1').style.transform = 
            `translateY(${scrollPosition * 0.4}px)`;
        document.querySelector('.stars-layer-2').style.transform = 
            `translateY(${scrollPosition * 0.2}px)`;
        document.querySelector('.stars-layer-3').style.transform = 
            `translateY(${scrollPosition * 0.1}px)`;
    });
});

// Generate stars for a specific layer
function generateStars(layer, layerNum) {
    // Number of stars per layer (more stars in background layers)
    const starCount = layerNum === 1 ? 100 : (layerNum === 2 ? 200 : 300);
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        
        // Random twinkling duration (3-8 seconds)
        const twinkleDuration = 3 + Math.random() * 5;
        star.style.setProperty('--twinkle-duration', `${twinkleDuration}s`);
        
        // Random delay for twinkling
        const delay = Math.random() * twinkleDuration;
        star.style.setProperty('--twinkle-delay', `${delay}s`);
        
        // Random base opacity (0.3-0.7)
        const baseOpacity = 0.3 + Math.random() * 0.4;
        star.style.setProperty('--star-opacity-base', baseOpacity);
        
        // Random mid opacity (between base and peak)
        const midOpacity = baseOpacity + (Math.random() * 0.2);
        star.style.setProperty('--star-opacity-mid', midOpacity);
        
        // Random peak opacity (0.7-1.0)
        const peakOpacity = 0.7 + Math.random() * 0.3;
        star.style.setProperty('--star-opacity-peak', peakOpacity);
        
        // Random glow size (1-3px)
        const glowSize = 1 + Math.random() * 2;
        star.style.setProperty('--star-glow-size', `${glowSize}px`);
        
        // Random glow spread (0-1px)
        const glowSpread = Math.random();
        star.style.setProperty('--star-glow-spread', `${glowSpread}px`);
        
        // Occasionally create larger stars (10% chance)
        if (Math.random() < 0.1) {
            star.classList.add('large');
        }
        
        // Occasionally add color variations (5% chance each)
        const colorRoll = Math.random();
        if (colorRoll < 0.05) {
            star.classList.add('blue');
        } else if (colorRoll < 0.1) {
            star.classList.add('red');
        } else if (colorRoll < 0.15) {
            star.classList.add('gold');
        }
        
        layer.appendChild(star);
    }
}
