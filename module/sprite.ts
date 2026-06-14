import { Scene } from "./scene"

export class Sprite {
    x: number
    y: number
    atlas: atlas
    imgSrc: string
    scale: number
    flip: { x: number, y: number }

    private animArray: { key: string, imgSrc: string, atlasArray: atlas[] }[]
    private prevAnimKey: string
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
        this.prevAnimKey = ""

        this.x = x
        this.y = y
        this.scale = 1
        this.atlas = {
            x: 0, y: 0,
            w: scene.img.width, h: scene.img.height
        }
        this.imgSrc = imgSrc
        this.flip = { x: 1, y: 1 }

        this.redraw()
    }

    ctxConfig() {
        this.scene.ctx?.scale(this.flip.x, this.flip.y)
        this.scene.ctx!.fillStyle = "hsla(0, 100%, 50%, 0.3)"
    }

    redraw(
        callback: (now: number) => void = () => { }
    ) {
        this.scene.img.src = this.imgSrc
        let prevXY: { x: number, y: number }

        this.scene.ctx?.clearRect(
            this.x, this.y,
            this.scene.canvas.width,
            this.scene.canvas.height
        )

        this.scene.img.onload = () => {
            this.scene.update((now) => {
                this.ctxConfig()

                if (prevXY === undefined) prevXY = { x: this.x, y: this.y }

                this.scene.ctx?.clearRect(
                    prevXY.x, prevXY.y,
                    // this.scene.canvas.width, this.scene.canvas.height
                    this.atlas.w * this.scale,
                    this.atlas.h * this.scale
                )

                if (this.scene.debugMode) {
                    this.scene.ctx?.fillRect(
                        this.x, this.y,
                        this.atlas.w * this.scale,
                        this.atlas.h * this.scale
                    )
                }

                callback(now)

                this.scene.ctx?.drawImage(
                    this.scene.img,
                    this.atlas.x, this.atlas.y,
                    this.atlas.w, this.atlas.h,
                    this.x, this.y,
                    this.atlas.w * this.scale,
                    this.atlas.h * this.scale
                )
                prevXY = { x: this.x, y: this.y }
            })
        }
    }

    addAnim(key: string, atlasArray: atlas[]) {
        this.animArray.push({ key: key, imgSrc: this.imgSrc, atlasArray })
    }

    playAnim(key: string, fps = 0) {
        const anim = this.animArray.find(a => a.key === key)
        if (!anim) return
        this.imgSrc = anim.imgSrc

        const frame = fps === 0 ? anim.atlasArray.length : fps
        let i = 0
        let lastT = 0
        let interval = 1000 / frame

        if (this.prevAnimKey !== key) {
            this.redraw((now) => {
                if (i > anim.atlasArray.length - 1) i = 0
                this.atlas = {
                    x: anim.atlasArray[i].x, y: anim.atlasArray[i].y,
                    w: anim.atlasArray[i].w, h: anim.atlasArray[i].h
                }

                const deltaT = now - lastT
                if (deltaT > interval) {
                    i++
                    lastT = now - (deltaT % interval)
                }
            })
        }
        this.prevAnimKey = key
    }
}

export type atlas = { x: number, y: number, w: number, h: number }
