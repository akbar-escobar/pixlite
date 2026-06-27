import { Scene } from "./scene"

export class Sprite {
    x: number
    y: number
    atlas: atlas[]
    scale: number
    flip: { x: boolean, y: boolean }
    hitbox = false
    hitboxColor: string
    scene: Scene
    animArray: { key: string, imgSrc: string, atlasArray: atlas[] }[] = []

    private frameI = 0
    private animFps = 0
    private lastTime = 0

    private img: HTMLImageElement
    constructor(
        scene: Scene,
        imgSrc: string,
        x: number,
        y: number,
    ) {
        this.scene = scene
        this.img = new Image()
        this.img.src = imgSrc
        this.x = x
        this.y = y
        this.atlas = [{
            x: 0, y: 0,
            w: this.img.width,
            h: this.img.height
        }]
        this.scale = 1
        this.flip = { x: false, y: false }
        this.hitboxColor = "blue"
    }

    get width() {
        return this.atlas[0].w * this.scale
    }

    get height() {
        return this.atlas[0].h * this.scale
    }

    set imgSrc(src: string) {
        this.img.src = src

        this.atlas = [{
            x: 0, y: 0,
            w: this.img.width,
            h: this.img.height
        }]
    }

    ctxConfig() {
        this.scene.ctx?.save()
        this.scene.ctx!.fillStyle = this.hitboxColor

        this.scene.ctx?.translate(
            this.flip.x ? 2 * this.x + this.width : 0,
            this.flip.y ? 2 * this.y + this.height : 0
        )

        this.scene.ctx?.scale(
            this.flip.x ? -1 : 1,
            this.flip.y ? -1 : 1
        )
    }

    update(_nowTime: number) { }

    loop(nowTime: number) {
        this.ctxConfig()

        const deltaTime = nowTime - this.lastTime
        if (deltaTime > this.animFps) {
            this.lastTime = nowTime - (deltaTime % this.animFps)
            this.frameI < this.atlas.length - 1
                ? this.frameI++
                : this.frameI = 0
        }

        if (this.hitbox) {
            this.scene.ctx?.fillRect(
                this.x, this.y,
                this.width, this.height
            )
        }

        this.scene.ctx?.drawImage(
            this.img,
            this.atlas[this.frameI].x, this.atlas[this.frameI].y,
            this.atlas[this.frameI].w, this.atlas[this.frameI].h,
            this.x, this.y,
            this.width, this.height
        )

        this.scene.ctx?.restore()
    }

    addAnim(key: string, atlasArray: atlas[], imgSrc = this.img.src) {
        this.animArray.push({ key: key, atlasArray, imgSrc })
    }

    playAnim(key: string, fps = 0) {
        const anim = this.animArray.find(a => a.key === key)
        if (!anim) return
        this.imgSrc = anim.imgSrc

        this.atlas = anim.atlasArray

        this.animFps = fps === 0
            ? 1000 / anim.atlasArray.length
            : 100 / fps
    }

    isCollide(x: number, y: number) {
        if (
            x < this.x + this.width &&
            x + this.width > this.x &&
            y < this.y + this.height &&
            y + this.height > this.y
        ) {
            return true
        } else return false
    }
}

export type atlas = { x: number, y: number, w: number, h: number }
