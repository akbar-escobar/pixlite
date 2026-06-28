import { Collision } from "./scene/collision"
import { Update } from "./scene/update"
import { Sprite } from "./sprite"
import type { Text } from "./text"
import { Input } from "./scene/input"
import { Camera } from "./scene/camera"

export class Scene {
    canvas = document.createElement("canvas")
    ctx = this.canvas.getContext("2d")
    children: (Sprite | Text)[] = []

    debugMode: boolean
    width: number
    height: number

    input = new Input()
    camera = new Camera(this)
    collision = new Collision(this)
    update = new Update(this, this.collision, this.camera)
    constructor({ width, height, backgroundColor = "gray", debugMode = false }: sceneConfig) {
        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.backgroundColor = backgroundColor
        this.debugMode = debugMode
        this.width = width
        this.height = height

        this.canvas.style.imageRendering = "pixelated"
        this.ctx!.imageSmoothingEnabled = false
        document.body.appendChild(this.canvas)
        document.body.style.margin = "0px"
        document.body.style.padding = "0px"
        document.body.style.overflow = "hidden"

        this.update.loop()
    }

    create(child: Sprite | Text) {
        if (child instanceof Sprite) {
            if (child.hitbox) {
                this.collision.cellN += 1
                const size = (child.width + child.height) * 2
                if (size > this.collision.cellSize) {
                    this.collision.cellSize = size
                }
            }
        }
        this.children.push(child)
    }
}

type sceneConfig = {
    width: number,
    height: number,
    backgroundColor?: string,
    debugMode?: boolean
}
