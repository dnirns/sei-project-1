function init() {

  //*ELEMENTS
  const grid = document.querySelector('.game-grid')
  const startButton = document.querySelector('#start-button')
  const resetButton = document.querySelector('#reset-button')
  // const moveEnemyButton = document.querySelector('#move-enemy')



  //MAIN GAME VARIABLES
  const cells = []
  const enemiesRow1Array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const enemiesRow2Array = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  const enemiesRow3Array = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
  const enemiesRow4Array = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
  const enemiesRow5Array = [64, 65, 66, 67, 68, 69, 70, 71, 72, 73]
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
  function createEnemyRow1() {
    enemiesRow1Array.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy-row-1'))
  }
  function createEnemyRow2() {
    enemiesRow2Array.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy-row-2'))
  }
  function createEnemyRow3() {
    enemiesRow3Array.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy-row-3'))
  }
  function createEnemyRow4() {
    enemiesRow4Array.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy-row-4'))
  }
  function createEnemyRow5() {
    enemiesRow5Array.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy-row-5'))
  }
  //REMOVE PLAYER
  function removePlayer() {
    cells[playerPosition].classList.remove('player')
  }
  //REMOVE ENEMIES
  function removeEnemyRow1() {
    enemiesRow1Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-1'))
  }
  function removeAllEnemies() {
    enemiesRow1Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-1'))
    enemiesRow2Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-2'))
    enemiesRow3Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-3'))
    enemiesRow4Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-4'))
    enemiesRow5Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-5'))
  }
 
  //ALL ENEMY ROWS COMBINED
  function createAllEnemies() {
    createEnemyRow1()
    createEnemyRow2()
    createEnemyRow3()
    createEnemyRow4()
    createEnemyRow5()
  }

  //* START GAME
  //BUTTON OR ENTER KEY STARTS GAME
  function startClick() {
    createPlayer()
    createAllEnemies()
    moveEnemy()
  }

  function startEnter(e) {
    if (e.keyCode === 13) {
      createPlayer()
      createAllEnemies()
      moveEnemy()
    }
  }

  //* RESET
  //BUTTON OR R KEY RESETS
  function resetClick() {
    clearInterval(enemyTimerId)
    removePlayer()
    playerPosition = 240
    removeAllEnemies()
    enemyPosition = 0
  }

  function resetKey(e) {
    if (e.keyCode === 82) {
      clearInterval(enemyTimerId)
      removePlayer()
      playerPosition = 240
      removeAllEnemies()
      enemyPosition = 0
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
    createAllEnemies()
  }

  function moveLeft() {
    removeAllEnemies()
    enemyPosition = enemyPosition - 1
    createAllEnemies()
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

      if (numberOfMoves === 6) { // If they have made three moves   
        removeEnemyRow1()     
        // enemyPosition = enemyPosition + width + 1
        createEnemyRow1() 
        numberOfMoves = 0 // * set this back to 0
        isMovingRight = !isMovingRight // * and flip a boolean value, is isMovingRight, your moving right, is false, going left
        
      } 


    }, 1500)
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
  createAllEnemies()
  createPlayer()

  //try to make 11 x 11 


  //PRINT PRESSED KEYCODE IN CONSOLE:
  // function printKey(e) {
  //   console.log(e.keyCode)
  // }
  // document.addEventListener('keyup', printKey)
}

document.addEventListener('DOMContentLoaded', init)