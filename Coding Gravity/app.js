let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.style.border = '2px solid wheat';
canvas.style.backgroundColor = 'rgb(11, 11, 11)';



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
            this.y_velocity = -this.y_velocity;
        } else {
            this.y_velocity += 1;
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
    ball = new Ball(canvas.width / 2, canvas.height / 2, 1, 80, 'red');

}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    ball.update();

}

init()
animate();