import { Enemy } from "./entities/enemy"
import { Player } from "./entities/player"
import { Scene } from "./module/scene"
import { Text } from "./module/text"

export class Main extends Scene {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "#333333",
            debugMode: true
        })

        new Player(this)
        new Enemy(this, 250, 0, "yellow")
        new Enemy(this, 250, 250, "gray")
        new Enemy(this, 200, 80, "cyan")
        new Text(this, "")

        // this.update(() => {
        // player.update()
        // })
    }
}

document.body.style.padding = "0px"
document.body.style.margin = "0px"
document.body.style.backgroundColor = "gray"
new Main()


