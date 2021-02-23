import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'
import { AxisGridHelper } from './axes-grid-helper'

import sunTexture from '../images/sun-texture.jpeg'
import earthTexture from '../images/earth-texture.jpeg'
import moonTexture from '../images/moon-texture.jpg'

const FOV = 40
const NEAR = 0.1
const FAR = 1000

class App {
  constructor() {
    this.objects = []
    this.gui = new GUI()
    this.loader = new THREE.TextureLoader()
  }

  init () {
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#canvas')
    })

    const aspect = window.innerWidth / window.innerHeight
    this.camera = new THREE.PerspectiveCamera(FOV, aspect, NEAR, FAR)
    this.camera.position.set(0, 50, 0)
    this.camera.up.set(0, 0, 1)
    this.camera.lookAt(0, 0, 0)

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x333333)

    const sphereGeometry = new THREE.SphereGeometry(1, 100, 100)

    const solarSystem = new THREE.Object3D()
    this.scene.add(solarSystem)
    this.objects.push(solarSystem)

    const sunMesh = new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshBasicMaterial({
        map: this.loader.load(sunTexture)
      })
    )
    sunMesh.scale.set(5, 5, 5)
    sunMesh.rotation.x = Math.PI / 2
    solarSystem.add(sunMesh)
    this.objects.push(sunMesh)

    const earthOrbit = new THREE.Object3D()
    earthOrbit.position.x = 10
    solarSystem.add(earthOrbit)
    this.objects.push(earthOrbit)

    const earthMesh = new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshBasicMaterial({
        map: this.loader.load(earthTexture)
      })
    )
    earthOrbit.add(earthMesh)
    this.objects.push(earthMesh)

    const moonOrbit = new THREE.Object3D()
    moonOrbit.position.x = 2
    earthOrbit.add(moonOrbit)

    const moonMesh = new THREE.Mesh(
      sphereGeometry,
      new THREE.MeshBasicMaterial({
        map: this.loader.load(moonTexture)
      })
    )
    moonMesh.scale.set(.5, .5, .5)
    moonOrbit.add(moonMesh)
    this.objects.push(moonMesh)

    const makeAxisGrid = (node, label, units) => {
      const helper = new AxisGridHelper(node, units)
      this.gui.add(helper, 'visible').name(label)
    }

    makeAxisGrid(solarSystem, 'solarSystem', 26)
    makeAxisGrid(sunMesh, 'sunMesh')
    makeAxisGrid(earthOrbit, 'earthOrbit')
    makeAxisGrid(earthMesh, 'earthMesh')
    makeAxisGrid(moonOrbit, 'moonOrbit')
    makeAxisGrid(moonMesh, 'moonMesh')

    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    new OrbitControls(this.camera, this.renderer.domElement)
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

    this.objects.forEach((obj) => {
      obj.rotation.y += 0.005
    })

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => this.render())
  }
}

export default App
