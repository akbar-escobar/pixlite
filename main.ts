import { Enemy } from "./entities/enemy"
import { Player } from "./entities/player"
import { Scene } from "./module/scene"
import { Text } from "./module/text"

export class Main extends Scene {
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            debugMode: true
        })

        new Text(this, "")
        new Player(this)
        new Enemy(this, 200, 0, "yellow")
        new Enemy(this, 0, 600, "cyan")
        new Enemy(this, 200, 200, "green")
        new Enemy(this, 200, 400, "red")
        new Enemy(this, 200, 600, "purple")

        // this.update(() => {
        // player.update()
        // })
    }
}

document.body.style.padding = "0px"
document.body.style.margin = "0px"
document.body.style.backgroundColor = "gray"
new Main()


