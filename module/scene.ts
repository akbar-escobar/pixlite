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
    cellCount: number[]
    constructor({ width, height, debugMode = false }: sceneConfig) {
        this.canvas = document.createElement("canvas")
        this.canvas.style.backgroundColor = "#333333"
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
        this.cellCount = []

        this.update()
    }

    set children(child: Sprite | Text) {
        if (child instanceof Sprite) {
            this.cellN++
            this.cellSize = (this.width + this.height) / this.cellN
            this.cellCount.push(0)
        }
        this._children.push(child)
    }

    // TODO
    addCamera() {
        this.ctx?.translate(window.innerWidth / 2, window.innerHeight / 2)
    }

    update() {
        const loop = (nowTime: number) => {
            this._children.forEach(child => {
                if (child instanceof Sprite) {
                    this.spatialHashing(child)
                }

                child.update()
                child.render()
                child.prevUpdate(nowTime)
            })
            requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
    }

    spatialHashing(child: Sprite) {
        const cellXY = {
            x: Math.round(child.x / this.cellSize),
            y: Math.round(child.y / this.cellSize),
            color: child.hitboxColor
        }

        for (let y = 0; y < this.cellN; y++) {
            for (let x = 0; x < this.cellN; x++) {
                if (x === cellXY.x && y === cellXY.y) {
                    // still doesnt work
                    this.cellCount[y]++
                }
            }
        }
        // this.cellCount[i]

        // const hash = (xi * 92837111) ^ (yi * 689287499) ^ (zi * 283923481);
        console.log(this.cellCount)
        // this.cellN = this._children.length - 1
    }
}

type sceneConfig = {
    width: number,
    height: number,
    debugMode?: boolean
}


