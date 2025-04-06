// Enhanced Earth Model with Detailed Textures and Realistic Features
function createDetailedEarth() {
    // Create a group to hold Earth and its components
    earthGroup = new THREE.Group();
    scene.add(earthGroup);
    
    // Load Earth textures with proper error handling
    const textureLoader = new THREE.TextureLoader();
    
    // Load Earth day map (surface texture)
    const earthTexture = textureLoader.load('assets/textures/earth_daymap.jpg', 
        undefined, 
        function(err) { console.error('Error loading earth texture:', err); }
    );
    
    // Load Earth normal map (for surface details)
    const earthNormalMap = textureLoader.load('assets/textures/earth_normal.jpg',
        undefined,
        function(err) { console.error('Error loading normal map:', err); }
    );
    
    // Load Earth specular map (for reflective properties)
    const earthSpecularMap = textureLoader.load('assets/textures/earth_specular.jpg',
        undefined,
        function(err) { console.error('Error loading specular map:', err); }
    );
    
    // Load clouds texture
    const cloudsTexture = textureLoader.load('assets/textures/earth_clouds.jpg',
        undefined,
        function(err) { console.error('Error loading clouds texture:', err); }
    );
    
    // Create Earth sphere with high detail
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 128, 128);
    
    // Create material with advanced properties
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
        normalMap: earthNormalMap,
        normalScale: new THREE.Vector2(0.85, 0.85), // Adjust normal map intensity
        specularMap: earthSpecularMap,
        specular: new THREE.Color(0x333333),
        shininess: 25,
        bumpMap: earthNormalMap,
        bumpScale: 0.05
    });
    
    // Create Earth mesh
    earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);
    
    // Create atmosphere glow effect
    const atmosphereGeometry = new THREE.SphereGeometry(EARTH_RADIUS + 0.15, 128, 128);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x93cfef,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
    });
    
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthGroup.add(atmosphereMesh);
    
    // Create cloud layer with realistic properties
    const cloudsGeometry = new THREE.SphereGeometry(EARTH_RADIUS + 0.1, 128, 128);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
        map: cloudsTexture,
        transparent: true,
        opacity: 0.8,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneMinusSrcAlphaFactor
    });
    
    cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    earthGroup.add(cloudsMesh);
    
    // Tilt Earth to match realistic axial tilt (23.5 degrees)
    earthGroup.rotation.z = THREE.MathUtils.degToRad(23.5);
    
    // Add subtle wobble to Earth's rotation (precession)
    const wobbleAnimation = function(time) {
        const wobbleAmount = 0.005;
        const wobbleSpeed = 0.05;
        earthGroup.rotation.x = Math.sin(time * wobbleSpeed) * wobbleAmount;
    };
    
    // Store the wobble animation function for use in the animation loop
    earthGroup.userData.animate = wobbleAnimation;
    
    return earthGroup;
}
