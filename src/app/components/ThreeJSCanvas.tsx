"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

const ThreeJSCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef(new THREE.Vector2());
  const raycasterRef = useRef(new THREE.Raycaster());

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Load GLB model and create particle system
    const loader = new GLTFLoader();
    const particleCount = 50000;
    let mouseCleanup: (() => void) | null = null;

    loader.load(
      "/logo.glb",
      (gltf) => {
        // Get the first mesh from the loaded model
        let targetMesh: THREE.Mesh | undefined;

        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh && !targetMesh) {
            targetMesh = child;
          }
        });

        if (!targetMesh) {
          console.error("No mesh found in the GLB model");
          createFallbackCube();
          return;
        }

        console.log("Successfully loaded GLB model with mesh");

        // Ensure the geometry has proper attributes
        const modelGeometry = targetMesh.geometry;
        if (!modelGeometry || !modelGeometry.attributes.position) {
          console.error("Geometry missing position attribute");
          createFallbackCube();
          return;
        }

        // Create a temporary mesh for surface sampling
        const tempMesh = new THREE.Mesh(modelGeometry);

        // Sample points from the model's surface
        const sampler = new MeshSurfaceSampler(tempMesh);
        sampler.build();

        const positions = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);
        const tempPosition = new THREE.Vector3();

        for (let i = 0; i < particleCount; i++) {
          sampler.sample(tempPosition);

          const i3 = i * 3;
          positions[i3] = tempPosition.x;
          positions[i3 + 1] = tempPosition.y;
          positions[i3 + 2] = tempPosition.z;

          // Store original positions
          originalPositions[i3] = tempPosition.x;
          originalPositions[i3 + 1] = tempPosition.y;
          originalPositions[i3 + 2] = tempPosition.z;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        // Particle material
        const material = new THREE.PointsMaterial({
          color: 0x7f00ff,
          size: 0.01, // Increased size for better visibility
          transparent: true,
          opacity: 1,
        });

        const particles = new THREE.Points(particleGeometry, material);
        particles.scale.setScalar(1.1);
        particles.rotation.x = Math.PI; // Rotate 180 degrees on X-axis
        particles.rotation.y = Math.PI / 2; // Add 45 degrees rotation on Y-axis
        particles.rotation.z = -Math.PI / 2; // Add 30 degrees rotation on Z-axis
        scene.add(particles);

        // Mouse tracking
        const handleMouseMove = (event: MouseEvent) => {
          mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Hover effect parameters
        const hoverRadius = 2;
        const repulsionStrength = 0.25;
        const returnSpeed = 0.1;

        // Animation loop
        const animate = () => {
          animationRef.current = requestAnimationFrame(animate);

          // Update raycaster
          raycasterRef.current.setFromCamera(mouseRef.current, camera);

          // Get 3D position from mouse position
          const intersectionPoint = new THREE.Vector3();
          raycasterRef.current.ray.at(5, intersectionPoint); // Distance of 5 from camera

          // Update particle positions with hover effect
          const positionAttribute = particleGeometry.attributes.position;
          const positions = positionAttribute.array as Float32Array;

          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            const currentX = positions[i3];
            const currentY = positions[i3 + 1];
            const currentZ = positions[i3 + 2];

            const originalX = originalPositions[i3];
            const originalY = originalPositions[i3 + 1];
            const originalZ = originalPositions[i3 + 2];

            // Calculate distance from mouse position (in world space)
            const particleWorldPos = new THREE.Vector3(originalX, originalY, originalZ);
            particleWorldPos.applyMatrix4(particles.matrixWorld);

            const distance = particleWorldPos.distanceTo(intersectionPoint);

            if (distance < hoverRadius) {
              // Repel particle away from mouse
              const direction = new THREE.Vector3()
                .subVectors(particleWorldPos, intersectionPoint)
                .normalize();

              const repulsionForce = (1 - distance / hoverRadius) * repulsionStrength;

              positions[i3] = originalX + direction.x * repulsionForce;
              positions[i3 + 1] = originalY + direction.y * repulsionForce;
              positions[i3 + 2] = originalZ + direction.z * repulsionForce;
            } else {
              // Return to original position
              positions[i3] = THREE.MathUtils.lerp(currentX, originalX, returnSpeed);
              positions[i3 + 1] = THREE.MathUtils.lerp(currentY, originalY, returnSpeed);
              positions[i3 + 2] = THREE.MathUtils.lerp(currentZ, originalZ, returnSpeed);
            }
          }

          positionAttribute.needsUpdate = true;

          renderer.render(scene, camera);
        };

        animate();

        // Store cleanup function
        mouseCleanup = () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      },
      (progress) => {
        console.log("Loading progress:", (progress.loaded / progress.total) * 100 + "%");
      },
      (error) => {
        console.error("Error loading GLB model:", error);

        // Fallback to cube if model fails to load
        createFallbackCube();
      }
    );

    // Fallback cube function
    const createFallbackCube = () => {
      const cubeGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const cubeSize = 2;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * cubeSize;
        positions[i3 + 1] = (Math.random() - 0.5) * cubeSize;
        positions[i3 + 2] = (Math.random() - 0.5) * cubeSize;
      }

      cubeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xff00ff,
        size: 0.02,
        transparent: true,
        opacity: 0.8,
      });

      const particles = new THREE.Points(cubeGeometry, material);
      scene.add(particles);

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    };

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      // Clean up mouse events
      if (mouseCleanup) {
        mouseCleanup();
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "auto",
      }}
    />
  );
};

export default ThreeJSCanvas;
