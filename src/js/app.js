import * as THREE from 'three'

const FOV = 75;
const NEAR = 0.1;
const FAR = 1000;

class App {
  init () {
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#canvas')
    })

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x333333)

    const aspect = window.innerWidth / window.innerHeight
    this.camera = new THREE.PerspectiveCamera(FOV, aspect, NEAR, FAR)
    this.camera.position.z = 10

    this.light = new THREE.DirectionalLight(0xFFFFFF, 1)
    this.light.position.set(-1, 2, 4)
    this.scene.add(this.light)

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cubeMaterial = new THREE.MeshLambertMaterial({color: 0x44aa88})
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    this.cube.position.set(-4, -3, -10)
    this.scene.add(this.cube)

    const sphereGeometry = new THREE.CircleGeometry(1, 100, 100)
    const sphereMaterial = new THREE.MeshLambertMaterial({color: 0xff4343})
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    this.sphere.position.set(4, 3, 0)
    this.scene.add(this.sphere)

    this.direct = new THREE.Vector3()

    this.cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial)
    this.scene.add(this.cube2)

    this.angle = 0

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.render()
  }

  resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = canvas.clientWidth * pixelRatio | 0
    const height = canvas.clientHeight * pixelRatio | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      this.renderer.setSize(width, height, false)
    }
    return needResize
  }

  render () {
    if (this.resizeRendererToDisplaySize())  {
      const canvas = this.renderer.domElement
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }

    const distance = this.cube.position.distanceToSquared(this.sphere.position)

    if (distance > 0.001) {
      this.sphere.position.y += -0.04
      this.direct.subVectors(this.sphere.position, this.cube.position)
      this.direct.setLength(0.1)
      this.cube.position.add(this.direct)

      this.angle += 0.2
      this.cube2.position.x = this.sphere.position.x + 2 * Math.sin(this.angle)
      this.cube2.position.y = this.sphere.position.y + 2 * Math.cos(this.angle)
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render())
  }
}

export default App
