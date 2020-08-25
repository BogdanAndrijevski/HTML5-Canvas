let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 905;
canvas.height = 550;
canvas.style.border = '2px solid wheat';
canvas.style.backgroundColor = 'rgb(27, 27, 27)';

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
        this.draw();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // ctx.strokeStyle = 'red';
        // ctx.stroke();
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