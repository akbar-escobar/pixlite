import type { Scene } from "../scene"
import type { Sprite } from "../sprite"

export class Collision {
    scene: Scene

    cellCountIndex: Map<number, number[]> = new Map()
    cellN = 0
    cellSize = 0
    constructor(scene: Scene) { this.scene = scene }

    spatialCheck(child: Sprite, i: number) {
        const childXY0 = {
            x: Math.round(child.x / this.cellSize),
            y: Math.round(child.y / this.cellSize)
        }
        const childXY1 = {
            x: Math.round((child.x + child.width) / this.cellSize),
            y: Math.round((child.y + child.height) / this.cellSize)
        }

        for (let y = childXY0.y; y <= childXY1.y; y++) {
            for (let x = childXY0.x; x <= childXY1.x; x++) {
                const key = (y * this.cellN) + x
                if (!this.cellCountIndex.has(key)) this.cellCountIndex.set(key, [])
                const childArr = this.cellCountIndex.get(key)!
                childArr.push(i)
                this.getChildAB(childArr)
            }
        }
    }

    getChildAB(childArr: number[]) {
        if (childArr.length > 1) {
            for (let a = 0; a < childArr.length; a++) {
                for (let b = a + 1; b < childArr.length; b++) {
                    this.childCheck(a, b, childArr)
                }
            }
        }
    }

    childCheck(a: number, b: number, childArr: number[]) {
        const { children } = this.scene

        const childA = children[childArr[a]] as Sprite
        const childB = children[childArr[b]] as Sprite
        if (
            childA.x < childB.x + childB.width &&
            childA.x + childA.width > childB.x &&
            childA.y < childB.y + childB.height &&
            childA.y + childA.height > childB.y
        ) {
            childA.hitboxColor = "red"
            childB.hitboxColor = "red"
        }
    }
}
