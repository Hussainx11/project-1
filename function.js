let player = document.getElementById('player')
let playerBottom = parseInt(
  window.getComputedStyle(player).getPropertyValue('bottom')
)
let playerRight = parseInt(
  window.getComputedStyle(player).getPropertyValue('right')
)
let playerWidth = parseInt(
  window.getComputedStyle(player).getPropertyValue('width')
)

let floor = document.getElementById('floor')
let floorBottom = pparseInt(
  window.getComputedStyle(floor).getPropertyValue('bottom')
)
let floorHeight = parseInt(
  window.getComputedStyle(floor).getPropertyValue('height')
)

let jumping = false
let uptime
let downTime

function jump() {
  if (jumping) return
  uptime = setInterval(() => {
    if (playerBottom >= floorHeight + 250) {
      clearInterval(uptime)
      downTime = setInterval(() => {
        if (playerBottom <= playerHeight + 10) {
          clearInterval(downTime)
          jumping = false
        }
        playerBottom -= 10
        player.style.bottom = playerBottom + 'px'
        jumping = true
      }, 20)
    }
    playerBottom += 10
    player.style.bottom = playerBottom + 'px'
    jumping = true
  }, 20)
}

function createObstacle() {
  let obstacles = document.querySelector('.obstacle')
  let obstacle = document.createElement('div')
  obstacle.setAttribute('class', 'obstacle')
}

function AbortController(p) {
  if (p.key == 'spaceBar' || p.key == ' ') {
    jump()
  }
}

document.addEventListener('keydown', control)
