// Advanced Orbital Mechanics with Perspective Effects
// This script implements realistic orbital mechanics for the Earth-Moon system
// with proper perspective changes and accurate positioning

// Constants for orbital mechanics
const ORBITAL_INCLINATION = 5.14; // Moon's orbital inclination in degrees
const ORBITAL_ECCENTRICITY = 0.0549; // Moon's orbital eccentricity
const PERSPECTIVE_FACTOR = 1.5; // Factor to enhance perspective effect for visual clarity
const ORBIT_PERIOD = 27.3; // Moon's orbital period in Earth days (scaled for animation)

// Create the orbital path with proper perspective
function createOrbitalMechanics() {
    // Create a container for all orbital elements
    const orbitalSystem = new THREE.Group();
    scene.add(orbitalSystem);
    
    // Set up the camera for proper perspective view
    setupOrbitalCamera();
    
    // Create Earth at the center of the system
    const earthSystem = createDetailedEarth();
    orbitalSystem.add(earthSystem);
    
    // Create Moon with orbital parameters
    const moonSystem = createDetailedMoon();
    orbitalSystem.add(moonSystem);
    
    // Create orbital path visualization (optional, can be toggled)
    createOrbitalPath(moonSystem);
    
    // Return the complete system
    return orbitalSystem;
}

// Set up camera for third-person angled view
function setupOrbitalCamera() {
    // Position camera at an angle to see the orbital plane
    camera.position.set(EARTH_RADIUS * 3, EARTH_RADIUS * 2, EARTH_RADIUS * 8);
    
    // Look at Earth (slightly offset to see the orbital plane better)
    camera.lookAt(0, 0, 0);
    
    // Add subtle camera movement to enhance the sense of space
    const cameraAnimation = function(time) {
        const amplitude = EARTH_RADIUS * 0.2;
        const frequency = 0.05;
        
        // Subtle camera movement in a figure-8 pattern
        camera.position.x = EARTH_RADIUS * 3 + Math.sin(time * frequency) * amplitude;
        camera.position.y = EARTH_RADIUS * 2 + Math.sin(time * frequency * 2) * amplitude * 0.5;
        
        // Always look at the Earth
        camera.lookAt(0, 0, 0);
    };
    
    // Store the camera animation function
    scene.userData.cameraAnimation = cameraAnimation;
}

// Create a visualization of the Moon's orbital path
function createOrbitalPath(moonSystem) {
    // Create an elliptical curve to represent the Moon's orbit
    const curve = new THREE.EllipseCurve(
        0, 0,                         // Center x, y
        MOON_DISTANCE, MOON_DISTANCE * (1 - ORBITAL_ECCENTRICITY), // xRadius, yRadius
        0, 2 * Math.PI,               // startAngle, endAngle
        false,                        // clockwise
        0                             // rotation
    );
    
    // Get points along the curve
    const points = curve.getPoints(100);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
    
    // Create a material for the orbit path
    const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0x4444ff,
        transparent: true,
        opacity: 0.3
    });
    
    // Create the orbit line
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    
    // Rotate to match the Moon's orbital inclination
    orbitLine.rotation.x = THREE.MathUtils.degToRad(ORBITAL_INCLINATION);
    
    // Add to the scene but make it invisible by default
    orbitLine.visible = false;
    moonSystem.add(orbitLine);
    
    // Store reference to toggle visibility
    moonSystem.userData.orbitLine = orbitLine;
}

// Update function for orbital mechanics (called in animation loop)
function updateOrbitalMechanics(time) {
    if (!moonMesh || !earthGroup || !moonOrbitGroup) return;
    
    // Calculate moon position based on elliptical orbit
    const angle = time * MOON_ORBIT_SPEED;
    
    // Apply Kepler's laws for elliptical orbit
    // The moon moves faster when closer to Earth
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
    const scaleFactor = 1 + (1 - normalizedDistance) * 0.2 * PERSPECTIVE_FACTOR;
    moonMesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
    
    // Ensure Moon always faces Earth (tidally locked)
    moonMesh.rotation.y = -angle;
    
    // Determine if moon is behind Earth from camera perspective
    const earthWorldPos = new THREE.Vector3();
    earthGroup.getWorldPosition(earthWorldPos);
    
    const moonToEarth = earthWorldPos.clone().sub(moonWorldPos);
    const cameraToEarth = earthWorldPos.clone().sub(camera.position);
    
    // If dot product is positive, moon is on the far side of Earth
    const isBehindEarth = moonToEarth.dot(cameraToEarth) > 0 && 
                          moonWorldPos.distanceTo(earthWorldPos) < EARTH_RADIUS * 1.5;
    
    // Adjust moon opacity when it goes behind Earth
    if (isBehindEarth) {
        // Make moon semi-transparent when behind Earth
        moonMesh.material.transparent = true;
        moonMesh.material.opacity = 0.3;
    } else {
        // Restore full opacity when visible
        moonMesh.material.transparent = false;
        moonMesh.material.opacity = 1.0;
    }
    
    // Apply any custom animations defined for Earth and Moon
    if (earthGroup.userData.animate) {
        earthGroup.userData.animate(time);
    }
    
    if (moonOrbitGroup.userData.animate) {
        moonOrbitGroup.userData.animate(time);
    }
    
    // Apply camera animation if defined
    if (scene.userData.cameraAnimation) {
        scene.userData.cameraAnimation(time);
    }
}
