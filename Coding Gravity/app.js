let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.border = '1px solid wheat';
canvas.style.backgroundColor = 'rgb(11, 11, 11)';

let gravity = 1;
let friction = 0.99;


addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init()
})

class Ball {
    constructor(x, y, y_velocity, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.y_velocity = y_velocity
    }
    update() {
        if (this.y + this.radius > canvas.height) {
            this.y_velocity = -this.y_velocity * friction; 
        } else {
            this.y_velocity += gravity;
        }
        this.y += this.y_velocity;
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


function init() {
    ball = new Ball(canvas.width / 2, canvas.height / 2, 1, 20, 'red');

}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();
    requestAnimationFrame(animate);

}

init()
animate();