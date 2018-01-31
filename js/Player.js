class Player {
    constructor(gameSize) {
        this.size = { x: 100, y: 10 }
        this.center = { x: gameSize.x / 2, y: gameSize.y-2 }
        this.input = new Input()
        this.moving = false
        this.space = false
    }
    update() {
        if (this.input.keyboardPress(this.input.key.left)) {
            if (this.center.x < 47) {
                this.center.x
            } else {
                this.center.x -= 4
            }
        } else if (this.input.keyboardPress(this.input.key.right)) {
            if (this.center.x > 447) {
                this.center.x
            } else {
                this.center.x += 4
            }
        } else if (this.input.keyboardPress(this.input.key.space)) {
            this.space = true
        }
    }
    printSide() {
        this.input.keyboardPress(this.input.key.left)
    }
}