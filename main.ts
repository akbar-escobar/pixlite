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

        new Player(this)
        new Text(this, "").debugMode()

        // this.update(() => {
        // player.update()
        // })
    }
}

document.body.style.padding = "0px"
document.body.style.margin = "0px"
document.body.style.backgroundColor = "gray"
new Main()


