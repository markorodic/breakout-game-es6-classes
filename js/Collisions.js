class CollisionDetection {
    constructor(ball, player, gameSize, bricks) {
        this.ball = ball
        this.player = player
        this.gameSize = gameSize
        this.bricks = bricks
    }
    ballHit() {
        let ballRadius = this.ball.size.x / 2
        let playerTop = this.player.size.y/2 - 1
        return (this.ball.center.y + playerTop == this.player.center.y && this.player.center.x - this.player.size.x / 2 < this.ball.center.x && this.ball.center.x < this.player.center.x + this.player.size.x / 2)
    }
    hitWall() {
        let ballRadius = this.ball.size.x / 2
        return (this.ball.center.x > this.gameSize.x - ballRadius || this.ball.center.x < ballRadius)
    }
    hitCeiling() {
        let ballRadius = this.ball.size.x / 2
        return (this.ball.center.y < ballRadius)
    }
    brickHit(brick) {
        var startX = brick.center.x - brick.size.x / 2
        var startY = brick.center.y - brick.size.y / 2
        return (this.ball.center.x > startX && this.ball.center.x < startX + brick.size.x && this.ball.center.y > startY && this.ball.center.y < startY + brick.size.y)
    }
    brickCollision() {
        this.bricks.forEach(function(brick) {
        })
    }
    ballDrop() {
        return (this.ball.center.y > this.gameSize.y)
    }
    ballStart() {
        var self = this
        if (this.player.space) {
            this.player.space = false
            this.ball.moving = true
        }
    }
}