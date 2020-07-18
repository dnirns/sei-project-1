function init() {


  //*ELEMENTS
  const grid = document.querySelector('.game-grid')
  const cells = []
  const startButton = document.querySelector('#start-button')
  const resetButton = document.querySelector('#reset-button')


  //?EXECUTION

  //*PLAYER AND ENEMIES

  //ADD PLAYER (+ SET START POSITION)
  let playerPosition = 390
  function createPlayer() {
    cells[playerPosition].classList.add('player')
  }
  //ADD ENEMY
  let enemyPosition = 10
  function createEnemy() {
    cells[enemyPosition].classList.add('enemy')
  }
  //REMOVE PLAYER
  function removePlayer() {
    cells[playerPosition].classList.remove('player')
  }
  //REMOVE ENEMY
  function removeEnemy() {
    cells[enemyPosition].classList.remove('enemy')
  }



  //* START GAME

  function startClick() {
    createPlayer()
    createEnemy()
  }
  function startEnter(e) {
    if (e.keyCode === 13) {
      createPlayer()
      createEnemy()
    }
  }


  //RESET - REMOVE PLAYER AND RESET POSITION FOR NEXT START
  function reset() {  
    removePlayer()
    playerPosition = 390
    removeEnemy()
    enemyPosition = 10
  }
  
  //MOVE PLAYER - left key 37 - right key 39
  //STOPPED PLAYER MOVEMENT PAST LIMITS BUT NEED TO FIND WAY TO NOT HARD CODE CELLS...
  function movePlayer(e){   
  
    const playerMoveLeft = playerPosition - 1
    const playerMoveRight = playerPosition + 1
    if (e.keyCode === 37 && playerPosition > 380) {
      removePlayer()
      playerPosition = playerMoveLeft
      createPlayer()
    } else if (e.keyCode === 39 && playerPosition < 399) {
      removePlayer()
      playerPosition = playerMoveRight
      createPlayer()
    } else {
      return false
    }
    
  } 
  

  //EVENTS
  resetButton.addEventListener('click', reset)
  startButton.addEventListener('click', startClick)
  document.addEventListener('keyup', startEnter)
  document.addEventListener('keydown', movePlayer)


  //MAKE GRID
  const width = 20
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
  //MAKE GRID ON LOAD
  makeGrid()


  //PRINT PRESSED KEYCODE IN CONSOLE:
  // function printKey(e) {
  //   console.log(e.keyCode)
  // }
  // document.addEventListener('keyup', printKey)





}

document.addEventListener('DOMContentLoaded', init)