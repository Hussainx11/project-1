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
let displayScore = document.getElementById('score')
let score = 0

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

function showscore() {
  score++
  displayScore.innerText = score
}

setInterval(showScore, 100)

function createObstacle() {
  let obstacles = document.querySelector('.obstacles')
  let obstacle = document.createElement('div')
  obstacle.setAttribute('class', 'obstacle')
  obstacles.appendChild(obstacle)

  let randomTimeout = Math.floor(Math.random() * 1000) + 1000
  let obstacleRight = -30
  let obstacleBottom = 100
  let obstacleWidth = 30
  let obstacleHeight = Math.floor(Math.random() * 50) + 50
  obstacle.style.backgroundColor = 'blue'

  function moveObstacle() {
    obstacleRight += 5
    obstacle.style.right = obstacleRight + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'
    obstacle.style.width = obstacleWidth + 'px'
    obstacle.style.height = obstacleHeight + 'px'
    if (
      playerRight >= obstacleRight - playerWidth &&
      playerRight <= obstacleRight + obstacleWidth &&
      playerBottom <= obstacleBottom + obstacleHeight
    ) {
      alert('Game over! Your final score is: ' + score)
      clearInterval(obstacleInterval)
      clearTimeout(obstacleTimeout)
      location.reload()
    }
  }

  let obstacleInterval = setInterval(moveObstacle, 20)
  let obstacleTimeout = setTimeout(createObstacle, randomTimeout)
}

function AbortController(p) {
  if (p.key == 'spaceBar' || p.key == 'spaceBar') {
    jump()
  }
}

document.addEventListener('keydown', control)

const newAl = document.createElement('h2')
newAl.innerText = 'Game over! Your final score is: ' + score
const newAp = document.createElement('h3')
newAp.innertext = 'you passed a milestone level increase'

function moveObstacle() {
  obstacleRight += 5
  obstacle.style.right = obstacleRight + 'px'
  obstacle.style.bottom = obstacleBottom + 'px'
  obstacle.style.width = obstacleWidth + 'px'
  obstacle.style.height = obstacleHeight + 'px'
  if (
    playerRight >= obstacleRight - playerWidth &&
    playerRight <= obstacleRight + obstacleWidth &&
    playerBottom <= obstacleBottom + obstacleHeight
  ) {
    alert('Game over! your final score is: ' + score)
    clearInterval(obstacleInterval)
    clearTimeout(obstacleTimeout)
    location.reload()
  }
}

// const newAl = document.createElement('h3')
// newAl.innerText = 'Game over! your final score is: ' + score
// const newAp = document.createElement('h3')
// newAp.innertext = 'you passed a milestone, level increase'

function moveObstacle() {
  obstacleLeft -= 5
  obstacle.style.left = obstacleLeft + 'px'
  obstacle.style.top = obstacleTop + 'px'
  obstacle.style.height = obstacleheight + 'px'
  obstacle.style.width = obstacleWidth + 'px'
  if (
    playerLeft >= obstacleLeft - playerWidth &&
    playerLeft <= obstacleLeft + obstacleWidth &&
    playerBottom <= obstacleBottom + obstacleHeight
  ) {
    alert('Game over! your final score is: ' + score)
    clearInterval(obstacleInterval)
    clearTimeout(obstacleTimeout)
    location.reload()
  }
}
