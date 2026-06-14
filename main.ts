import { Player } from "./entities/player"
import { Scene } from "./module/pixlite"

export class Main extends Scene {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            debugMode: true
        })

        new Player(this)

        // this.update(() => {
        // player.update()
        // })
    }
}

document.body.style.padding = "0px"
document.body.style.margin = "0px"
document.body.style.backgroundColor = "gray"
new Main()


