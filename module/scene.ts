import { Sprite } from "./sprite"
import type { Text } from "./text"

class Camera {
    zoom: number
    constructor() {
        this.zoom = 1
    }
}

export class Scene {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    camera: Camera
    debugMode: boolean
    width: number
    height: number

    _children: (Sprite | Text)[]
    cellN: number
    cellSize: number
    cellCountIndex: Map<number, number[]>
    private fps: number
    private lastTime: number
    constructor({ width, height, backgroundColor = "gray", debugMode = false }: sceneConfig) {
        this.canvas = document.createElement("canvas")
        this.canvas.style.backgroundColor = backgroundColor
        this.canvas.style.imageRendering = "pixelated"
        this.canvas.width = width
        this.canvas.height = height
        document.body.appendChild(this.canvas)

        this.ctx = this.canvas.getContext("2d")
        this.ctx!.imageSmoothingEnabled = false

        this.debugMode = debugMode

        this.camera = new Camera()

        this.width = width
        this.height = height

        this._children = []
        this.cellN = 0
        this.cellSize = 0
        this.cellCountIndex = new Map()

        this.fps = 1
        this.lastTime = 0

        this.update()
    }

    set children(child: Sprite | Text) {
        if (child instanceof Sprite) {
            this.cellN++
            this.cellSize = (this.width + this.height) / this.cellN
        }
        this._children.push(child)
    }

    // TODO
    addCamera() {
        this.ctx?.translate(window.innerWidth / 2, window.innerHeight / 2)
    }

    update() {
        const loop = (nowTime: number) => {
            const deltaTime = nowTime - this.lastTime
            if (deltaTime > this.fps) {

                this.ctx?.setTransform(1, 0, 0, 1, 0, 0)
                this.ctx?.clearRect(
                    0, 0,
                    this.width,
                    this.height
                )

                for (let y = 0; y < this.cellN; y++) {
                    for (let x = 0; x < this.cellN; x++) {
                        this.ctx!.fillStyle = "purple"
                        if ((x + y) % 2 === 0) this.ctx!.fillStyle = "orange"
                        this.ctx?.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize)
                    }
                }

                this._children.forEach((child, i) => {
                    this.lastTime = nowTime - (deltaTime % this.fps)

                    if (child instanceof Sprite) this.spatialHashing(child, i)
                    child.update(nowTime)
                })
                this.cellCountIndex.clear()
            }
            requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
    }

    spatialHashing(child: Sprite, i: number) {
        const cellXY = {
            x: Math.round(child.x / this.cellSize),
            y: Math.round(child.y / this.cellSize)
        }
        const key = (cellXY.y * this.cellN) + cellXY.x

        if (!this.cellCountIndex.has(key)) this.cellCountIndex.set(key, [])
        const childArr = this.cellCountIndex.get(key)!
        childArr.push(i)

        if (childArr.length > 1) {
            for (let a = 0; a < childArr.length; a++) {
                for (let b = a + 1; b < childArr.length; b++) {
                    const childA = this._children[childArr[a]] as Sprite
                    const childB = this._children[childArr[b]] as Sprite
                    if (
                        childA.x <= childB.x + childB.width &&
                        childA.x + childA.width >= childB.x &&
                        childA.y <= childB.y + childB.height &&
                        childA.y + childA.height >= childB.y
                    ) {
                        childA.hitboxColor = "red"
                        childB.hitboxColor = "red"
                    }
                }
            }
        }
    }
}

type sceneConfig = {
    width: number,
    height: number,
    backgroundColor?: string,
    debugMode?: boolean
}


