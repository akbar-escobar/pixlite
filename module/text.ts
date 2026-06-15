import { Scene } from "./scene";

export class Text {
    x: number
    y: number
    size: number
    color: string
    text: string

    private scene: Scene
    private lastTime: number
    private fps: number
    constructor(scene: Scene, text: string) {
        this.scene = scene
        this.lastTime = 0
        this.fps = 60

        this.x = window.innerWidth / 1.5
        this.y = window.innerHeight / 7
        this.size = 100
        this.color = "orange"
        this.text = text

        scene.ctx!.font = `${this.size}px Arial`
        scene.children.push(this)
    }

    update() { }

    prevUpdate(nowTime: number) {
        const deltaTime = nowTime - this.lastTime
        if (deltaTime > this.fps) {
            this.lastTime = nowTime - (deltaTime % this.fps)
            const frame= deltaTime > 0 ? Math.round(1000 / deltaTime) : 0;

            this.text = frame.toString()
        }
    }

    render() {
        this.scene.ctx?.clearRect(0, 0, this.scene.canvas.width, this.scene.canvas.height)
        this.scene.ctx?.fillText(this.text, this.x, this.y)
    }
}
