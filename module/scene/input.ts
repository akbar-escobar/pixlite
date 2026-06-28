export class Input {
    eventObj: { key?: keyof obj, callback?: (e: any) => void } = {}
    eventSet = new Set<string>
    constructor() {
        window.addEventListener("keydown", (e) => {
            this.eventSet.add(e.code)
            if (this.eventObj.key === "keydown") this.eventObj.callback!(e)
        })
        window.addEventListener("keyup", () => {
            this.eventSet.clear()
        })
        window.addEventListener("pointerdown", (e) => {
            if (this.eventObj.key === "pointerdown") this.eventObj.callback!(e)
        })
    }

    event<k extends keyof obj>(key: k, callback: (e: obj[k]) => void) {
        this.eventObj.key = key
        this.eventObj.callback = callback
    }

    keyboardCode(code: code): boolean {
        return this.eventSet.has(code)
    }
}

type obj = {
    keydown: KeyboardEvent,
    pointerdown: PointerEvent
}


type code =
    | "Enter"
    | "Space"
    | "Escape"
    | "Tab"

    | "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
    | `Key${"A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"}`
    | `Digit${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
    | "ShiftLeft" | "ShiftRight" | "ControlLeft" | "ControlRight" | "AltLeft" | "AltRight"
