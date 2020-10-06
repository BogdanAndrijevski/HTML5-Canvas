const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.style.border = '1px solid white';
canvas.style.backgroundColor = 'rgb(11, 11, 11)';
canvas.width = innerWidth
canvas.height = innerHeight

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})


// Objects
class Star {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.gravity = 1;
    this.friction = 0.8;
    this.velocity = {
      x: 1,
      y: 1
    }
  }
  shatter() {
    this.radius -= 3;
    for (let i = 0; i < 8; i++) {
      miniStars.push(new MiniStar(this.x, this.y, 2, 'red'))

    }
    // console.log(miniStars)
  }
  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    if (this.y + this.radius + this.velocity.y > canvas.height) {
      this.velocity.y = -this.velocity.y * this.friction;
      this.shatter();
    } else {
      this.velocity.y += this.gravity;
    }
    this.y += this.velocity.y
  }
}


class MiniStar {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.gravity = 0.1;
    this.friction = 0.8;
    this.velocity = {
      x: randomIntFromRange(-5, 5),
      y: randomIntFromRange(-25, 25)
    }
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    if (this.y + this.radius + this.velocity.y > canvas.height) {
      this.velocity.y = -this.velocity.y * this.friction;
    } else {
      this.velocity.y += this.gravity;
    }
    this.x += this.velocity.x
    this.y += this.velocity.y
  }
}


// Implementation
let stars
let miniStars
function init() {
  stars = []
  miniStars = []

  for (let i = 0; i < 1; i++) {
    stars.push(new Star(canvas.width / 2, canvas.height / 2, 20, 'blue'))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)


  stars.forEach((star, index) => {
    star.update()
    if(star.radius < 0){
      stars.splice(index, 1)
    }
  })
  miniStars.forEach(miniStar => {
    miniStar.update()
  })
}

init()
animate()


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