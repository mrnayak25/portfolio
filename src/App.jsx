
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Player } from '@lottiefiles/react-lottie-player';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const spheresRef = useRef([]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize and manage Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x050510);
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 5;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0x4e00ff, 1);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);
    
    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Create floating spheres
    const createSpheres = () => {
      const spheres = [];
      for (let i = 0; i < 15; i++) {
        const geometry = new THREE.SphereGeometry(
          Math.random() * 0.3 + 0.1, 
          32, 
          32
        );
        
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(
            Math.random() * 0.2 + 0.4, 
            Math.random() * 0.2, 
            Math.random() * 0.2 + 0.8
          ),
          roughness: 0.2,
          metalness: 0.8
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        
        // Position randomly
        sphere.position.x = (Math.random() - 0.5) * 10;
        sphere.position.y = (Math.random() - 0.5) * 10;
        sphere.position.z = (Math.random() - 0.5) * 10;
        
        // Add random movement properties
        sphere.velocity = {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        };
        
        scene.add(sphere);
        spheres.push(sphere);
      }
      return spheres;
    };
    
    spheresRef.current = createSpheres();
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Move and rotate spheres
      spheresRef.current.forEach(sphere => {
        sphere.position.x += sphere.velocity.x;
        sphere.position.y += sphere.velocity.y;
        sphere.position.z += sphere.velocity.z;
        
        // Bounce off invisible boundaries
        if (Math.abs(sphere.position.x) > 5) sphere.velocity.x *= -1;
        if (Math.abs(sphere.position.y) > 5) sphere.velocity.y *= -1;
        if (Math.abs(sphere.position.z) > 5) sphere.velocity.z *= -1;
        
        // Add jitter effect
        sphere.position.x += (Math.random() - 0.5) * 0.005;
        sphere.position.y += (Math.random() - 0.5) * 0.005;
        sphere.position.z += (Math.random() - 0.5) * 0.005;
        
        // Rotate sphere
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.005;
      });
      
      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Dispose of scene resources
      if (spheresRef.current) {
        spheresRef.current.forEach(sphere => {
          sphere.geometry.dispose();
          sphere.material.dispose();
          sceneRef.current.remove(sphere);
        });
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="app">
      <canvas 
        ref={canvasRef} 
        className="background-canvas" 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          pointerEvents: 'none',
          opacity: Math.max(0.4, 1 - (scrollY / 1000))
        }}
      />
      <Navbar />
      <Hero scrollY={scrollY} />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
