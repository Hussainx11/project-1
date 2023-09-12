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
let playerHeight = parseInt(
  window.getComputedStyle(player).getPropertyValue('height')
)

let floor = document.getElementById('floor')
let floorBottom = parseInt(
  window.getComputedStyle(floor).getPropertyValue('bottom')
)
let floorHeight = parseInt(
  window.getComputedStyle(floor).getPropertyValue('height')
)

let jumping = false
let jumpCount = 0
let maxJumpCount = 170
let gravity = 7
let displayScore = document.getElementById('score')
let score = 0

function jump() {
  if (jumping) return
  jumping = true

  let jumpInterval = setInterval(() => {
    if (jumpCount >= maxJumpCount) {
      clearInterval(jumpInterval)
      jumpCount = 0
      downTime = setInterval(() => {
        if (playerBottom <= floorHeight) {
          clearInterval(downTime)
          jumping = false
          playerBottom = floorHeight
        }
        playerBottom -= gravity
        player.style.bottom = playerBottom + 'px'
      }, 20)
    }
    playerBottom += gravity
    player.style.bottom = playerBottom + 'px'
    jumpCount += gravity
  }, 20)
}

function showScore() {
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
      gameOver()
    }
  }

  let obstacleInterval = setInterval(moveObstacle, 20)
  let obstacleTimeout = setTimeout(createObstacle, randomTimeout)
}

function gameOver() {
  clearInterval(obstacleInterval)
  clearTimeout(obstacleTimeout)
  alert('Game over! Your final score is: ' + score)
  location.reload()
}

function control(event) {
  if (event.code === 'Space') {
    jump()
  }
}

document.addEventListener('keydown', control)

createObstacle()
