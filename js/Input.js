class Input {
    constructor() {
        this.keyState = {}
        this.key = { left: 37, right: 39, space: 32 }
    }
    keyboardPress(keyCode) {
        var self = this
        window.onkeydown = function(e) {
            self.keyState[e.keyCode] = true
        }
        window.onkeyup = function(e) {
            self.keyState[e.keyCode] = false
        }
        return this.keyState[keyCode] === true
    }
}
