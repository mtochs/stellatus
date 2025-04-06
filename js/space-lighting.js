// Space Lighting System with Accurate Solar Illumination
// This script implements realistic space lighting for the Earth-Moon system

// Constants for lighting
const SUN_INTENSITY = 1.5;           // Brightness of the sun
const SUN_COLOR = 0xffffff;          // Color of sunlight (pure white)
const AMBIENT_INTENSITY = 0.08;      // Very low ambient light in space
const EARTH_SHADOW_LENGTH = 150;     // Length of Earth's shadow cone

// Create the complete lighting system for space environment
function createSpaceLighting() {
    // Create a container for all lighting elements
    const lightingSystem = new THREE.Group();
    
    // Add the main sunlight
    const sunLight = createSunLight();
    lightingSystem.add(sunLight);
    
    // Add ambient light for minimal visibility on dark side
    const ambientLight = createAmbientLight();
    lightingSystem.add(ambientLight);
    
    // Add Earth shadow casting
    setupEarthShadow();
    
    // Add subtle rim lighting for Earth's atmosphere
    const rimLight = createRimLight();
    lightingSystem.add(rimLight);
    
    // Add subtle star reflections
    const starLight = createStarLight();
    lightingSystem.add(starLight);
    
    return lightingSystem;
}

// Create the main directional light representing the Sun
function createSunLight() {
    // Create a directional light for the sun
    const sunLight = new THREE.DirectionalLight(SUN_COLOR, SUN_INTENSITY);
    
    // Position the light to create realistic shadows
    // Coming from a specific angle to create proper terminator line on Earth and Moon
    sunLight.position.set(50, 10, 30);
    
    // Enable shadows
    sunLight.castShadow = true;
    
    // Configure shadow properties for better quality
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 200;
    
    // Adjust shadow camera frustum to cover Earth and Moon
    const shadowSize = EARTH_RADIUS * 10;
    sunLight.shadow.camera.left = -shadowSize;
    sunLight.shadow.camera.right = shadowSize;
    sunLight.shadow.camera.top = shadowSize;
    sunLight.shadow.camera.bottom = -shadowSize;
    
    // Add subtle shadow blur
    sunLight.shadow.radius = 2;
    
    // Create a subtle sun lens flare effect
    addSunLensFlare(sunLight);
    
    return sunLight;
}

// Create very subtle ambient light for minimal visibility in shadows
function createAmbientLight() {
    // In space, there's very little ambient light
    // This is just enough to see some details in the shadows
    const ambientLight = new THREE.AmbientLight(0x404040, AMBIENT_INTENSITY);
    return ambientLight;
}

// Setup Earth's shadow casting onto the Moon
function setupEarthShadow() {
    // Earth should cast shadow on the Moon during lunar eclipses
    if (earthMesh) {
        earthMesh.castShadow = true;
        earthMesh.receiveShadow = true;
    }
    
    // Moon should receive Earth's shadow
    if (moonMesh) {
        moonMesh.receiveShadow = true;
        moonMesh.castShadow = false; // Moon's shadow on Earth not visible from our perspective
    }
}

// Create subtle rim lighting for Earth's atmosphere
function createRimLight() {
    // This light creates the subtle blue glow on Earth's rim
    // Simulating light scattering through the atmosphere
    const rimLight = new THREE.DirectionalLight(0x6b8cff, 0.3);
    rimLight.position.set(-50, 0, 0);
    
    // This light doesn't cast shadows
    rimLight.castShadow = false;
    
    return rimLight;
}

// Create very subtle light representing star reflections
function createStarLight() {
    // This creates extremely subtle fill light from stars
    const starLight = new THREE.HemisphereLight(0x000010, 0x000010, 0.05);
    return starLight;
}

// Add a subtle lens flare effect for the sun
function addSunLensFlare(sunLight) {
    // Load lens flare texture
    const textureLoader = new THREE.TextureLoader();
    const flareTexture = textureLoader.load('assets/textures/lensflare.png', 
        function(texture) {
            // Create lens flare effect
            const lensflare = new THREE.Lensflare();
            
            // Add flare elements
            lensflare.addElement(new THREE.LensflareElement(texture, 512, 0, sunLight.color));
            lensflare.addElement(new THREE.LensflareElement(texture, 60, 0.6));
            lensflare.addElement(new THREE.LensflareElement(texture, 70, 0.7));
            lensflare.addElement(new THREE.LensflareElement(texture, 120, 0.9));
            lensflare.addElement(new THREE.LensflareElement(texture, 70, 1.0));
            
            // Add lens flare to sun light
            sunLight.add(lensflare);
        },
        undefined,
        function(err) {
            console.error('Error loading lens flare texture:', err);
        }
    );
}

// Update lighting based on orbital positions
function updateLighting(time) {
    // Get references to lights
    const sunLight = scene.getObjectByName('sunLight');
    const rimLight = scene.getObjectByName('rimLight');
    
    if (!sunLight || !rimLight) return;
    
    // Slowly rotate the sun position to create day/night cycle
    // Much slower than real-time for visualization purposes
    const sunRotationSpeed = 0.05;
    const sunRadius = 100;
    
    sunLight.position.x = Math.cos(time * sunRotationSpeed) * sunRadius;
    sunLight.position.z = Math.sin(time * sunRotationSpeed) * sunRadius;
    
    // Keep rim light opposite to sun for atmospheric scattering effect
    rimLight.position.x = -sunLight.position.x;
    rimLight.position.z = -sunLight.position.z;
    
    // Check for lunar eclipse conditions
    checkLunarEclipse(sunLight);
}

// Check and handle lunar eclipse conditions
function checkLunarEclipse(sunLight) {
    if (!earthMesh || !moonMesh) return;
    
    // Get world positions
    const earthWorldPos = new THREE.Vector3();
    earthMesh.getWorldPosition(earthWorldPos);
    
    const moonWorldPos = new THREE.Vector3();
    moonMesh.getWorldPosition(moonWorldPos);
    
    const sunDirection = sunLight.position.clone().normalize();
    
    // Vector from Earth to Moon
    const earthToMoon = moonWorldPos.clone().sub(earthWorldPos);
    const distanceEarthMoon = earthToMoon.length();
    
    // Normalize for direction
    earthToMoon.normalize();
    
    // Dot product between sun direction and Earth-Moon direction
    // If close to -1, they're in opposition (potential eclipse)
    const alignment = earthToMoon.dot(sunDirection);
    
    // Check if Moon is in Earth's shadow cone
    if (alignment < -0.97 && distanceEarthMoon < EARTH_SHADOW_LENGTH) {
        // Moon is in Earth's shadow - lunar eclipse
        // Reduce moon brightness during eclipse
        if (moonMesh.material) {
            moonMesh.material.emissive = new THREE.Color(0x330000); // Reddish during eclipse
            moonMesh.material.emissiveIntensity = 0.2;
        }
    } else {
        // Normal lighting
        if (moonMesh.material) {
            moonMesh.material.emissive = new THREE.Color(0x000000);
            moonMesh.material.emissiveIntensity = 0;
        }
    }
}

// Download lens flare texture if not already available
function downloadLensFlareTexture() {
    // Create a simple lens flare texture if not available
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple lens flare
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.1, 'rgba(255, 255, 220, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 220, 200, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    // Save the canvas as an image
    const dataURL = canvas.toDataURL('image/png');
    
    // Download the image
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'lensflare.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Lens flare texture created and downloaded');
}
