// Define the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define the number of cubes and the size range
const numCubes = 100;
const minSize = 0.5;
const maxSize = 2;

// Define the geometry and material for the cubes
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 });

// Create the cubes and add them to the scene
const cubes = [];
for (let i = 0; i < numCubes; i++) {
    const size = Math.random() * (maxSize - minSize) + minSize;
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
        Math.random() * 40 - 20
    );
    cube.scale.set(size, size, size);
    // Add random color hover effect to the cubes
    cube.material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 100,
        emissive: 0x000000,
        emissiveIntensity: 0,
    });
    cubes.push(cube);
    scene.add(cube);
}

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 0, 50);
scene.add(pointLight);

// Listen for mousemove events on the renderer's domElement
renderer.domElement.addEventListener('mousemove', (event) => {
    // Calculate the normalized device coordinates of the mouse
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Create a raycaster from the camera to the mouse
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Find the intersecting cube, if any
    const intersects = raycaster.intersectObjects(cubes);
    if (intersects.length > 0) {
        // A cube is being hovered over
        const hoveredCube = intersects[0].object;
        // Generate a random color for the cube's emissive property
        const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        hoveredCube.material.emissive = randomColor;
        hoveredCube.material.emissiveIntensity = 0.5;
    } else {
        // No cube is being hovered over
        cubes.forEach((cube) => {
            cube.material.emissiveIntensity = 0;
        });
    }
});

// Add animation loop to rotate the cubes
const animate = function () {
    requestAnimationFrame(animate);
    scene.rotation.x += 0.005;
    scene.rotation.y += 0.005;
    renderer.render(scene, camera);
};
animate();
