export class Input {
    eventMap: { key?: eventKey, callback?: (e: eventObj[eventKey]) => void } = {}
    constructor() {
        window.addEventListener("keydown", (e) => {
            if (this.eventMap.key === "keyboard") {
                this.eventMap.callback!(e)
            }
        })
        window.addEventListener("pointerdown", (e) => {
            if (this.eventMap.key === "pointer") {
                this.eventMap.callback!(e)
            }
        })
    }

    event<K extends eventKey>(key: K, callback: (e: eventObj[K]) => void) {
        this.eventMap.key = key
        this.eventMap.callback = callback as any
    }
}

type eventObj = {
    pointer: PointerEvent,
    keyboard: KeyboardEvent
}
type eventKey = keyof eventObj
