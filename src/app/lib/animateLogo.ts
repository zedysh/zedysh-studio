import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";

export default function animateLogo() {
  const canvas = document.getElementById("threejs") as HTMLCanvasElement | null;
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const composer = new EffectComposer(renderer);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 2);
  camera.lookAt(0, 0, 0);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  composer.setSize(window.innerWidth, window.innerHeight);

  // Assets
  const texLoader = new THREE.TextureLoader();
  const matcap = texLoader.load("/matcap.jpg");
  matcap.colorSpace = THREE.SRGBColorSpace;

  // State containers
  const loader = new GLTFLoader();
  let logoGroup: THREE.Group | null = null;
  let gltf: THREE.Object3D | null;
  let box3: THREE.Box3 | null = null;
  let logoSize: THREE.Vector3 | null = null;
  const mousePosition = new THREE.Vector2();

  const handleMouseMove = (e: MouseEvent) => {
    mousePosition.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      (e.clientY / window.innerHeight) * -2 + 1
    );
  };

  // Baseline rotation (requested): start turned 90deg around Y
  const baseRotationY = -Math.PI / 2;

  const baseScale = 0.7; // requested base scale

  const updateLogoScale = () => {
    if (!logoGroup || !logoSize) return;
    const f = 0.8; // fraction of viewport height occupied before applying baseScale
    logoGroup.position.divideScalar(-logoGroup.scale.x);
    const dynamicViewportScale =
      (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * Math.abs(camera.position.z) * 2 * f) /
      logoSize.y;
    logoGroup.scale.setScalar(baseScale * dynamicViewportScale);
    logoGroup.position.multiplyScalar(-logoGroup.scale.x);
  };

  const scrollProgress: { previous: number; current: number } = {
    previous: 0,
    current: 0,
  };

  loader.load(
    "/logo.glb",
    (gltf) => {
      logoGroup = gltf.scene;
      gltf = gltf;
      const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap });
      logoGroup.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          (obj as THREE.Mesh).material = matcapMaterial;
        }
      });

      // const animations = gltf.animations;
      // if (animations && animations.length) {
      //   const mixer = new THREE.AnimationMixer(logoGroup);
      //   animations.forEach((clip) => {
      //     const action = mixer.clipAction(clip);
      //     action.play();
      //   });

      //   // Update the mixer on each frame
      //   const clock = new THREE.Clock();
      //   const updateMixer = () => {
      //     requestAnimationFrame(updateMixer);
      //     const delta = clock.getDelta();
      //     mixer.update(delta);
      //   };
      //   updateMixer();
      // }

      box3 = new THREE.Box3().setFromObject(logoGroup);
      const center = box3.getCenter(new THREE.Vector3());
      logoSize = box3.getSize(new THREE.Vector3());
      logoGroup.position.copy(center).negate();

      updateLogoScale();
      logoGroup.rotation.y = baseRotationY; // initial orientation
      scene.add(logoGroup);
    },
    undefined,
    (err) => console.error("Failed to load /logo4.glb", err)
  );

  // Scroll-controlled animation (damped; normalized to total scrollable height)
  let frameId: number;
  const rotationLerp = 0.1;

  // const mixer = new THREE.AnimationMixer(gltf.scene);

  window.addEventListener("mousemove", handleMouseMove);

  function update(scrollProgress: number, deltaTime: number) {
    /** multiply progress to duration of first animation because duration of all animations are same */
    // mixer.setTime(scrollProgress * gltf.animations[0].duration);
  }

  // three clock
  const clock = new THREE.Clock();
  // delta
  const delta = clock.getDelta();

  // mixer.setTime(scrollProgress.current * gltf.animations[0].duration);

  update(Math.min(0.99, Math.max(0, scrollProgress.current)), delta);

  const animate = () => {
    const delta = clock.getDelta();

    scrollProgress.previous = scrollProgress.current;
    scrollProgress.current = THREE.MathUtils.damp(
      scrollProgress.previous,
      window.scrollY / window.innerHeight,
      6,
      delta
    );

    frameId = requestAnimationFrame(animate);

    if (logoGroup) {
      const targetRotX = -mousePosition.y * 0.3; // baseline X = 0
      const targetRotY = baseRotationY + mousePosition.x * 0.3; // offset relative to baseline Y
      logoGroup.rotation.x = THREE.MathUtils.lerp(logoGroup.rotation.x, targetRotX, rotationLerp);
      logoGroup.rotation.y = THREE.MathUtils.lerp(logoGroup.rotation.y, targetRotY, rotationLerp);
    }
    composer.render();
  };

  animate();

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    updateLogoScale();
  };
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    window.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(frameId);

    try {
      composer.passes.forEach((p) => {
        if (p.dispose) p.dispose();
      });
    } catch {}
    renderer.dispose();
  };
}
