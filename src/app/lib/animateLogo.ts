import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { MathUtils } from "three";

export function animateLogo() {
  const canvas = document.getElementById("threejs") as HTMLCanvasElement | null;
  if (!canvas) return;

  let frameId: number;

  const baseRotationY = -Math.PI / 2;
  const baseScale = 0.6;
  const rotationLerp = 0.1;
  const clock = new THREE.Clock();

  const renderer = new THREE.WebGLRenderer({ canvas });
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

  // PMREM for physically-based env map (used for reflections/transmission)
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  let envMap: THREE.Texture | null = null;
  // Load HDR equirectangular and convert to cubemap irradiance
  const rgbeLoader = new RGBELoader();
  rgbeLoader.setDataType(THREE.UnsignedByteType);
  rgbeLoader.load(
    "/sky.hdr",
    (texture) => {
      const exrCube = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = exrCube;
      envMap = exrCube;
      texture.dispose();
      pmremGenerator.dispose();
    },
    undefined,
    (err) => {
      console.warn("Failed to load HDR environment (/sky.hdr)", err);
      pmremGenerator.dispose();
    }
  );

  // State containers
  const loader = new GLTFLoader();
  let logoGroup: THREE.Group | null = null;
  let box3: THREE.Box3 | null = null;
  let logoSize: THREE.Vector3 | null = null;
  const mousePosition = new THREE.Vector2();
  let mixer: THREE.AnimationMixer;
  let animLength = 0;

  const updateLogoScale = () => {
    if (!logoGroup || !logoSize) return;

    let scaleMultiplier = MathUtils.inverseLerp(0, 1.6, camera.aspect);
    scaleMultiplier = Math.min(1, scaleMultiplier);

    const f = 0.8; // fraction of viewport height occupied before applying baseScale
    logoGroup.position.divideScalar(-logoGroup.scale.x);
    const dynamicViewportScale =
      (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * Math.abs(camera.position.z) * 2 * f) /
      logoSize.y;
    logoGroup.scale.setScalar(baseScale * dynamicViewportScale * scaleMultiplier);
    logoGroup.position.multiplyScalar(-logoGroup.scale.x);
  };

  loader.load(
    "/test.glb",
    (gltf) => {
      logoGroup = gltf.scene;
      const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap });

      logoGroup.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          (obj as THREE.Mesh).material = matcapMaterial;
        }

        if (obj.name === "RING") {
          const ringMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.0,
            roughness: 0.1,
            transmission: 0.9,
            thickness: 0.5,
            ior: 1.45,
            reflectivity: 0.9,
            envMapIntensity: 2.0,
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 0.75,
          });

          // If environment map already ready, assign it; otherwise rely on scene.environment
          if (envMap) ringMat.envMap = envMap;
          const mesh = obj as THREE.Mesh;
          mesh.material = ringMat;
          if (!Array.isArray(mesh.material)) {
            (mesh.material as THREE.Material).needsUpdate = true;
          }
        }

        if (obj.name === "TEXT") {
          (obj as THREE.Mesh).material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 0.75,
          });
        }
      });

      const animations = gltf.animations;
      if (animations && animations.length) {
        mixer = new THREE.AnimationMixer(logoGroup);
        animLength = animations[0].duration;
        animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play();
        });
      }

      box3 = new THREE.Box3().setFromObject(logoGroup);
      const center = box3.getCenter(new THREE.Vector3());
      logoSize = box3.getSize(new THREE.Vector3());
      logoGroup.position.copy(center).negate();

      updateLogoScale();
      logoGroup.rotation.y = baseRotationY; // initial orientation
      scene.add(logoGroup);
    },
    undefined,
    (err) => console.error("Failed to load /logo.glb", err)
  );

  const animate = () => {
    if (mixer) {
      let pct = document.body.scrollTop / window.innerHeight;
      pct = MathUtils.clamp(pct * 1.5, 0, 1);
      const prev = mixer.time;
      const next = pct * animLength;
      const time = THREE.MathUtils.damp(prev, next, 5, clock.getDelta());
      mixer.setTime(time);
    }

    if (logoGroup) {
      const targetRotX = -mousePosition.y * 0.3; // baseline X = 0
      const targetRotY = baseRotationY + mousePosition.x * 0.3; // offset relative to baseline Y
      logoGroup.rotation.x = THREE.MathUtils.lerp(logoGroup.rotation.x, targetRotX, rotationLerp);
      logoGroup.rotation.y = THREE.MathUtils.lerp(logoGroup.rotation.y, targetRotY, rotationLerp);
    }
    composer.render();

    frameId = requestAnimationFrame(animate);
  };

  animate();

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    updateLogoScale();
  };

  const handleMouseMove = (e: MouseEvent) => {
    mousePosition.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      (e.clientY / window.innerHeight) * -2 + 1
    );
  };

  window.addEventListener("mousemove", handleMouseMove);
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
