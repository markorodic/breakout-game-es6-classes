class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext("2d");
        this.gameSize = { x: this.canvas.width, y: this.canvas.height }
        this.player = new Player(this.gameSize, this.collisions)
        this.ball = new Ball(this.gameSize)
        this.bricks = this.drawBricks()
        this.lives = 3
        this.score = 0
        this.collisions = new CollisionDetection(this.ball, this.player, this.gameSize, this.bricks)
    }
    drawRect(player, ball) {
        this.ctx.clearRect(0, 0, this.gameSize.x, this.gameSize.y)
        this.ctx.fillStyle = '#C6494B'
        this.ctx.fillRect(player.center.x - player.size.x / 2,
            player.center.y - player.size.y / 2,
            player.size.x, player.size.y)
        this.ctx.fillStyle = '#C6494B'
        this.ctx.fillRect(ball.center.x - ball.size.x / 2,
            ball.center.y - ball.size.y / 2,
            ball.size.x, ball.size.y)
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,55,392,15)
        for (var i = 0; i < this.bricks.length; i++) {
            this.ctx.fillStyle = this.bricks[i].colour
            this.ctx.fillRect(this.bricks[i].center.x - this.bricks[i].size.x / 2,
            this.bricks[i].center.y - this.bricks[i].size.y / 2,
            this.bricks[i].size.x, this.bricks[i].size.y)
        }
    }
    drawText(ctx, variable, left, top) {
        this.ctx.fillStyle = '#D3D7D0'
        ctx.fillText(variable, left, top)
        ctx.font = '40px "Press Start 2P"'
    }
    drawBricks() {
        var bricks = []
        for (var i = 0; i < 84; i++) {
            var x = 10 + (i % 13)* 31
            var y = 105 + (i % 6) * 10
            var colour = this.whichColour(y)
            bricks.push(new Brick({ x: x, y: y}, colour))
        }
        return bricks
    }
    filterBricks() {
        var self = this
        this.bricks = this.bricks.filter(function(brick) {
            return !self.collisions.brickHit(brick)
        })
    }
    update() {
        this.updateGame()
        this.filterBricks()
        this.player.update()
        this.collisions.brickCollision(this.bricks)
        this.ball.update(this.collisions)
        this.collisions.bricks = this.bricks
        this.updateScore()
        this.updateLives()
    }
    updateGame() {
      self = this
      if (this.lives < 0) {
        self.lives = 3
        self.score = 0
      }
    }
    updateScore() {
        var self = this
        this.collisions.bricks.forEach(function(brick) {
            if (self.collisions.brickHit(brick)) {
                self.score += 1
            }
        })
    }
    updateLives() {
        var self = this
        if (this.collisions.ballDrop()) {
          self.lives -= 1
        }
    }
    draw() {
        this.drawRect(this.player, this.ball)
        this.drawText(this.ctx, this.score, 96, 50)
        this.drawText(this.ctx, this.lives, this.gameSize.x - 135, 50)
    }
    play() {
        this.update()
        this.draw()
    }

    playGame() {
        var self = this
        requestAnimationFrame(function render(){
            self.play()
            requestAnimationFrame(render)
        })
    }

    whichColour(xPostion) {
        switch (xPostion) {
            case 105:
                return '#C6494B'
            case 115:
                return '#C46C40'
            case 125:
                return '#B37938'
            case 135:
                return '#A2A136'
            case 145:
            return '#4B9F4C'
            case 155:
                return '#434DC5'
            break;
        }
    }
}
