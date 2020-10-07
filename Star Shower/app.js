const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
// canvas.style.border = '1px solid white';
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
      x: randomIntFromRange(-5, 5),
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
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color;
    c.shadowColor = '#e3eaef';
    c.shadowBlur = 20;
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()
    if (this.y + this.radius + this.velocity.y > canvas.height) {
      this.velocity.y = -this.velocity.y * this.friction;
      this.shatter();
    } else {
      this.velocity.y += this.gravity;
    }
    this.x += this.velocity.x
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
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`
    c.shadowColor = '#e3eaef';
    c.shadowBlur = 20;
    c.fill()
    c.closePath()
    c.restore()
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

function createMountainRange(mountainAmmount, height, color) {
  for (let i = 0; i < mountainAmmount; i++) {
    const mountainWidth = canvas.width / mountainAmmount
    c.beginPath()
    c.moveTo(i * mountainWidth, canvas.height)
    c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height)
    c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height)
    c.lineTo(i * mountainWidth - 325, canvas.height)
    c.fillStyle = color
    c.fill()
    c.closePath()
  }
}


// Implementation
let stars;
let miniStars;
let backgroundStars;
let ticker = 0;
let randomSpawnRate = 75;
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
backgroundGradient.addColorStop(0, '#171e26')
backgroundGradient.addColorStop(1, '#3f586b')
function init() {
  stars = []
  miniStars = []
  backgroundStars = []

  // for (let i = 0; i < 1; i++) {
  //   stars.push(new Star(canvas.width / 2, canvas.height / 2, 20, '#e3eaef'))
  // }

  for (let i = 0; i < 150; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 3;
    backgroundStars.push(new Star(x, y, radius, 'white'))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = backgroundGradient;
  c.fillRect(0, 0, canvas.width, canvas.height)
  // c.clearRect(0, 0, canvas.width, canvas.height)

  backgroundStars.forEach(backgroundStar => {
    backgroundStar.draw()
  })

  createMountainRange(1, canvas.height - 50, '#384551')
  createMountainRange(2, canvas.height - 100, '#2b3843')
  createMountainRange(3, canvas.height - 300, '#26333e')

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

  ticker++
  if (ticker % randomSpawnRate == 0) {
    const x = Math.random() * canvas.width
    const y = -100;
    const radius = 12
    const color = '#e3eaef'
    stars.push(new Star(x, y, radius, color))

    randomSpawnRate = randomIntFromRange(75, 300)
  }
}

init()
animate()




