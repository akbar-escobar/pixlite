import { Scene } from "../module/scene"
import { Sprite } from "../module/sprite"

export class Player extends Sprite {
    constructor(scene: Scene) {
        super(scene, "player/walk.png", 0, 0)
        this.scale = 8
        this.hitbox = true
        const walkRightAtlas = [
            {
                x: 10, y: 41, w: 12, h: 14
            },
            {
                x: 42, y: 41, w: 12, h: 14
            },
            {
                x: 74, y: 41, w: 12, h: 14
            },
            {
                x: 106, y: 41, w: 12, h: 14
            }
        ]
        this.addAnim("walk", walkRightAtlas)
        this.playAnim("walk")

        scene.input.event("keyboard", (e) => {
            console.log(e.key)
        })

        this.scene.create(this)
    }

    // update() {
    //     const speed = 5
    //
    //     if (this.scene.input.keyboard("KeyW")) {
    //         this.y -= speed
    //     }
    //     if (this.scene.input.keyboard("KeyS")) {
    //         this.y += speed
    //     }
    //     if (this.scene.input.keyboard("KeyA")) {
    //         this.x -= speed
    //         this.flip.x = true
    //     }
    //     if (this.scene.input.keyboard("KeyD")) {
    //         this.x += speed
    //         this.flip.x = false
    //     }
    // }
}
