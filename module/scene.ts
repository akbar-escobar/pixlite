class Camera {
    zoom: number
    constructor() {
        this.zoom = 1
    }
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

    update(callback: (now: number) => void) {
       const loop = (now: number) => {
            callback(now)
            requestAnimationFrame(loop)
        }
        requestAnimationFrame(loop)
    }
}

type sceneConfig = {
    width: number,
    height: number,
    debugMode?: boolean
}


