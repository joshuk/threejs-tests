<template>
  <main class="theContent">
    <canvas ref="canvas"></canvas>
  </main>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { gsap } from 'gsap'

import { transitions } from '~/mixins/transitions'

export default {
  name: 'PageTwo',
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

    // Handle mouse movement
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
    
    // Handle any click events
    this.canvas.addEventListener('click', this.handleClick)

    this.animate()
  },
  methods: {
    createScene() {
      // Create the scene
      this.scene = new THREE.Scene()

      // Create mouse vector
      this.mouse = new THREE.Vector2()

      // Create raycaster
      this.raycaster = new THREE.Raycaster()

      // Create GLTF loader
      this.gltfLoader = new GLTFLoader()

      // Create clock
      this.clock = new THREE.Clock()
    },
    createObjects() {
      // Set the screen size
      this.sizes = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      /*
       * Create chess board
       */
      this.board = new THREE.Group()

      // Define the colours for each square [black, white]
      const boardColours = ['#dddddd', '#333333']

      // Define the meshes array to be used later
      this.meshes = []

      // Create a big square that will act as the bottom of the board
      const boardBottom = new THREE.Mesh(
        new THREE.BoxGeometry(8, 8, 0.05),
        new THREE.MeshBasicMaterial({
          color: '#999999'
        })
      )
      this.board.add(boardBottom)

      // Loop through each row
      for (let i = 0; i < 8; i++) {
        const squarePositionY = -3.5 + i

        // Now loop through each column
        for (let j = 0; j < 8; j++) {
          const squarePositionX = -3.5 + j

          // This may look like a bit of a mess, but it's just to get the correct colour for each square
          // based on where the square is positioned on the board
          const squareColour = boardColours[((j % 2) + i % 2) % 2]

          // Here we can create each square on the chess board
          const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.MeshBasicMaterial({
              color: squareColour
            })
          )

          // Position it properly
          mesh.position.x = squarePositionX
          mesh.position.y = squarePositionY
          mesh.position.z = 0.026

          // Then add it to both the board, and the meshes array to check for intersections later
          this.meshes.push(mesh)
          this.board.add(mesh)
        }
      }

      // Now rotate the board into place so it's flat
      this.board.rotation.x = -(Math.PI / 2)

      // Add the board to the scene
      this.scene.add(this.board)

      /*
       * Import chess piece
       */
      this.gltfLoader.load('/models/chess.gltf', (model) => {
        this.chessPiece = model.scene

        // Create the material
        const material = new THREE.MeshBasicMaterial({
          color: '#FF47A3'
        })

        // Now add the material to every mesh in the model
        this.chessPiece.traverse((object) => {
          if (!object.isMesh) {
            return
          }

          object.material = material
        })

        // Now just reposition it so it looks right on the board
        this.chessPiece.scale.x = 0.05
        this.chessPiece.scale.y = 0.05
        this.chessPiece.scale.z = 0.05

        this.chessPiece.rotation.x = Math.PI / 2
        this.chessPiece.rotation.y = Math.PI / 2

        this.chessPiece.rotation.reorder('ZXY')

        this.chessPiece.position.x = 0.5
        this.chessPiece.position.y = -3.5
        this.chessPiece.position.z = 1

        const axesHelper = new THREE.AxesHelper(4)
        this.chessPiece.add(axesHelper)

        // And add it to the group
        this.board.add(this.chessPiece)
      })

      // Create the camera
      this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height)
      this.camera.position.z = 8
      this.camera.position.y = 4

      this.scene.add(this.camera)

      // Create the controls
      const controls = new OrbitControls(this.camera, this.canvas)
      controls.target.y = 1
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
      // Setup the raycaster to find which objects we're hovering over
      this.raycaster.setFromCamera(this.mouse, this.camera)
      const intersects = this.raycaster.intersectObjects(this.meshes)

      // Detect any intersections
      const intersectingMesh = intersects[0]

      // Set the selectedMesh to null at first, we'll update this later
      this.selectedMesh = null

      // Now loop over each object
      this.meshes.forEach((meshObject) => {
        // If this object doesn't have the originalColor set, set it here
        if (!meshObject.material.originalColor) {
          meshObject.material.originalColor = meshObject.material.color.getHex()
        }

        // Now, if the object is being intersected change it's colour, otherwise set it back to how it was
        if (intersectingMesh && intersectingMesh.object === meshObject) {
          meshObject.material.color.set('#ff0000')

          // Then set the selectedMesh to the currently hovered one
          this.selectedMesh = meshObject
        } else {
          meshObject.material.color.set(meshObject.material.originalColor)
        }
      })

      // Then we can set the cursor to be a pointer if the user is hovering over a space
      if (intersectingMesh) {
        this.canvas.style.cursor = 'pointer'
      } else {
        this.canvas.style.cursor = 'default'
      }

      // Render the scene
      this.renderer.render(this.scene, this.camera)

      // Animate
      if (this.isRunning) {
        requestAnimationFrame(this.animate)
      }
    },
    handleClick() {
      // Nothing's selected, fuck off
      if (!this.selectedMesh) {
        return
      }

      // Setup all the points into an object
      const points = {
        one: {
          x: this.chessPiece.position.x + 1,
          y: -this.chessPiece.position.y
        },
        two: {
          x: this.chessPiece.position.x,
          y: -this.chessPiece.position.y
        },
        three: {
          x: this.selectedMesh.position.x,
          y: -this.selectedMesh.position.y
        }
      }

      // Calculate the angle that the piece is going to move in. Point one is the original direction of the
      // piece, point two is the current location of the piece _before_ moving, point three is where the
      // piece is going to move to (the location of the selectedMesh)
      const angle = Math.atan2(points.three.y - points.one.y, points.three.x - points.one.x) -
                    Math.atan2(points.two.y - points.one.y, points.two.x - points.one.x)

      // Create a timeline to animate on to
      const timeline = gsap.timeline()

      // Now we can rotate the piece to face the direction that it'll be moving
      // For whatever reason the angle we calculate is both facing the wrong way _and_ off by 90 degrees
      // So we can multiply it by -1 and add on the radian equivelant of 90 degrees to fix that
      this.chessPiece.rotation.z = (angle * -1) + (Math.PI / 2)
      this.chessPiece.rotation.y = Math.PI / 2

      // Now let's find how far the piece is going to be moving, as it'll show a different animation if it's
      // close
      const distance = Math.round(this.getDistanceBetweenMeshes(this.selectedMesh, this.chessPiece))
      const duration = (distance / 3)

      const originalRotation = this.chessPiece.rotation.x
      
      if (distance < 3) {
        // We're only moving 2 spaces or less, so let's just scoot it over
        timeline.to(this.chessPiece.position, {
          duration,
          x: this.selectedMesh.position.x,
          y: this.selectedMesh.position.y
        })

        // Then do a little bit of rotation
        timeline.to(this.chessPiece.rotation, {
          duration: duration / 3,
          x: originalRotation + (Math.PI / 16)
        }, '<')
        timeline.to(this.chessPiece.rotation, {
          duration: duration / 3,
          x: originalRotation
        }, `-=${duration / 3}`)
      } else {
        // So since we're moving a further distance, we're gonna actually pick up the piece and move it
        gsap.to(this.chessPiece.position, {
          duration,
          x: this.selectedMesh.position.x,
          y: this.selectedMesh.position.y
        })

        // While that's happening, we can rotate it backwards a bit
        timeline.to(this.chessPiece.rotation, {
          duration: duration / 4,
          x: originalRotation - (Math.PI / 14)
        })

        // And move it up into the air
        timeline.to(this.chessPiece.position, {
          duration: duration / 4,
          z: Math.max(.25 * distance, 1.5),
          ease: 'power1.out'
        }, '<')

        // Now bring it back down again
        timeline.to(this.chessPiece.position, {
          duration: duration / 4,
          z: 1,
          ease: 'power1.in'
        })

        // And swing it round to the other side
        timeline.to(this.chessPiece.rotation, {
          duration: duration / 3,
          x: originalRotation + (Math.PI / 14)
        }, '<')

        // Then we can rotate it back to how it was
        timeline.to(this.chessPiece.rotation, {
          duration: duration / 3,
          x: originalRotation
        })
      }
    },
    getDistanceBetweenMeshes(meshOne, meshTwo) {
      // https://davidburgos.blog/how-to-calculate-the-distance-between-2-meshes-in-threejs/
      const dx = meshOne.position.x - meshTwo.position.x
      const dy = meshOne.position.y - meshTwo.position.y
      const dz = meshOne.position.z - meshTwo.position.z

      return Math.sqrt(dx*dx + dy*dy + dz*dz)
    }
  }
}
</script>
