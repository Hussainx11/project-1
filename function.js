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
// checks my jumping variable if its true it exits early and doesnt perform any other functions if its not true it sets the value to true, the function uses intervals to control the players jump once the player reaches the max jump count the jump interval is cleared and the downtime interval sets in so the player can land once the player reaches floor height downtime is cleared and the function resets

function showScore() {
  if (!gameEnd) {
    score++
    displayScore.innerText = score
  }
}

setInterval(showScore, 100)

// this function increments my score variable and changes the text of my display score element to a new value every 100 milliseconds by using setinterval

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

  // this function is responsible for creating the obstacles by selecting the class from the document then creating a new div and assigning it with the class "obstacle" it then appends the new element to the obstacles element and then gives it random properties using the math.random function like the size and position, as for the floor function i also used math.random to make it somewhat infinite

  function gameOver() {
    gameEnd = true
    clearInterval(obstacleInterval)
    clearTimeout(obstacleTimeout)
    displayGameOverMessage.innerText = 'Your final score is: ' + score
    displayGameOver.style.opacity = '1'
    displayGameOver.style.zIndex = '1'
  }
  // this function handles the game over scenario in case the player loses, it sets the game end variable to true and clears the intervals and timouts that ive set for the obstacles it then brings up the hidden game over page by changing the z-index and opacity properties to make it visible

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

  // this piece of code updates the position and dimensions of the obstacle moving them towards the player , it also checks for the collision between the player and the obstacle so it can trigger the game over function

  let obstacleInterval = setInterval(moveObstacle, 20)
  let obstacleTimeout = setTimeout(createObstacle, randomTimeout)
}
// this sets up an interval to trigger the move obstacle function every 20 milliseconds and a timout to call the create obstacle function randomly

function control(event) {
  if (event.code === 'Space') {
    jump()
  }
}

document.addEventListener('keydown', control)
this

createObstacle()
// this listens for a keydown event so when the player presses the spacebar it calls the control function to make the player jump and then immediately calls the create obstacle function
