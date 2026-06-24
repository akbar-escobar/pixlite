import { Enemy } from "./entities/enemy"
import { Friend } from "./entities/friend"
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
        new Friend(this, 10, 150)
        new Enemy(this, 250, 0, "yellow")
        new Enemy(this, 250, 250, "gray")
        new Enemy(this, 200, 120, "cyan")
        new Text(this, "")

        // this.create(() => {
        // player.update()
        // })
    }
}

document.body.style.padding = "0px"
document.body.style.margin = "0px"
document.body.style.backgroundColor = "gray"
new Main()
