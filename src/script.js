import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader()

fontLoader.load(
    "/fonts/Rowdies_Bold.json", //có thể chuyển file font .ttf chuyển đổi thành .json bằng https://gero3.github.io/facetype.js/
    (font) => {
        const textGeometry = new THREE.TextBufferGeometry(
            'Huỳnh Vĩnh Tiến \n 3D Text - ThreeJS',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )

        textGeometry.center()

        const textMaterial = new THREE.MeshNormalMaterial()
        // textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)

        /** =========== HÌNH BÁNH DONUT ===========

        const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
        const donutMaterial = new THREE.MeshNormalMaterial()

        for(let i = 0; i < 100; i++){
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }

        =========== HÌNH BÁNH DONUT =========== */


        //=========== HÌNH VIÊN BI HOẶC QUẢ CẦU ===========
        const sphereGeometry = new THREE.SphereBufferGeometry(0.3, 32, 32); // Radius, widthSegments, heightSegments
        const sphereMaterial = new THREE.MeshNormalMaterial();

        for (let i = 0; i < 200; i++) {
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

            sphere.position.x = (Math.random() - 0.5) * 10;
            sphere.position.y = (Math.random() - 0.5) * 10;
            sphere.position.z = (Math.random() - 0.5) * 10;

            sphere.rotation.x = Math.random() * Math.PI;
            sphere.rotation.y = Math.random() * Math.PI;

            const scale = Math.random();
            sphere.scale.set(scale, scale, scale);

            scene.add(sphere);
        }
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()