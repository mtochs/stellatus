// Enhanced Moon Model with Realistic Features and Textures
function createDetailedMoon() {
    // Create a group for the moon's orbit
    moonOrbitGroup = new THREE.Group();
    scene.add(moonOrbitGroup);
    
    // Create a pivot point for the moon's orbit
    const moonPivot = new THREE.Object3D();
    moonOrbitGroup.add(moonPivot);
    
    // Load Moon texture with error handling
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load('assets/textures/moon.jpg',
        undefined,
        function(err) { console.error('Error loading moon texture:', err); }
    );
    
    // Create Moon sphere with high detail
    const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 64, 64);
    
    // Create material with realistic properties
    const moonMaterial = new THREE.MeshPhongMaterial({
        map: moonTexture,
        bumpMap: moonTexture,
        bumpScale: 0.2,
        shininess: 5,
        reflectivity: 0.1
    });
    
    // Create Moon mesh
    moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    
    // Position moon at proper distance
    moonMesh.position.set(MOON_DISTANCE, 0, 0);
    
    // Add moon to the pivot
    moonPivot.add(moonMesh);
    
    // Tilt moon orbit to match realistic orbital inclination (5.14 degrees)
    moonOrbitGroup.rotation.x = THREE.MathUtils.degToRad(5.14);
    
    // Add subtle wobble to Moon's orbit (libration)
    const librationAnimation = function(time) {
        const librationAmount = 0.07;
        const librationSpeed = 0.03;
        moonPivot.rotation.z = Math.sin(time * librationSpeed) * librationAmount;
    };
    
    // Store the libration animation function for use in the animation loop
    moonOrbitGroup.userData.animate = librationAnimation;
    
    // Create a subtle glow effect for the moon when it's in front of Earth
    const moonGlowGeometry = new THREE.SphereGeometry(MOON_RADIUS * 1.2, 32, 32);
    const moonGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    
    const moonGlow = new THREE.Mesh(moonGlowGeometry, moonGlowMaterial);
    moonMesh.add(moonGlow);
    
    return moonOrbitGroup;
}
