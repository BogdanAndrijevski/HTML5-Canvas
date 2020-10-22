const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.style.backgroundColor = 'black';
canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

addEventListener('mousemove', event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})


class Square {
  constructor(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath()
  }

  update() {
    this.draw()
  }
}


let static = new Square(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100, 'red')
let player = new Square(mouse.x, mouse.y, 50, 50, 'white')


function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  static.update()

  // collision detection
  if (
    player.x < static.x + static.width &&
    player.x + player.width > static.x &&
    player.y < static.y + static.height &&
    player.y + player.height > static.y
  ) {
    player.color = 'lime' // collision
  } else {
    player.color = 'white'
  }


  player.x = mouse.x
  player.y = mouse.y
  player.update()

}

animate()