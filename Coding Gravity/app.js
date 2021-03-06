let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.border = '1px solid wheat';
canvas.style.backgroundColor = 'rgb(11, 11, 11)';

let gravity = 1;
let friction = 0.79;

let colors = [
    'blue',
    'salmon',
    'green',
    'cyan',
    'red',
]

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init()
})

addEventListener('click', () => {
    init()
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class Ball {
    constructor(x, y, x_velocity, y_velocity, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.y_velocity = y_velocity
        this.x_velocity = x_velocity
    }
    update() {
        if (this.x + this.radius + this.x_velocity > canvas.width || this.x - this.radius <= 0) {
            this.x_velocity = -this.x_velocity
        }

        if (this.y + this.radius + this.y_velocity > canvas.height) {
            this.y_velocity = -this.y_velocity * friction;
        } else {
            this.y_velocity += gravity;
        }
        this.y += this.y_velocity;
        this.x += this.x_velocity;
        this.draw();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill()
    }
}

let ball;
let balls;

function init() {
    balls = [];
    for (let i = 0; i < 10; i++) {
        let radius = randomIntFromRange(15, 20);
        let x_velocity = randomIntFromRange(-2, 2)
        let y_velocity = randomIntFromRange(-2, 2)
        let x = randomIntFromRange(radius, canvas.width - radius)
        let y = randomIntFromRange(radius, canvas.height - radius)
        let color = colors[Math.floor(Math.random() * colors.length)]
        balls.push(new Ball(x, y, x_velocity, y_velocity, radius, color))
    }
    ball = new Ball(canvas.width / 2, canvas.height / 2, 1, 1, 80, 'red');
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();
    balls.forEach(ball => {
        ball.update()
    });
    requestAnimationFrame(animate);

}

init()
animate();