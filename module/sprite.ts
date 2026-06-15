import { Scene } from "./scene"

export class Sprite {
    x: number
    y: number
    atlas: atlas[]
    scale: number
    flip: { x: boolean, y: boolean }

    private animArray: { key: string, imgSrc: string, atlasArray: atlas[] }[]
    private prevXY: { x: number, y: number }
    private animFps: number
    private lastTime: number
    private frameI: number
    private scene: Scene
    constructor(
        scene: Scene,
        imgSrc: string,
        x: number,
        y: number,
    ) {
        this.scene = scene
        scene.img.src = imgSrc
        this.animArray = []
        this.frameI = 0
        this.animFps = 0
        this.lastTime = 0
        this.prevXY = { x: x, y: y }

        this.x = x
        this.y = y
        this.atlas = [{
            x: 0, y: 0,
            w: this.scene.img.width,
            h: this.scene.img.height
        }]
        this.scale = 1
        this.flip = { x: false, y: false }

        scene.children.push(this)
    }

    get width() {
        return this.atlas[0].w * this.scale
    }

    get height() {
        return this.atlas[0].h * this.scale
    }

    set imgSrc(src: string) {
        this.scene.img.src = src

        this.atlas = [{
            x: 0, y: 0,
            w: this.scene.img.width,
            h: this.scene.img.height
        }]
    }

    update() {
        this.scene.ctx?.save()

        this.scene.ctx?.translate(
            this.flip.x ? 2 * this.x + this.width : 0,
            this.flip.y ? 2 * this.y + this.height : 0
        )

        this.scene.ctx?.scale(
            this.flip.x ? -1 : 1,
            this.flip.y ? -1 : 1
        )
    }

    prevUpdate(nowTime: number) {
        this.prevXY = { x: this.x, y: this.y }

        const deltaTime = nowTime - this.lastTime
        if (deltaTime > this.animFps) {
            this.lastTime = nowTime - (deltaTime % this.animFps)
            this.frameI < this.atlas.length - 1
                ? this.frameI++
                : this.frameI = 0
        }

        this.scene.ctx?.restore()
    }

    render() {
        this.scene.ctx?.clearRect(
            this.prevXY.x, this.prevXY.y,
            this.width, this.height
        )

        if (this.scene.debugMode) {
            this.scene.ctx?.fillRect(
                this.x, this.y,
                this.width, this.height
            )
        }

        this.scene.ctx?.drawImage(
            this.scene.img,
            this.atlas[this.frameI].x, this.atlas[this.frameI].y,
            this.atlas[this.frameI].w, this.atlas[this.frameI].h,
            this.x, this.y,
            this.width, this.height
        )
    }

    addAnim(key: string, atlasArray: atlas[], imgSrc = this.imgSrc) {
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
}

export type atlas = { x: number, y: number, w: number, h: number }
