let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.border = '2px solid wheat';
canvas.style.backgroundColor = 'rgb(0, 0, 0)';

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

let mouse = {
    x: undefined,
    y: undefined,
}

let colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9'
]


class Ball {
    constructor(x, y, x_velocity, y_velocity, radius, color) {
        this.x = x;
        this.y = y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.radius = radius;
        this.maxRadius = 40;
        this.minRadius = radius;
        this.color = color;
    }
    update() {
        if (this.x + this.radius > canvas.width ||
            this.x - this.radius < 0) {
            this.x_velocity = - this.x_velocity;
        }

        if (this.y + this.radius > canvas.height ||
            this.y - this.radius < 0) {
            this.y_velocity = - this.y_velocity;
        }

        this.x += this.x_velocity;
        this.y += this.y_velocity;

        // interaction

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < this.maxRadius) {
                this.radius += 1
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1
        }

        this.draw();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill()
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    balls.forEach(ball => {
        ball.update();
    });
}

let balls = [];
function init() {
    balls = [];
    for (let i = 0; i < 200; i++) {
        let radius = Math.floor(Math.random() * 3 + 1); // from 1 to 3 int
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let x_velocity = (Math.random() - 0.5) * 2;
        let y_velocity = (Math.random() - 0.5) * 2;
        let color = colorArray[Math.floor(Math.random() * colorArray.length)];
        balls.push(new Ball(x, y, x_velocity, y_velocity, radius, color))

    }
}
init()
animate();