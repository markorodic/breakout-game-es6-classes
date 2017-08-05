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
        this.ctx.clearRect(0, 0, this.gameSize.x, this.gameSize.y)
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


    update() {
        this.player.update()
    }

    draw() {
        this.drawRect(this.player, this.ball)
    }

    play() {
        this.update()
        this.draw()
    }

    playGame() {
        setInterval(this.play.bind(this), 10)
    }
}

class Player {
    constructor(gameSize) {
        this.size = { x: 100, y: 10 }
        this.center = { x: gameSize.x / 2, y: gameSize.y-2 }
        this.input = new Input()
    }

    update() {
        if (this.input.keyboardPress(this.input.key.left)) {
            this.center.x -= 4
            console.log('left')
        } else if (this.input.keyboardPress(this.input.key.right)) {
            this.center.x += 4
            console.log('right')
        }
        // } else if (this.input.keyboardPress(this.input.key.space)) {
        //     //*************************************
        //     startBall.x = 2
        //     startBall.y = -2
        // }
    }

    printSide() {
        this.input.keyboardPress(this.input.key.left)
    }
}

class Input {
    constructor() {
        this.keyState = {}
        this.key = { left: 37, right: 39, space: 32 }
    }

    // checkForKeyPress() {
    //     window.onkeydown = function(e) {
    //         this.keyState[e.keyCode] = true
    //     }
    //     window.onkeyup = function(e) {
    //         this.keyState[e.keyCode] = false
    //     }
    // }

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