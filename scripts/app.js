function init() {

  //*ELEMENTS
  const grid = document.querySelector('.game-grid')
  const startButton = document.querySelector('#start-button')
  const resetButton = document.querySelector('#reset-button')
  // const moveEnemyButton = document.querySelector('#move-enemy')



  //MAIN GAME VARIABLES
  const cells = []
  const enemies = [0, 1, 2, 3, 2, 4, 5, 6, 7]
  let enemyPosition = 0
  let playerPosition = 240



  //GRID

  const width = 16
  const numberOfCells = width * width

  function makeGrid() {
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      cell.innerHTML = i
      grid.appendChild(cell)
      // console.log('clicked me')
    }
  }



  //?EXECUTION

  //*PLAYER AND ENEMIES
  //ADD PLAYER (+ SET START POSITION)

  function createPlayer() {
    cells[playerPosition].classList.add('player')
  }
  //ADD ENEMIES
  function createEnemy() {
    enemies.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy'))
  }
  //REMOVE PLAYER
  function removePlayer() {
    cells[playerPosition].classList.remove('player')
  }
  //REMOVE ENEMIES
  function removeAllEnemies() {
    enemies.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy'))
  }




  //* START GAME
  //BUTTON OR ENTER KEY STARTS GAME
  function startClick() {
    createPlayer()
    createEnemy() 
    moveEnemy()
  }

  function startEnter(e) {
    if (e.keyCode === 13) {
      createPlayer()
      createEnemy()
      moveEnemy()
    }
  }

  //* RESET
  //BUTTON OR R KEY RESETS
  function resetClick() {
    clearInterval(enemyTimerId)
    removePlayer()
    playerPosition = 217
    removeAllEnemies()
    enemyPosition = 0
  }

  function resetKey(e) {
    if (e.keyCode === 82) {
      clearInterval(enemyTimerRight)
      removePlayer()
      playerPosition = 217
      removeAllEnemies()
      enemyPosition = 3
    }
  }


  //* MOVEMENT

  //MOVE PLAYER WITH KEYS
  //STOPPED PLAYER MOVEMENT PAST GRID LIMIT BUT NEED TO FIND WAY TO NOT HARD CODE CELLS...
  function movePlayer(e) {
    const playerMoveLeft = playerPosition - 1
    const playerMoveRight = playerPosition + 1
    if (e.keyCode === 37 && playerPosition % width !== 0) {
      removePlayer()
      playerPosition = playerMoveLeft
      createPlayer()
    } else if (e.keyCode === 39 && playerPosition % width !== width - 1) {
      removePlayer()
      playerPosition = playerMoveRight
      createPlayer()
    }
  }


  //ENEMY MOVEMENT
  //BOUNDARIES: 


  function moveRight() {
    removeAllEnemies()
    enemyPosition = enemyPosition + 1
    createEnemy()
  }

  function moveLeft() {
    removeAllEnemies()
    enemyPosition = enemyPosition - 1
    createEnemy()
  }

  let enemyTimerId = null
  function moveEnemy() {
    let isMovingRight = true
    
    let numberOfMoves = 0
    enemyTimerId = setInterval(() => {

      if (isMovingRight) {
        moveRight()        
      } else {
        moveLeft()     
      }
      // * Regardless of direction, we do the below 
      numberOfMoves++ // * then incease your number of moves

      if (numberOfMoves === 8) { // If they have made three moves   
        removeAllEnemies()     
        // enemyPosition = enemyPosition + width - 1
        createEnemy() 
        numberOfMoves = 0 // * set this back to 0
        isMovingRight = !isMovingRight // * and flip a boolean value, is isMovingRight, your moving right, is false, going left
        
      } 


    }, 500)
  }
  //SET BOUNDARIES FOR ENEMIES:






  //*EVENTS
  //CLICKS
  resetButton.addEventListener('click', resetClick)
  startButton.addEventListener('click', startClick)
  // startButton.addEventListener('click', moveEnemy)

  //KEYS
  document.addEventListener('keyup', startEnter)
  document.addEventListener('keydown', movePlayer)
  document.addEventListener('keyup', resetKey)







  makeGrid()
  // createEnemy()
  createPlayer()

  //try to make 11 x 11 


  //PRINT PRESSED KEYCODE IN CONSOLE:
  // function printKey(e) {
  //   console.log(e.keyCode)
  // }
  // document.addEventListener('keyup', printKey)
}

document.addEventListener('DOMContentLoaded', init)