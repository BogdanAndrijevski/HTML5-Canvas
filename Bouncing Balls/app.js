let canvas = document.querySelector('canvas');
canvas.width = 905;
canvas.height = 550;
let ctx = canvas.getContext('2d');


canvas.style.border = '2px solid wheat';
canvas.style.backgroundColor = 'rgb(27, 27, 27)';


class Ball {
    constructor(x, y, x_velocity, y_velocity, radius) {
        this.x = x;
        this.y = y;
        this.x_velocity = x_velocity;
        this.y_velocity = y_velocity;
        this.radius = radius;
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
        ctx.arc(this.x, this.y, 30, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }
}

let ball = new Ball(200, 200, 2, 2, 30);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    ball.update();
}

animate();