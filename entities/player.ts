import { Scene } from "../module/scene"
import { Sprite } from "../module/sprite"

export class Player extends Sprite {
    constructor(scene: Scene) {
        super(scene, "", 0, 0)
        this.imgSrc = "/walk.png"
        this.redraw()
        this.scale = 8
        this.atlas =
        {
            x: 10, y: 9, w: 12, h: 14
        }

        // const idleAtlas = [
        //     {
        //         x: 10, y: 9, w: 12, h: 14
        //     },
        //     {
        //         x: 42, y: 9, w: 12, h: 14
        //     }
        // ]
        // this.addAnim("idle", idleAtlas)
        //
        // // this.imgSrc = "/walk.png"
        // const walkRightAtlas = [
        //     {
        //         x: 10, y: 41, w: 12, h: 14
        //     },
        //     {
        //         x: 42, y: 41, w: 12, h: 14
        //     },
        //     {
        //         x: 74, y: 41, w: 12, h: 14
        //     },
        //     {
        //         x: 106, y: 41, w: 12, h: 14
        //     }
        // ]
        // this.addAnim("walk", walkRightAtlas)
        //
        // this.playAnim("idle")
        this.input()
    }

    input() {
        const speed = 10

        window.addEventListener("keydown", (e) => {
            switch (e.code) {
                case 'KeyW':
                    this.y -= speed
                    break;
                case 'KeyS':
                    this.flip.x = -1
                    this.y += speed
                    break;
                case 'KeyA':
                    this.x -= speed
                    break;
                case 'KeyD':
                    this.flip.x = 1
                    this.x += speed
                    break;
            }
        })
    }
}
