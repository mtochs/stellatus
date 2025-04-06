// Main Three.js Earth-Moon System Implementation
// This file combines all components into a single implementation for easier debugging

// Global variables
let scene, camera, renderer;
let earthMesh, cloudsMesh, moonMesh;
let earthGroup, moonOrbitGroup;
let clock;

// Scene dimensions and parameters
const EARTH_RADIUS = 5;
const MOON_RADIUS = EARTH_RADIUS * 0.27; // Moon is about 27% the size of Earth
const MOON_DISTANCE = EARTH_RADIUS * 30; // Distance scaled for visual effect
const MOON_ORBIT_SPEED = 0.05; // Speed of moon's orbit
const EARTH_ROTATION_SPEED = 0.1; // Speed of earth's rotation

// Initialize the scene
function initEarthMoonSystem() {
    console.log('Initializing Earth-Moon System...');
    
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
    if (container) {
        // Clear any existing content
        container.innerHTML = '';
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
    } else {
        console.error('Earth-Moon container not found');
        return;
    }
    
    // Initialize the clock for animation timing
    clock = new THREE.Clock();
    
    // Add lighting
    setupLighting();
    
    // Create Earth and Moon
    createEarth();
    createMoon();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
    
    console.log('Earth-Moon System initialized successfully');
}

// Set up lighting to simulate sunlight in space
function setupLighting() {
    // Directional light to simulate sunlight
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(50, 0, 30); // Position light to create realistic shadows
    sunLight.name = 'sunLight';
    scene.add(sunLight);
    
    // Enable shadows
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    
    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0x333333, 0.08);
    scene.add(ambientLight);
    
    // Rim light for Earth's atmosphere
    const rimLight = new THREE.DirectionalLight(0x6b8cff, 0.3);
    rimLight.position.set(-50, 0, 0);
    rimLight.name = 'rimLight';
    scene.add(rimLight);
}

// Create realistic Earth with textures
function createEarth() {
    // Create a group to hold Earth and its rotation
    earthGroup = new THREE.Group();
    scene.add(earthGroup);
    
    // Load Earth textures
    const textureLoader = new THREE.TextureLoader();
    
    // Use try-catch to handle potential loading errors
    try {
        const earthTexture = textureLoader.load('assets/textures/earth_daymap.jpg');
        const earthNormalMap = textureLoader.load('assets/textures/earth_normal.jpg');
        const earthSpecularMap = textureLoader.load('assets/textures/earth_specular.jpg');
        const cloudsTexture = textureLoader.load('assets/textures/earth_clouds.jpg');
        
        // Create Earth sphere
        const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64);
        const earthMaterial = new THREE.MeshPhongMaterial({
            map: earthTexture,
            normalMap: earthNormalMap,
            specularMap: earthSpecularMap,
            specular: new THREE.Color(0x333333),
            shininess: 25
        });
        
        earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        earthMesh.castShadow = true;
        earthMesh.receiveShadow = true;
        earthGroup.add(earthMesh);
        
        // Create atmosphere glow effect
        const atmosphereGeometry = new THREE.SphereGeometry(EARTH_RADIUS + 0.15, 64, 64);
        const atmosphereMaterial = new THREE.MeshPhongMaterial({
            color: 0x93cfef,
            transparent: true,
            opacity: 0.15,
            side: THREE.BackSide
        });
        
        const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        earthGroup.add(atmosphereMesh);
        
        // Create cloud layer
        const cloudsGeometry = new THREE.SphereGeometry(EARTH_RADIUS + 0.1, 64, 64);
        const cloudsMaterial = new THREE.MeshPhongMaterial({
            map: cloudsTexture,
            transparent: true,
            opacity: 0.8
        });
        
        cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
        earthGroup.add(cloudsMesh);
        
        // Tilt Earth to match realistic axial tilt (23.5 degrees)
        earthGroup.rotation.z = THREE.MathUtils.degToRad(23.5);
        
        console.log('Earth created successfully');
    } catch (error) {
        console.error('Error creating Earth:', error);
    }
}

