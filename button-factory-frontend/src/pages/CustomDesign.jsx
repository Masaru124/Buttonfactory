import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CustomDesign = () => {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#007bff');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(16);
  const [svgFillColor, setSvgFillColor] = useState('#000000');

  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const textMeshRef = useRef(null);
  const rendererRef = useRef(null);
  const frameIdRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 3);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      '/button.glb',
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Scale up the model
        model.scale.set(3, 3, 3);

        // Traverse model to set initial material color and log material type
        model.traverse((child) => {
          if (child.isMesh) {
            console.log('Material type:', child.material.type);
            child.material = child.material.clone();
            child.material.color.set(svgFillColor);
            child.material.needsUpdate = true;
          }
        });

        scene.add(model);

        addOrUpdateTextMesh(text, color, fontSize, scene);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      controls.update();
      renderer.render(scene, camera);
    };

    renderer.setClearColor(new THREE.Color(bgColor), 1);
    animate();

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      controls.dispose();
      renderer.dispose();
      currentMount.removeChild(renderer.domElement);
    };
  }, [bgColor, svgFillColor]);

  // Function to add or update 3D text mesh
  const addOrUpdateTextMesh = (text, color, fontSize, scene) => {
    if (textMeshRef.current) {
      scene.remove(textMeshRef.current);
      textMeshRef.current.geometry.dispose();
      textMeshRef.current.material.dispose();
      textMeshRef.current = null;
    }

    if (!text) return;

    // Create canvas for text texture
    const canvas = document.createElement('canvas');
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);
    ctx.font = `${fontSize * 10}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const geometry = new THREE.PlaneGeometry(1.5, 1.5);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0.8, 0);
    mesh.rotation.x = -0.3;

    scene.add(mesh);
    textMeshRef.current = mesh;
  };

  useEffect(() => {
    if (sceneRef.current) {
      addOrUpdateTextMesh(text, color, fontSize, sceneRef.current);
    }
  }, [text, color, fontSize]);

  // Update model color when svgFillColor changes
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(svgFillColor);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [svgFillColor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      'Custom design submitted: ' +
        JSON.stringify({ text, color, bgColor, fontSize, svgFillColor })
    );
    // TODO: Implement submission logic to backend or design preview
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Custom Design Tool</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="text">Button Text:</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="color">Text Color:</label>
          <input type="color" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="bgColor">Background Color:</label>
          <input
            type="color"
            id="bgColor"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="svgFillColor">Button Color:</label>
          <input
            type="color"
            id="svgFillColor"
            value={svgFillColor}
            onChange={(e) => setSvgFillColor(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="fontSize">Font Size (px):</label>
          <input
            type="number"
            id="fontSize"
            value={fontSize}
            min="8"
            max="72"
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Submit Design
        </button>
      </form>
      <div style={{ marginTop: '2rem' }}>
        <h2>Preview:</h2>
        <div
          ref={mountRef}
          style={{
            width: '400px',
            height: '400px',
            backgroundColor: bgColor,
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />
      </div>
    </div>
  );
};

export default CustomDesign;
