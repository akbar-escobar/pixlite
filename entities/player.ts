import { Scene } from "../module/scene"
import { Sprite } from "../module/sprite"

export class Player extends Sprite {
    constructor(scene: Scene) {
        super(scene, "player/walk.png", 0, 0)
        // or if you want to change the img 
        // this.imgSrc = "player/walk.png"
        // this is img atlas
        // this.atlas =
        //     [{
        //         x: 10, y: 9, w: 12, h: 14
        //     }]
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

        scene.create(this)
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
