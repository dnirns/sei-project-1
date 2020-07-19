function init() {


  //*ELEMENTS
  const grid = document.querySelector('.game-grid')
  const cells = []
  const startButton = document.querySelector('#start-button')
  const resetButton = document.querySelector('#reset-button') 
  // const moveEnemyButton = document.querySelector('#move-enemy')
  const enemies = [0, 1, 2, 3, 2, 4, 5, 6, 7, 8]
  let enemyPosition = 3

  //?EXECUTION

  //*PLAYER AND ENEMIES

  //ADD PLAYER (+ SET START POSITION)
  let playerPosition = 217
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
    cells[enemyPosition].classList.remove('enemy')
  }




  //* START GAME
  //BUTTON OR ENTER KEY STARTS GAME
  function startClick() {
    createPlayer()
    createEnemy()
    // moveEnemy()
  }
  function startEnter(e) {
    if (e.keyCode === 13) {
      createPlayer()
      createEnemy()
    }
  }

  //* RESET
  //BUTTON OR R KEY RESETS
  function resetClick() {  
    removePlayer()
    playerPosition = 217
    removeAllEnemies()
    enemyPosition = 3
  }

  function resetKey(e) {
    if (e.keyCode === 82) {
      removePlayer()
      playerPosition = 217
      removeAllEnemies()
      enemyPosition = 3
    }    
  }


  //* MOVEMENT

  //MOVE PLAYER WITH KEYS
  //STOPPED PLAYER MOVEMENT PAST GRID LIMIT BUT NEED TO FIND WAY TO NOT HARD CODE CELLS...
  function movePlayer(e){   
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
  function moveEnemy() {     
    setInterval(() => {   
      removeAllEnemies()  
      enemyPosition = enemyPosition + 1 
      createEnemy()
    }, 1000)  
  }


  //SET BOUNDARIES FOR ENEMIES:

  // const enemyLimitLeft = enemies[0] % width === 0
  // const enemyLimitRight = enemies[enemies.length -1] % width === width -1

  

  //*EVENTS
  //CLICKS
  resetButton.addEventListener('click', resetClick)
  startButton.addEventListener('click', startClick)
  startButton.addEventListener('click', moveEnemy)

  //KEYS
  document.addEventListener('keyup', startEnter)
  document.addEventListener('keydown', movePlayer)
  document.addEventListener('keyup', resetKey)




  //try to make 11 x 11 

  // GRID
  const width = 15
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