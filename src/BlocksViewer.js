import { Dialog, DialogTitle } from "@material-ui/core";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import React from "react";

class BlocksViewer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleEntered = this.handleEntered.bind(this);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  handleEntered() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.up.set(0, 0, 1);
    camera.position.set(5, 5, 5);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = true;

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = controls;

    this.mount.appendChild(renderer.domElement);
    this.start();
  }

  componentWillUnmount() {}

  start() {
    if (!this.frameId) {
      class Cube {
        constructor(value, scene) {
          const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
          const colors = [0xedc9af, 0x5d2906, 0x028a0f, 0x888c8d, 0x000000];
          const material = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random(1) * 5)],
          });
          const sprite = new THREE.Mesh(geometry, material);
          sprite.position.set(
            (value % 4) * 0.5 - 0.75,
            Math.floor((value % 16) / 4) * 0.5 - 0.75,
            Math.floor(value / 16) * 0.5 + 0.25
          );
          scene.add(sprite);
        }
      }

      const axesHelper = new THREE.AxesHelper(5);
      this.scene.add(axesHelper);

      for (let i = 0; i < 64; i++) {
        new Cube(i, this.scene);
      }

      const geometry = new THREE.PlaneGeometry(3, 3);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      });
      const floor = new THREE.Mesh(geometry, material);
      this.scene.add(floor);

      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  handleClose() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
    this.frameId = null;
    this.props.onClose();
  }

  animate() {
    this.controls.update();
    this.renderScene();
    this.frameId = requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <Dialog
        onClose={this.handleClose}
        onEntered={this.handleEntered}
        open={this.props.open}
      >
        <DialogTitle>Blocks</DialogTitle>
        <div
          style={{ width: "400px", height: "400px" }}
          ref={(mount) => {
            this.mount = mount;
          }}
        ></div>
      </Dialog>
    );
  }
}

export default BlocksViewer;
