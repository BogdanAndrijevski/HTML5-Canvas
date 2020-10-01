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
  }
}

// Implementation
let stars
function init() {
  stars = []

  for (let i = 0; i < 1; i++) {
    stars.push(new Star(canvas.width/2, canvas.height/2, 30, 'blue'))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)


  stars.forEach(star => {
   star.update()
  })
}

init()
animate()