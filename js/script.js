class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d");
        this.gameSize = { x: this.canvas.width, y: this.canvas.height }
        this.player = new Player(this.gameSize)
        this.ball = new Ball(this.gameSize)
        this.bricks = this.drawBricks()
        this.bricks
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
        for (var i = 0; i < this.bricks.length; i++) {
            this.ctx.fillRect(this.bricks[i].center.x - this.bricks[i].size.x / 2,
            this.bricks[i].center.y - this.bricks[i].size.y / 2,
            this.bricks[i].size.x, this.bricks[i].size.y)
        }
    }

    drawBricks() {
        var bricks = []
        for (var i = 0; i < 540; i++) {
            var x = 22 + (i % 20) * 24
            var y = 40 + (i % 27) * 10
            bricks.push(new Brick({ x: x, y: y}))
        }
        return bricks
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
    //move
}

class Ball {
    constructor(gameSize) {
        this.gameSize = gameSize
        this.size = { x: 6, y: 6 }
        this.center = { x: 250, y: 450 }
    }
}

class Brick {
    constructor(center) {
        this.size = { x: 20, y: 7 }
        this.center = center
    }
}

window.onload = function() {
    let game = new Game("screen")
    game.playGame()
}