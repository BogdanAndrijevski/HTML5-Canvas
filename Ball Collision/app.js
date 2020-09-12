let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.border = '2px solid wheat';
canvas.style.backgroundColor = 'rgb(11, 11, 11)';

addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
})

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init()
})

let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    update() {

        this.draw();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill()
    }
}

let ballOne;
let ballTwo;

function init() {
    ballOne = new Ball(canvas.width / 2, canvas.height / 2, 80, 'red');
    ballTwo = new Ball(mouse.x, mouse.y, 20, 'white');
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    ballOne.update();
    ballTwo.x = mouse.x;
    ballTwo.y = mouse.y;
    ballTwo.update();

    if (getDistance(ballOne.x, ballOne.y, ballTwo.x, ballTwo.y) < ballOne.radius + ballTwo.radius) {
        ballOne.color = 'purple'
    } else {
        ballOne.color = 'red'
    }
}

init()
animate();