import * as THREE from 'three'

// Для включения и выключения видимых осей и сетки
// dat.GUI требуется свойство, которое возвращает bool
// это checkbox мы сделали сеттер и геттер
// чтобы получить значение для `visible` от dat.GUI
export class AxisGridHelper {
  constructor(node, units = 10) {
    const axes = new THREE.AxesHelper()
    axes.material.depthTest = false
    axes.renderOrder = 2  // после сетки
    node.add(axes)

    const grid = new THREE.GridHelper(units, units)
    grid.material.depthTest = false
    grid.renderOrder = 1
    node.add(grid)

    this.grid = grid
    this.axes = axes
    this.visible = false
  }
  get visible() {
    return this._visible
  }
  set visible(v) {
    this._visible = v
    this.grid.visible = v
    this.axes.visible = v
  }
}