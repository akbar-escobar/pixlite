import { Scene } from "../scene"
import { Sprite } from "../sprite"
import { Collision } from "./collision"
import { Input } from "./input"

export class Update {
    fps = 1
    lastTime = 0

    scene: Scene
    collision: Collision
    input: Input
    constructor(scene: Scene, collision: Collision, input: Input) {
        this.scene = scene
        this.collision = collision
        this.input = input
    }

    loop() {
        const loop = (nowTime: number) => {
            const deltaTime = nowTime - this.lastTime
            if (deltaTime > this.fps) {
                this.lastTime = nowTime - (deltaTime % this.fps)

                this.ctx()
                this.debug()
                this.children(nowTime)

                this.collision.cellCountIndex.clear()
            }
            requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
    }

    ctx() {
        const { ctx, width, height } = this.scene

        ctx?.setTransform(1, 0, 0, 1, 0, 0)
        ctx?.clearRect(
            0, 0,
            width,
            height
        )
    }

    children(nowTime: number) {
        const { children } = this.scene

        children.forEach((child, i) => {
            if (child instanceof Sprite) {
                if (child.hitbox) this.collision.spatialCheck(child, i)
                child.update(nowTime)
            }
            child.loop(nowTime)
        })
    }

    debug() {
        const { ctx } = this.scene
        const { cellN, cellSize } = this.collision

        // debug spatialHashing
        for (let y = 0; y < cellN; y++) {
            for (let x = 0; x < cellN; x++) {
                ctx!.fillStyle = "purple"
                if ((x + y) % 2 === 0) ctx!.fillStyle = "orange"
                ctx?.fillRect(
                    x * cellSize / 2,
                    y * cellSize / 2,
                    cellSize / 2,
                    cellSize / 2
                )
            }
        }
    }
}
