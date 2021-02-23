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
    this.camera.position.z = 2

    this.light = new THREE.DirectionalLight(0xFFFFFF, 1)
    this.light.position.set(-1, 2, 4)
    this.scene.add(this.light)

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    const cubeMaterial = new THREE.MeshLambertMaterial({color: 0x44aa88})
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    this.scene.add(this.cube)

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
    this.cube.rotation.x += 0.005
    this.cube.rotation.y += 0.005

    if (this.resizeRendererToDisplaySize())  {
      const canvas = this.renderer.domElement
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render())
  }
}

export default App
