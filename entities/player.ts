import { GameObject } from "../module/pixlite"
import { Scene } from "../module/pixlite"

export class Player extends GameObject {
    constructor(scene: Scene) {
        super(scene, "")
        // scene.addCamera(this)
        this.addImg("/idle.png", {
            x: 0, y: 0,
            w: 36, h: 36
        })
        this.scale = 8

        // const idleAtlas = [
        //     {
        //         sX: 6, sY: 6,
        //         sW: 16, sH: 16,
        //         dX: -8, dY: -6,
        //         dW: 32, dH: 32
        //     },
        //     {
        //         sX: 38, sY: 6,
        //         sW: 16, sH: 16,
        //         dX: -8, dY: -8,
        //         dW: 32, dH: 32
        //     }
        // ]

        // this.animation(5, idleAtlas)
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
                    this.x -= speed
                    break;
                case 'KeyD':
                    this.x += speed
                    break;
            }
        })
    }
}
