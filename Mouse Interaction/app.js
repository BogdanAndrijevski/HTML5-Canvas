let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.border = '2px solid wheat';
canvas.style.backgroundColor = 'rgb(0, 0, 0)';

window.addEventListener('mousemove', (e) => {
    console.clear()
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse)
})

let mouse = {
    x: undefined,
    y: undefined,
}
class Ball {
    constructor(x, y, x_velocity, y_velocity, radius, color) {
        this.x = x;
        this.y = y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.radius = radius;
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
            if (this.radius < 40) {
                this.radius += 1
            }
        } else if (this.radius > 2) {
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

let balls = [];

for (let i = 0; i < 10; i++) {
    let radius = Math.floor(Math.random() * 26 + 5); // from 5 to 30 int
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let x_velocity = (Math.random() - 0.5) * 2;
    let y_velocity = (Math.random() - 0.5) * 2;
    let color = `rgb(${['doesnt', 'really', 'matter'].map(() => Math.floor(Math.random() * 256))})`;
    balls.push(new Ball(x, y, x_velocity, y_velocity, radius, color))

}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    balls.forEach(ball => {
        ball.update();
    });
}

animate();