<template>
  <main class="theContent">
    <canvas ref="canvas"></canvas>

    <Controls @onStop="stopAnimation" @onPlay="playAnimation" />
  </main>
</template>

<script>
import * as THREE from 'three'

import { transitions } from '~/mixins/transitions'

export default {
  name: 'PageOne',
  mixins: [
    transitions,
  ],
  data() {
    return {
      isRunning: true
    }
  },
  mounted() {
    this.createScene()
    this.createObjects()
    this.animate()
  },
  methods: {
    createScene() {
      // Create the scene
      this.scene = new THREE.Scene()
      
      // Create clock
      this.clock = new THREE.Clock()
    },
    createObjects() {
      const canvas = this.$refs.canvas

      // Set the screen size
      this.sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      // Create a cube
      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
          color: '#ff0000'
        })
      )

      // Create the camera
      this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height)
      this.camera.position.z = 3
      this.scene.add(this.camera)

      // Add the cube to the scene
      this.scene.add(this.cube)

      // Create the renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas
      })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      // Update camera/renderer on resize
      window.addEventListener('resize', () => {
        this.sizes.width = window.innerWidth
        this.sizes.height = window.innerHeight

        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.sizes.width, this.sizes.height)
      })
    },
    animate() {
      const elapsedTime = this.clock.getElapsedTime()

      // Reposition/rotate the cube
      this.cube.position.y = 1 * Math.sin(elapsedTime * 2)
      this.cube.rotation.x = Math.PI * Math.sin(elapsedTime * 2)

      // Move the camera
      this.camera.position.x = 1 * Math.sin(elapsedTime)
      this.camera.lookAt(this.cube.position)

      // Render the scene
      this.renderer.render(this.scene, this.camera)

      // Animate
      if (this.isRunning) {
        requestAnimationFrame(this.animate)
      }
    },
    
    // Controls
    stopAnimation() {
      this.clock.stop()

      this.isRunning = false
    },
    playAnimation() {
      this.clock.start()

      this.isRunning = true
      this.animate()
    }
  }
}
</script>
