const body = document.querySelector('body');
const canvas = document.querySelector('canvas');
const img = document.querySelector('img');
const ctx = canvas.getContext('2d');
const radius = 300;
let isImage = true;


function animateDot(dot, canvas) {
    const rand = Math.random() * Math.PI * 2; // to get 6.28 - equals to 360 degrees

    let x = Math.sin(rand) * radius + canvas.width / 2;
    let y = Math.cos(rand) * radius + canvas.height / 2;
    if (isImage) {
        x = dot.imageX;
        y = dot.imageY;
    }

    gsap.to(dot, {
        duration: 1.75 + Math.random(), // animate duration
        x: x,
        y: y,
        ease: 'cubic.inOut',
        onComplete: () => {
            animateDot(dot, canvas)
        }
    })
}
class Dot {
    constructor(x, y, r, g, b, imageX, imageY) {
        this.x = x
        this.y = y
        this.r = r
        this.g = g
        this.b = b
        this.imageX = imageX
        this.imageY = imageY
    }

    draw(c) {
        c.beginPath()
        c.arc(this.x, this.y, 2, 0, 2 * Math.PI, false)
        c.fillStyle = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')'
        c.fill()
    }
}

canvas.width = innerWidth;
canvas.height = innerHeight;
addEventListener('click', () => {
    isImage = !isImage;
})
addEventListener('load', () => {
    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;
    const dots = [];
    const pixels = [];

    for (let i = 0; i < imageData.length; i += 4) {
        if (imageData[i] === 0) continue;
        const x = (i / 4) % img.naturalWidth;
        const y = Math.floor(Math.floor(i / img.naturalWidth) / 4)
        // less pixels for better performance 
        if (x % 5 === 0 && y % 5 === 0) {
            pixels.push({
                x,
                y,
                r: imageData[i],
                g: imageData[i + 1],
                b: imageData[i + 2]
            })
        }
    }

    pixels.forEach((pixel, i) => {
        const imageX = pixel.x + canvas.width / 2 - img.naturalWidth / 2;
        const imageY = pixel.y + canvas.height / 2 - img.naturalHeight / 2;
        const rand = Math.random() * Math.PI * 2; // to get 6.28 - equals to 360 degrees
        const x = Math.sin(rand) * radius + canvas.width / 2;
        const y = Math.cos(rand) * radius + canvas.height / 2;
        dots.push(new Dot(x, y, pixel.r, pixel.g, pixel.b, imageX, imageY));
        animateDot(dots[i], canvas);
    });

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    dots.forEach(dot => {
        dot.draw(ctx);
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(animate);
        dots.forEach(dot => {
            dot.draw(ctx);
        });
    }
    animate();

})









