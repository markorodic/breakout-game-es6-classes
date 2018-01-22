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
    drawText(ctx, text, variable, left, top) {
        ctx.fillText(text + variable, left, top)
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
    filterBricks() {
        var self = this
        this.bricks = this.bricks.filter(function(brick) {
            return !self.collisions.brickHit(brick)
        })
    }
    update() {
        this.filterBricks()
        this.player.update()
        this.collisions.brickCollision(this.bricks)
        this.ball.update(this.collisions)
        this.collisions.bricks = this.bricks
        this.updateScore()
        this.updateLives()
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
        if (this.collisions.ballDrop()) {
        }
    }
    draw() {
        this.drawRect(this.player, this.ball)
        this.drawText(this.ctx, "Score: ", this.score, 13, 20)
        this.drawText(this.ctx, "Lives: ", this.lives, this.gameSize.x - 47, 20)
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
}
