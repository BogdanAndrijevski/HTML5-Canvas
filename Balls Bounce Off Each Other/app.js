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
        ctx.strokeStyle = this.color;
        ctx.stroke()
    }
}


let balls;
function init() {
    balls = [];
    for (let i = 0; i < 4; i++) {
        const color = 'yellow';
        const radius = 100;
        let x = Math.random() * innerWidth
        let y = Math.random() * innerHeight

        if (i != 0) {
            for (let j = 0; j < balls.length; j++) {
                if (getDistance(x, y, balls[j].x, balls[j].y) - (radius * 2) < 0) {
                    x = Math.random() * innerWidth
                    y = Math.random() * innerHeight
                    j = -1;
                }
            }
        }
        balls.push(new Ball(x, y, radius, color));
    }

}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);

    balls.forEach(e => {
        e.update();
    });
}

init()
animate();