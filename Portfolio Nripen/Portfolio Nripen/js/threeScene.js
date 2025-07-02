import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

let scene, camera, renderer, particles, particleMaterial;

function initThreeScene() {
    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('three-background').appendChild(renderer.domElement);

    // Particles
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x6a0dad); // Primary color
    const color2 = new THREE.Color(0xff69b4); // Secondary color

    for (let i = 0; i < particleCount; i++) {
        // Position particles randomly in a cube
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        // Assign random color between color1 and color2
        const mixedColor = new THREE.Color();
        mixedColor.lerpColors(color1, color2, Math.random());
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });

    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Add a subtle ambient light
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    // Add a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation loop
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0008;

    // Animate particle movement (optional, for more dynamic effect)
    // const positions = particles.geometry.attributes.position.array;
    // for (let i = 0; i < positions.length; i += 3) {
    //     positions[i + 1] += 0.001; // Move particles up
    //     if (positions[i + 1] > 5) positions[i + 1] = -5; // Reset if out of bounds
    // }
    // particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// Initialize the Three.js scene when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Ensure there's a div with id 'three-background' in your index.html
    // within the #home section for the canvas to be appended.
    const threeBackgroundDiv = document.createElement('div');
    threeBackgroundDiv.id = 'three-background';
    threeBackgroundDiv.style.position = 'absolute';
    threeBackgroundDiv.style.top = '0';
    threeBackgroundDiv.style.left = '0';
    threeBackgroundDiv.style.width = '100%';
    threeBackgroundDiv.style.height = '100%';
    threeBackgroundDiv.style.zIndex = '-1'; // Place behind content
    document.getElementById('home').prepend(threeBackgroundDiv);

    initThreeScene();
});