// Three.js Earth-Moon System with Realistic Orbital Mechanics
// This script creates a realistic 3D Earth and Moon system with accurate lighting and orbital mechanics

// Global variables
let scene, camera, renderer;
let earthMesh, cloudsMesh, moonMesh;
let earthGroup, moonOrbitGroup;
let sunLight;
let clock = new THREE.Clock();

// Scene dimensions and parameters
const EARTH_RADIUS = 5;
const MOON_RADIUS = EARTH_RADIUS * 0.27; // Moon is about 27% the size of Earth
const MOON_DISTANCE = EARTH_RADIUS * 30; // Distance scaled for visual effect
const MOON_ORBIT_SPEED = 0.05; // Speed of moon's orbit
const EARTH_ROTATION_SPEED = 0.1; // Speed of earth's rotation

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera with angled third-person view
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(EARTH_RADIUS * 4, EARTH_RADIUS * 3, EARTH_RADIUS * 10);
    camera.lookAt(0, 0, 0);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true // Transparent background to show stars
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add renderer to the DOM
    const container = document.querySelector('.earth-moon-container');
    if (container) {
        // Clear any existing content
        container.innerHTML = '';
        container.appendChild(renderer.domElement);
    }
    
    // Add lighting
    setupLighting();
    
    // Create Earth and Moon
    createEarth();
    createMoon();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Set up lighting to simulate sunlight in space
function setupLighting() {
    // Directional light to simulate sunlight
    sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(50, 0, 30); // Position light to create realistic shadows
    scene.add(sunLight);
    
    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
}

// Create realistic Earth with textures
function createEarth() {
    // Create a group to hold Earth and its rotation
    earthGroup = new THREE.Group();
    scene.add(earthGroup);
    
    // Load Earth textures
    const textureLoader = new THREE.TextureLoader();
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
    earthGroup.add(earthMesh);
    
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
    const moonTexture = textureLoader.load('assets/textures/moon.jpg');
    
    // Create Moon sphere
    const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({
        map: moonTexture,
        bumpMap: moonTexture,
        bumpScale: 0.1
    });
    
    moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    moonMesh.position.set(MOON_DISTANCE, 0, 0);
    
    // Add moon to the pivot
    moonPivot.add(moonMesh);
    
    // Tilt moon orbit to match realistic orbital inclination (5.14 degrees)
    moonOrbitGroup.rotation.x = THREE.MathUtils.degToRad(5.14);
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
    
    // Rotate Earth on its axis
    earthMesh.rotation.y += EARTH_ROTATION_SPEED * delta;
    cloudsMesh.rotation.y += EARTH_ROTATION_SPEED * 0.95 * delta; // Clouds rotate slightly slower
    
    // Rotate Moon around Earth
    moonOrbitGroup.rotation.y += MOON_ORBIT_SPEED * delta;
    
    // Ensure Moon always faces Earth (tidally locked)
    moonMesh.rotation.y = -moonOrbitGroup.rotation.y;
    
    // Render the scene
    renderer.render(scene, camera);
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a moment to ensure all resources are loaded
    setTimeout(init, 500);
});
