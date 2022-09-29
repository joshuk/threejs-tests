<template>
  <main class="theContent">
    <canvas ref="canvas"></canvas>
  </main>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
    this.canvas = this.$refs.canvas

    this.createScene()
    this.createObjects()

    // Update camera/renderer on resize
    window.addEventListener('resize', () => {
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight

      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(this.sizes.width, this.sizes.height)
    })

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
      // Set the screen size
      this.sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      // Create the floor of the alley
      this.floor = new THREE.Group()

      // Let's create the main box of it first
      const floorBox = new THREE.Mesh(
        new THREE.BoxGeometry(2, 6, 0.05),
        new THREE.MeshBasicMaterial({
          color: '#333'
        })
      )
      this.floor.add(floorBox)

      // Then add a flat plane to the top as a solid colour
      const floorPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 6),
        new THREE.MeshBasicMaterial({
          color: '#666'
        })
      )

      // Position it slightly above the top of the box
      floorPlane.position.z = 0.026
      this.floor.add(floorPlane)

      // Now rotate it so it's sitting flat
      this.floor.rotation.x = -(Math.PI / 2)

      // And add it to the scene
      this.scene.add(this.floor)

      // Now we wanna create the bowling pins
      // Each pin will be 0.25 units wide
      const pinBoxWidth = 0.25

      const pinMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(pinBoxWidth / 2, pinBoxWidth / 2, pinBoxWidth * 2.5, 12),
        new THREE.MeshBasicMaterial({
          color: '#fff'
        })
      )

      this.pins = []

      // Make a loop for each row
      for (let rowNumber = 4; rowNumber > 0; rowNumber--) {
        // Let's figure out the space on each side
        // To account for spacing, we basically need to have the space for all the pins, then the same space
        // between each pin. Since there's one less space than pin, we can just do (rowNumber * 2) - 1
        const totalPinSpace = pinBoxWidth * ((rowNumber * 2) - 1)

        // Now to get the space on each side, we just need to find the difference and half it
        const sideSpace = (2 - totalPinSpace) / 2

        // Now let's loop through each pin
        for (let pinNumber = 0; pinNumber < rowNumber; pinNumber++) {
          // Create a new pin
          const pin = pinMesh.clone()

          // Now position it properly on the board
          pin.position.x = 1 - (sideSpace + (pinBoxWidth * (2 * pinNumber))) - 0.125
          pin.position.y = pinBoxWidth + 0.05
          pin.position.z = 2.75 - (pinBoxWidth * ((4 - rowNumber) * 2))

          // Add it to the scene
          this.scene.add(pin)

          // And push it to the array
          this.pins.push(pin)
        }
      }

      // Now let's create the ball
      this.ball = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 32, 16),
        new THREE.MeshBasicMaterial({
          color: '#FF47A3'
        })
      )

      this.ball.position.y = 0.25 + 0.026
      this.ball.position.z = -2.33

      this.scene.add(this.ball)

      // Create the camera
      this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height)
      this.camera.position.y = 2.5
      this.camera.position.z = -4.5
      this.scene.add(this.camera)

      this.camera.lookAt(this.floor.position)

      // Create the controls
      const controls = new OrbitControls(this.camera, this.canvas)
      controls.target.y = -1
      controls.update()

      // Create the renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true
      })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    },
    animate() {
      // const elapsedTime = this.clock.getElapsedTime()


      // Render the scene
      this.renderer.render(this.scene, this.camera)

      // Animate
      if (this.isRunning) {
        requestAnimationFrame(this.animate)
      }
    }
  }
}
</script>
