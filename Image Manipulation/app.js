const body = document.querySelector('body');
const canvas = document.querySelector('canvas');
const img = document.querySelector('img');
const ctx = canvas.getContext('2d');
// body.style.backgroundColor = 'black';
// body.style.margin = '0px';
// body.style.color = 'wheat';
// body.style.border = '2px solid wheat';
// img.style.display = 'none';
console.time();


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
console.timeEnd();

console.time();
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
        if (x % 10 === 0 && y % 10 === 0) {
            pixels.push({
                x,
                y,
                r: imageData[i],
                g: imageData[i + 1],
                b: imageData[i + 2]
            })
        }
    }
    pixels.forEach(pixel => {
        dots.push(new Dot(pixel.x, pixel.y, pixel.r, pixel.g, pixel.b, 0, 0));
    });

    ctx.clearRect(0, 0, innerWidth, innerHeight);


    // dots.forEach(dot => {
    //     dot.draw(ctx);
    //     // console.log('hi')
    // });
    console.timeEnd();

    function animate() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.time();
        requestAnimationFrame(animate);
        dots.forEach(dot => {
            dot.draw(ctx);
            // dot.x++
        });
        console.timeEnd();
    }

    animate();
    // console.log(dots)
}) // on Load end