// Create realistic Moon with textures
function createMoon() {
    // Create a group for the moon's orbit
    moonOrbitGroup = new THREE.Group();
    scene.add(moonOrbitGroup);
    
    // Create a pivot point for the moon's orbit
    const moonPivot = new THREE.Object3D();
    moonOrbitGroup.add(moonPivot);
    
    // Load Moon texture
    const textureLoader = new THREE.TextureLoader();
    
    try {
        const moonTexture = textureLoader.load('assets/textures/moon.jpg');
        
        // Create Moon sphere
        const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 32, 32);
        const moonMaterial = new THREE.MeshPhongMaterial({
            map: moonTexture,
            bumpMap: moonTexture,
            bumpScale: 0.2
        });
        
        moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
        moonMesh.position.set(MOON_DISTANCE, 0, 0);
        moonMesh.receiveShadow = true;
        
        // Add moon to the pivot
        moonPivot.add(moonMesh);
        
        // Tilt moon orbit to match realistic orbital inclination (5.14 degrees)
        moonOrbitGroup.rotation.x = THREE.MathUtils.degToRad(5.14);
        
        console.log('Moon created successfully');
    } catch (error) {
        console.error('Error creating Moon:', error);
    }
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();
    
    // Rotate Earth on its axis
    if (earthMesh && cloudsMesh) {
        earthMesh.rotation.y += EARTH_ROTATION_SPEED * delta;
        cloudsMesh.rotation.y += EARTH_ROTATION_SPEED * 0.95 * delta; // Clouds rotate slightly slower
    }
    
    // Rotate Moon around Earth
    if (moonOrbitGroup && moonMesh) {
        moonOrbitGroup.rotation.y += MOON_ORBIT_SPEED * delta;
        
        // Ensure Moon always faces Earth (tidally locked)
        moonMesh.rotation.y = -moonOrbitGroup.rotation.y;
        
        // Calculate moon position for perspective effects
        const angle = time * MOON_ORBIT_SPEED;
        
        // Apply Kepler's laws for elliptical orbit
        const ORBITAL_ECCENTRICITY = 0.0549; // Moon's orbital eccentricity
        const r = MOON_DISTANCE * (1 - ORBITAL_ECCENTRICITY * Math.cos(angle));
        const x = r * Math.cos(angle);
        const z = r * Math.sin(angle);
        
        // Update moon position
        moonMesh.position.set(x, 0, z);
        
        // Calculate distance from camera to determine size scaling
        const moonWorldPos = new THREE.Vector3();
        moonMesh.getWorldPosition(moonWorldPos);
        
        const cameraDistance = camera.position.distanceTo(moonWorldPos);
        const normalizedDistance = (cameraDistance - MOON_DISTANCE * 0.5) / (MOON_DISTANCE * 1.5);
        
        // Scale moon slightly based on distance for enhanced perspective effect
        const PERSPECTIVE_FACTOR = 1.5;
        const scaleFactor = 1 + (1 - normalizedDistance) * 0.2 * PERSPECTIVE_FACTOR;
        moonMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
    
    // Update lighting
    const sunLight = scene.getObjectByName('sunLight');
    const rimLight = scene.getObjectByName('rimLight');
    
    if (sunLight && rimLight) {
        // Slowly rotate the sun position to create day/night cycle
        const sunRotationSpeed = 0.05;
        const sunRadius = 100;
        
        sunLight.position.x = Math.cos(time * sunRotationSpeed) * sunRadius;
        sunLight.position.z = Math.sin(time * sunRotationSpeed) * sunRadius;
        
        // Keep rim light opposite to sun for atmospheric scattering effect
        rimLight.position.x = -sunLight.position.x;
        rimLight.position.z = -sunLight.position.z;
    }
    
    // Render the scene
    renderer.render(scene, camera);
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment to ensure all resources are loaded
    setTimeout(initEarthMoonSystem, 500);
});
