const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const radius = 20
const gravity = 2
const stoppingOffset = 10
const finalXPos = (1 / 4) * canvas.width
const timePerBall = 30

const ballStackLimit = 10
const ballStackXVel = -10
const ballStackInitYVel = -15
let ballStackYVel

let ballStack = []
let currBall = {}
let oldBallStack = []

function initCurrBall() {
    currBall = {
        initialised: true,
        pos: {
            x: (3 / 4) * canvas.width,
            y: canvas.height - radius
        },
        vel: {}
    }
    const distance = stoppingOffset + ballStack.length * (radius * 2)

    currBall.vel.y = -distance / timePerBall - (1 / 2) * gravity * timePerBall
    currBall.vel.x = (finalXPos - currBall.pos.x) / timePerBall
}

function animateOldBallStack() {
    if (!oldBallStack.length) {
        return
    }

    for (let ball of oldBallStack) {
        drawBall(ball)
        ball.x += ballStackXVel
        ball.y += ballStackYVel
    }

    ballStackYVel += gravity
}

function drawBall(pos) {
    ctx.beginPath()
    ctx.arc(pos.x + radius / 2, pos.y, radius, 0, 2 * Math.PI, false)
    ctx.fill()
}

function run() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'white'

    if (!currBall.initialised) initCurrBall()

    if (currBall.pos.x < finalXPos) {
        ballStack.push(currBall.pos)
        if (ballStack.length > ballStackLimit) {
            ballStackYVel = ballStackInitYVel
            oldBallStack = ballStack
            ballStack = []
        }
        initCurrBall()
    }

    drawBall(currBall.pos)
    for (let ball of ballStack) drawBall(ball)
    animateOldBallStack()

    currBall.pos.x += currBall.vel.x
    currBall.pos.y += currBall.vel.y

    currBall.vel.y += gravity

    requestAnimationFrame(run)
}

run()
