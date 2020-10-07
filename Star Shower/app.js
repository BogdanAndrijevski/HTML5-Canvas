const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.style.border = '1px solid white';
// canvas.style.backgroundColor = 'rgb(11, 11, 11)';
canvas.width = innerWidth
canvas.height = innerHeight

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.gravity = 0.1;
    this.friction = 0.8;
    this.timeToLive = randomIntFromRange(100, 300);
    this.opacity = 1;
    this.velocity = {
      x: randomIntFromRange(-5, 5),
      y: randomIntFromRange(-25, 25)
    }
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(250, 0, 0, ${this.opacity})`
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
    this.timeToLive -= 1;
    // this.opacity -= 0.01
    this.opacity -= 1 / this.timeToLive
  }
}


// Implementation
let stars;
let miniStars;
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')
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
  c.fillStyle = backgroundGradient;
  c.fillRect(0, 0, canvas.width, canvas.height)
  // c.clearRect(0, 0, canvas.width, canvas.height)


  stars.forEach((star, index) => {
    star.update()
    if (star.radius < 0) {
      stars.splice(index, 1)
    }
  })
  miniStars.forEach((miniStar, index) => {
    miniStar.update()
    if (miniStar.timeToLive < 0) {
      miniStars.splice(index, 1)
    }
  })
}

init()
animate()




