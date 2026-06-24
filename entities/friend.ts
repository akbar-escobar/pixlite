import type { Scene } from "../module/scene";
import { Sprite } from "../module/sprite";

export class Friend extends Sprite {
    constructor(scene: Scene, w: number, h: number) {
        super(scene, "", w, h)
        this.imgSrc = "friend/walk.png"
        this.scale = 8
        this.atlas =
            [{
                x: 10, y: 9, w: 12, h: 14
            }]

        scene.create(this)
    }
}
