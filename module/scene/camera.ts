import { Scene } from "../scene";
import { Sprite } from "../sprite";

export class Camera {
    scene: Scene
    target?: Sprite
    center = { x: 0, y: 0 }
    offSet = { x: 0, y: 0 }
    constructor(scene: Scene) { this.scene = scene }

    ctx() {
        const { ctx } = this.scene

        if (!this.target) return
        const x = this.target.x + this.center.x + this.offSet.x
        const y = this.target.y + this.center.y + this.offSet.y

        ctx?.translate(-x, -y)
    }

    follow(sprite: Sprite) {
        this.target = sprite
        this.center = {
            x: -window.innerWidth / 2 + this.target.width / 2,
            y: -window.innerHeight / 2 + this.target.height / 2
        }
    }
}
