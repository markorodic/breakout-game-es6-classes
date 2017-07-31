'use strict'

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d");
        this.gameSize = { x: this.canvas.width, y: this.canvas.height }
        this.player = new Player(this.gameSize)
        this.lives = 3
        this.score = 0
    }

    draw() {
        this.drawRect(this.player)
    }

    drawRect(body) {
        this.ctx.fillRect(body.center.x - body.size.x / 2,
            body.center.y - body.size.y / 2,
            body.size.x, body.size.y)
    }

    playGame() {
        this.draw()
    }
}

class Player {
    constructor(gameSize) {
        this.size = { x: 100, y: 10 }
        this.center = { x: gameSize.x / 2, y: gameSize.y-2 }
    }
}

window.onload = function() {
    let game = new Game("screen")
    game.playGame()
}