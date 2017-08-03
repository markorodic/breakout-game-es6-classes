"use strict"

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d");
        this.gameSize = { x: this.canvas.width, y: this.canvas.height }
        this.player = new Player(this.gameSize)
        this.ball = new Ball(this.gameSize)
        this.lives = 3
        this.score = 0
    }

    drawRect(player, ball) {
        this.ctx.fillRect(player.center.x - player.size.x / 2,
            player.center.y - player.size.y / 2,
            player.size.x, player.size.y)
        this.ctx.fillRect(ball.center.x - ball.size.x / 2,
            ball.center.y - ball.size.y / 2,
            ball.size.x, ball.size.y)
    }

    draw() {
        this.drawRect(this.player, this.ball)
    }

    playGame() {
        setInterval(this.draw.bind(this), 10)
    }
}

class Player {
    constructor(gameSize) {
        this.size = { x: 100, y: 10 }
        this.center = { x: gameSize.x / 2, y: gameSize.y-2 }
    }
}

class Ball {
    constructor(gameSize) {
        this.gameSize = gameSize
        this.size = { x: 6, y: 6 }
        this.center = { x: 250, y: 450 }
    }
}

window.onload = function() {
    let game = new Game("screen")
    game.playGame()
}