import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// Postprocessing
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

export function animateLogo() {
  const canvas = document.getElementById("threejs") as HTMLCanvasElement | null;
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0); // Set clear color to transparent
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const composer = new EffectComposer(renderer);
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = 1.0;

  const bloomParams = {
    strength: 2,
    radius: 0.6,
    threshold: 0.1,
  };
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    bloomParams.strength,
    bloomParams.radius,
    bloomParams.threshold
  );

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 2);
  camera.lookAt(0, 0, 0);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);

  composer.setSize(window.innerWidth, window.innerHeight);

  const texLoader = new THREE.TextureLoader();
  const matcap = texLoader.load("/matcap7.jpg");
  matcap.colorSpace = THREE.SRGBColorSpace;

  const loader = new GLTFLoader();
  let mesh: THREE.Object3D | null = null;
  // Shared mixer, actions and clock for animation playback
  let mixer: THREE.AnimationMixer | null = null;
  let actions: THREE.AnimationAction[] = [];
  const clock = new THREE.Clock();

  loader.load(
    "/logo3.glb",
    (gltf) => {
      mesh = gltf.scene;
      const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap });

      mesh.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.material = matcapMaterial;
        }
      });

      mesh.scale.set(0.15, 0.15, 0.15);
      mesh.rotation.y = -Math.PI / 2; // flip upright

      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      mesh.position.sub(center);
      scene.add(mesh);

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(mesh);
        actions = gltf.animations.map((clip) => {
          const a = mixer!.clipAction(clip);
          a.setLoop(THREE.LoopRepeat, Infinity);
          a.timeScale = 1;
          a.play();
          return a;
        });
      }
    },
    undefined,
    (err) => {
      console.error("Failed to load /logo.glb", err);
    }
  );

  let frameId: number;
  const animate = () => {
    frameId = requestAnimationFrame(animate);

    try {
      if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);
      }
    } catch {}

    composer.render();
  };
  animate();

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    cancelAnimationFrame(frameId);
    try {
      actions.forEach((a) => a.stop());
      mixer?.stopAllAction();
    } catch {
      /* ignore */
    }
    try {
      composer.passes.forEach((p) => {
        if (p.dispose) p.dispose();
      });
    } catch {
      /* ignore */
    }
    renderer.dispose();
  };
}
