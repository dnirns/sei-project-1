function init() {
  //* GENERATE GRID //

  const width = 16
  const numberOfCells = width * width

  function makeGrid() {
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      cell.innerHTML = i
      grid.appendChild(cell)
    }
  }

  //* GAME ARRAYS AND GLOBAL VARIABLES //
  let cells = []
  let enemiesRow1Array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const enemiesRow2Array = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  const enemiesRow3Array = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
  const enemiesRow4Array = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
  let enemiesRow5Array = [64, 65, 66, 67, 68, 69, 70, 71, 72, 73]
  let enemyPosition = 0
  let playerPosition = 240
  let laserPosition = playerPosition

  //* DOM ELEMENTS //
  const grid = document.querySelector('.game-grid')
  const startButton = document.querySelector('#start-button')
  const resetButton = document.querySelector('#reset-button')


  //* DOM EXECUTION //

  //? CREATE PLAYER AND ENEMIES

  function createPlayer() {
    cells[playerPosition].classList.add('player')
  }

  function createEnemyRow1() {
    enemiesRow1Array.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy-row-1', 'enemy'))
  }

  // function createEnemyRow2() {
  //   enemiesRow2Array.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy-row-2' , 'enemy'))
  // }

  // function createEnemyRow3() {
  //   enemiesRow3Array.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy-row-3' , 'enemy'))
  // }

  // function createEnemyRow4() {
  //   enemiesRow4Array.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy-row-4' , 'enemy'))
  // }

  // function createEnemyRow5() {
  //   enemiesRow5Array.forEach(enemy => cells[enemyPosition + enemy].classList.add('enemy-row-5' , 'enemy'))
  // }
  function createLaser() {
    cells[laserPosition].classList.add('laser')
  }

  function removeLaser() {
    cells[laserPosition].classList.remove('laser')
  }

  //? REMOVE PLAYER AND ENEMIES

  function removePlayer() {
    cells[playerPosition].classList.remove('player')
  }

  function removeAllEnemies() {
    enemiesRow1Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-1'))
    enemiesRow2Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-2'))
    enemiesRow3Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-3'))
    enemiesRow4Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-4'))
    enemiesRow5Array.forEach(enemy => cells[enemyPosition + enemy].classList.remove('enemy-row-5'))
  }
  // CREATE ALL ENEMY ROWS COMBINED FUNCTION
  function createAllEnemies() {
    createEnemyRow1()
    // createEnemyRow2()
    // createEnemyRow3()
    // createEnemyRow4()
    // createEnemyRow5()
  }

  //* DOM EVENTS //
  //CLICKS
  resetButton.addEventListener('click', resetClick)
  startButton.addEventListener('click', startClick)
  //KEYS
  document.addEventListener('keyup', startEnter)
  document.addEventListener('keydown', movePlayer)
  document.addEventListener('keyup', resetKey)









  //* GAME FUNCTIONS //

  //? START GAME - BUTTON AND ENTER KEY

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

  //? RESET GAME - BUTTON AND KEYBOAD INPUT
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

  //* MOVEMENT //

  //? MOVE PLAYER WITH KEYS

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
    } else if (e.keyCode === 32) {
      moveLaser()
    }
  }


  //* ENEMY MOVEMENT



  //? DEFINE TOP LIMIT

  


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
      numberOfMoves++
      if (numberOfMoves === 6) {
        createEnemyRow1()
        numberOfMoves = 0
        isMovingRight = !isMovingRight
      }
    }, 500)
  }


  //* PLAYER SHOOT


  let laserTimerId = null

  function moveLaser() {
    laserPosition = playerPosition
    let laserMoves = 0


    laserTimerId = setInterval(() => {  
      // laserPosition = laserPosition - width??
      if (cells[laserPosition].classList.contains('enemy') || laserPosition < width) {            
        cells[laserPosition].classList.remove('enemy')
        removeLaser() 
        clearInterval(laserTimerId)
      } else {
        removeLaser()
        laserPosition = laserPosition - width
        createLaser()
      }
      laserMoves++
      if (laserMoves === 15) {
        removeLaser()
        clearInterval()
      }
      // if (enemiesRow1Array.includes(laserPosition)) {
      //   enemiesRow1Array = enemiesRow1Array.filter(enemy => {
      //     enemy !== laserPosition
      //     console.log(laserPosition)
      //   })
      // }
      // isLaserMoving = false

    }, 50)
  }

  //* DECLARE FUNCTIONS ON LOAD

  makeGrid()
  createAllEnemies()
  createPlayer()


  // PRINT PRESSED KEYCODE IN CONSOLE:
  // function printKey(e) {
  //   console.log(e.keyCode)
  // }
  // document.addEventListener('keyup', printKey)
}

document.addEventListener('DOMContentLoaded', init)