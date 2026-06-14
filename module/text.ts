import { Scene } from "./scene";

export class Text {
    x: number
    y: number
    size: number
    color: string
    text: string

    private scene: Scene
    constructor(scene: Scene, text: string) {
        this.scene = scene

        this.x = window.innerWidth / 1.5
        this.y = window.innerHeight / 7
        this.size = 100
        this.color = "orange"
        this.text = text

        this.reText()
    }

    debugMode() {
        let last = 0
        this.scene.update((now) => {
            if (!last) last = now;
            const deltaTime = now - last;
            last = now;
            const fps = deltaTime > 0 ? Math.round(1000 / deltaTime) : 0;

            this.text = fps.toString()
            this.reText()
        })
    }

    reText() {
        if (!this.scene.ctx) return
        this.scene.ctx.font = `${this.size}px Arial`
        this.scene.ctx.fillStyle = `${this.color}`
        this.scene.ctx.clearRect(0, 0, this.scene.canvas.width, this.scene.canvas.height)
        this.scene.ctx.fillText(this.text, this.x, this.y)
    }
}
