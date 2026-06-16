import type { Scene } from "../module/scene";
import { Sprite } from "../module/sprite";

export class Enemy extends Sprite {
    constructor(scene: Scene, w: number, h: number, color: string) {
        super(scene, "", w, h)
        this.imgSrc = "enemy/walk.png"
        this.scale = 8
        this.atlas =
            [{
                x: 10, y: 9, w: 12, h: 14
            }]
        this.hitbox = true
        this.hitboxColor = color
    }
}
