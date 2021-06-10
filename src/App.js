import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = true;

    class Cube {
      constructor(value) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const colors = [0x00ff00, 0xff0000, 0x0000ff, 0xfff0ff];
        const material = new THREE.MeshBasicMaterial({
          color: colors[Math.floor(value / 16)],
          wireframe: true,
        });
        const sprite = new THREE.Mesh(geometry, material);
        sprite.position.set(
          (value % 4) * 0.5,
          Math.floor((value % 16) / 4) * 0.5,
          Math.floor(value / 16) * 0.5
        );
        scene.add(sprite);
        // [[0,0,0],[1,0,0],[2,0,0],[3,0,0]]
      }
    }

    for (let i = 0; i < 64; i++) {
      new Cube(i);
    }
    camera.position.set(1, -5, 5);
    camera.lookAt(new THREE.Vector3(1, 1, 1));

    function animate() {
      controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
