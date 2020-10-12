const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}


addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', e => {
  mouse.x = e.clientX
  mouse.y = e.clientY
  const particleCount = 10
  const angleIncrement = Math.PI * 2 / particleCount

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(mouse.x, mouse.y, 5, 'red',
      {
        x: Math.cos(angleIncrement * i) * Math.random(),
        y: Math.sin(angleIncrement * i) * Math.random()
      }))

  }
  console.log(particles)
})

// Objects
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
    this.gravity = 0.005
    this.friction = 0.999
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update() {
    this.draw()
    this.velocity.x *= this.friction
    this.velocity.y *= this.friction
    this.velocity.y += this.gravity
    this.x += this.velocity.x
    this.y += this.velocity.y
  }
}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 400; i++) {
    // particles.push()
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  ctx.fillStyle = 'rgba(0,0,0,0.08)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
    particle.update()
  })
}

init()
animate()