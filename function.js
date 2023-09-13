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

let gameEnd = false
let jumping = false
let jumpCount = 0
let maxJumpCount = 170
let gravity = 7
let displayScore = document.getElementById('score')
let displayGameOver = document.getElementById('Gameover')
let displayGameOverMessage = document.getElementById('gameOverMessage')
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
  if (!gameEnd) {
    score++
    displayScore.innerText = score
  }
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
  obstacle.style.backgroundColor = 'brightblue'

  function gameOver() {
    gameEnd = true
    clearInterval(obstacleInterval)
    clearTimeout(obstacleTimeout)
    displayGameOverMessage.innerText = 'Your final score is: ' + score
    displayGameOver.style.opacity = '1'
    displayGameOver.style.zIndex = '1'
  }

  function moveObstacle() {
    if (!gameEnd) {
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
  }

  let obstacleInterval = setInterval(moveObstacle, 20)
  let obstacleTimeout = setTimeout(createObstacle, randomTimeout)
}

function control(event) {
  if (event.code === 'Space') {
    jump()
  }
}

document.addEventListener('keydown', control)

createObstacle()
