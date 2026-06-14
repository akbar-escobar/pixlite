class Camera {
    zoom: number
    constructor() {
        this.zoom = 1
    }
}

type sceneConfig = {
    width: number,
    height: number,
    debugMode?: boolean
}

export class Scene {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    img: HTMLImageElement
    camera: Camera
    debugMode: boolean
    constructor({ width, height, debugMode = false }: sceneConfig) {
        this.canvas = document.createElement("canvas")
        this.canvas.style.backgroundColor = "#333333"
        this.canvas.style.imageRendering = "pixelated"
        this.canvas.width = width
        this.canvas.height = height
        document.body.appendChild(this.canvas)

        this.ctx = this.canvas.getContext("2d")
        this.ctx!.imageSmoothingEnabled = false

        this.debugMode = debugMode

        this.camera = new Camera()
        this.img = new Image()
    }

    // TODO
    addCamera() {
        this.ctx?.translate(window.innerWidth / 2, window.innerHeight / 2)
    }

    update(callback: () => void) {
        const loop = () => {
            callback()
            requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
    }
}

export class GameObject {
    x: number
    y: number
    // width: number
    // height: number
    frame: { x: number, y: number, w: number, h: number }
    imgSrc: string
    scale: number

    private scene: Scene
    constructor(scene: Scene, imgSrc: string) {
        this.scene = scene
        scene.img.src = imgSrc

        this.x = 0
        this.y = 0
        this.scale = 1
        // this.width = scene.img.width * this.scale
        // this.height = scene.img.height * this.scale
        this.frame = {
            x: 0, y: 0,
            w: scene.img.width, h: scene.img.height
        }
        this.imgSrc = imgSrc

        this.redraw()
    }

    addImg(
        src: string, frame: {
            x: number, y: number, w: number, h: number
        }
    ) {
        this.imgSrc = src
        this.frame.x = frame.x
        this.frame.y = frame.y
        this.frame.w = frame.w
        this.frame.h = frame.h

        this.redraw()
    }

    redraw() {
        this.scene.img.src = this.imgSrc
        this.scene.ctx!.fillStyle = "hsla(0, 100%, 50%, 0.3)"
        let prevXY: { x: number, y: number }
        this.scene.img.onload = () => {
            this.scene.update(() => {
                if (prevXY === undefined) prevXY = { x: this.x, y: this.y }

                this.scene.ctx?.clearRect(
                    prevXY.x, prevXY.y,
                    this.frame.w * this.scale,
                    this.frame.h * this.scale
                )

                if (this.scene.debugMode) {
                    this.scene.ctx?.fillRect(
                        this.x, this.y,
                        this.frame.w * this.scale,
                        this.frame.h * this.scale
                    )
                }

                this.scene.ctx?.drawImage(
                    this.scene.img,
                    this.frame.x, this.frame.y,
                    this.frame.w, this.frame.h,
                    this.x, this.y,
                    this.frame.w * this.scale,
                    this.frame.h * this.scale
                )
                prevXY = { x: this.x, y: this.y }
            })
        }
    }

    animation(fps: number, imgAtlasArray: imgAtlas[]) {
        let i = 0
        let lastT = 0
        let interval = 1000 / fps

        const anim = (currentT: number) => {
            if (!this.scene.ctx) return

            if (i > imgAtlasArray.length - 1) i = 0
            this.scene.ctx.clearRect(0, 0, 100, 100) // TODO
            this.scene.ctx.drawImage(
                this.scene.img,
                imgAtlasArray[i].sX, imgAtlasArray[i].sY,
                imgAtlasArray[i].sW, imgAtlasArray[i].sH,
                imgAtlasArray[i].dX - (-this.x), imgAtlasArray[i].dY - (-this.y),
                imgAtlasArray[i].dW, imgAtlasArray[i].dH
            )

            const deltaT = currentT - lastT
            if (deltaT > interval) {
                i++
                lastT = currentT - (deltaT % interval)
            }

            requestAnimationFrame(anim)
        }

        this.scene.img.onload = () => {
            requestAnimationFrame(anim)
        }
    }
}

type imgAtlas = {
    sX: number, sY: number,
    sW: number, sH: number,
    dX: number, dY: number,
    dW: number, dH: number
}

