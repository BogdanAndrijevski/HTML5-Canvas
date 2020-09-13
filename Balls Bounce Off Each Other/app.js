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

let colorArray = [
    '#FFDB80',
    '#F5EE8E',
    '#D2FFAD',
    '#A1FFB9',
    '#A5FFF5',
]

let mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
}

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.mass = 1;
        this.opacity = 0;
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        }
        this.radius = radius;
        this.color = color;
    }
    update(particles) {
        for (let i = 0; i < particles.length; i++) {
            if (particles[i] === this) continue;
            if (getDistance(this.x, this.y, particles[i].x, particles[i].y) - (this.radius * 2) < 0) {
                // console.log('has collided')
                resolveCollision(this, particles[i])
            }
        }

        if (this.x + this.radius > canvas.width ||
            this.x - this.radius < 0) {
            this.velocity.x = - this.velocity.x;
        }

        if (this.y + this.radius > canvas.height ||
            this.y - this.radius < 0) {
            this.velocity.y = - this.velocity.y;
        }

        if (distance(mouse.x, mouse.y, this.x, this.y) < 120 && this.opacity < 0.2) {
            this.opacity += 0.02;
        } else if (this.opacity > 0) {
            this.opacity -= 0.02;
            this.opacity = Math.max(0, this.opacity)
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = this.color;
        ctx.stroke()
        ctx.closePath();
    }
}


let balls;
function init() {
    balls = [];
    for (let i = 0; i < 100; i++) {
        const color = randomColor(colorArray)
        const radius = 15;
        let x = randomIntFromRange(radius, canvas.width - radius)
        let y = randomIntFromRange(radius, canvas.height - radius)

        if (i != 0) {
            for (let j = 0; j < balls.length; j++) {
                if (getDistance(x, y, balls[j].x, balls[j].y) - (radius * 2) < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius)
                    y = randomIntFromRange(radius, canvas.height - radius)
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
        e.update(balls);
    });
}

init()
animate();