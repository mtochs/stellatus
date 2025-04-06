// Main integration script for Three.js Earth-Moon System
// This script connects all components and integrates them with the website

// Import dependencies from separate modules
// Note: Since we're using script tags, these are already available in the global scope

// Main initialization function
function initEarthMoonSystem() {
    console.log('Initializing Earth-Moon System...');
    
    // Get the container element
    const container = document.querySelector('.earth-moon-container');
    if (!container) {
        console.error('Earth-Moon container not found');
        return;
    }
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Initialize the scene, camera, and renderer
    initScene();
    
    // Create lighting system
    const lighting = createSpaceLighting();
    scene.add(lighting);
    
    // Create orbital system with Earth and Moon
    const orbitalSystem = createOrbitalMechanics();
    
    // Start the animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    console.log('Earth-Moon System initialized successfully');
}

// Initialize the Three.js scene
function initScene() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera with angled third-person view
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(EARTH_RADIUS * 4, EARTH_RADIUS * 3, EARTH_RADIUS * 10);
    camera.lookAt(0, 0, 0);
    
    // Create renderer with transparency for stars background
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
    });
    
    // Configure renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add renderer to the DOM
    const container = document.querySelector('.earth-moon-container');
    container.appendChild(renderer.domElement);
    
    // Set renderer and container styles
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '1';
    
    // Ensure container has position relative for proper positioning
    container.style.position = 'relative';
    
    // Initialize the clock for animation timing
    clock = new THREE.Clock();
}

// Main animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Get elapsed time
    const time = clock.getElapsedTime();
    
    // Update orbital mechanics
    updateOrbitalMechanics(time);
    
    // Update lighting
    updateLighting(time);
    
    // Render the scene
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment to ensure all resources are loaded
    setTimeout(function() {
        // Check if Three.js is loaded
        if (typeof THREE === 'undefined') {
            console.error('Three.js not loaded');
            return;
        }
        
        // Initialize the Earth-Moon system
        initEarthMoonSystem();
    }, 500);
});
