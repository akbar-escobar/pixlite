import { Scene } from "../module/scene"
import { Sprite } from "../module/sprite"

export class Player extends Sprite {
    constructor(scene: Scene) {
        super(scene, "", 0, 0)
        this.imgSrc = "/walk.png"
        this.scale = 8
        // console.log(this.imgSrc)
        this.atlas =
            [{
                x: 10, y: 9, w: 12, h: 14
            }]
        // const idleAtlas = [
        //     {
        //         x: 10, y: 9, w: 12, h: 14
        //     },
        //     {
        //         x: 42, y: 9, w: 12, h: 14
        //     }
        // ]
        // this.addAnim("idle", idleAtlas)
        
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
        this.addAnim("walk", walkRightAtlas, "/walk.png")
        this.playAnim("walk")

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
                    this.y += speed
                    break;
                case 'KeyA':
                    this.flip.x = true
                    this.x -= speed
                    break;
                case 'KeyD':
                    this.flip.x = false
                    this.x += speed
                    break;
            }
        })
    }
}
