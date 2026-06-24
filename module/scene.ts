import { Collision } from "./scene/collision"
import { Update } from "./scene/update"
import { Sprite } from "./sprite"
import type { Text } from "./text"

export class Scene {
    canvas = document.createElement("canvas")
    ctx = this.canvas.getContext("2d")
    _children: (Sprite | Text)[] = []

    debugMode: boolean
    width: number
    height: number

    collision = new Collision(this)
    update = new Update(this, this.collision)
    constructor({ width, height, backgroundColor = "gray", debugMode = false }: sceneConfig) {
        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.backgroundColor = backgroundColor
        this.debugMode = debugMode
        this.width = width
        this.height = height

        this.canvas.style.imageRendering = "pixelated"
        document.body.appendChild(this.canvas)
        this.ctx!.imageSmoothingEnabled = false

        this.update.loop()
    }

    create(child: Sprite | Text) {
        if (child instanceof Sprite) {
            if (child.hitbox) this.collision.cellN++
            this.collision.cellSize = (this.width + this.height) / this.collision.cellN
        }
        this._children.push(child)
    }
}

type sceneConfig = {
    width: number,
    height: number,
    backgroundColor?: string,
    debugMode?: boolean
}
