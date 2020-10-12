const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}


let particles = [];

addEventListener('click', e => {
  mouse.x = e.clientX
  mouse.y = e.clientY
  const particleCount = 10
  const angleIncrement = Math.PI * 2 / particleCount
  const power = 2
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(mouse.x, mouse.y, 5, `hsl(${Math.random() * 360},50%,50%)`,   
      {
        x: Math.cos(angleIncrement * i) * Math.random() * power,
        y: Math.sin(angleIncrement * i) * Math.random() * power
      }))

  }
  // console.log(particles)
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
    this.opacity = 1
  }

  draw() {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
    ctx.restore()

  }

  update() {
    this.draw()
    this.velocity.x *= this.friction
    this.velocity.y *= this.friction
    this.velocity.y += this.gravity
    this.x += this.velocity.x
    this.y += this.velocity.y
    this.opacity -= 0.005
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  ctx.fillStyle = 'rgba(0,0,0,0.08)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  particles.forEach((particle, index) => {
    if (particle.opacity > 0) {
      particle.update()
    } else {
      particles.splice(index, 1)
    }
  })
}

animate()