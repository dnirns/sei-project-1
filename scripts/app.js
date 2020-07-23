function init() {
  //* GENERATE GRID //
  const width = 16
  const numberOfCells = width * width
  function makeGrid() {
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      // cell.innerHTML = i
      grid.appendChild(cell)
    }
  }
  //* GAME ARRAYS AND GLOBAL VARIABLES //
  const cells = []
  const enemiesRow1Array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const enemiesRow2Array = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
  const enemiesRow3Array = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
  const enemiesRow4Array = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
  const enemiesRow5Array = [64, 65, 66, 67, 68, 69, 70, 71, 72, 73]
  let enemyPositions = enemiesRow1Array.concat(enemiesRow2Array).concat(enemiesRow3Array).concat(enemiesRow4Array).concat(enemiesRow5Array)
  let enemyDirection = true
  let movesSinceDirectionSwitch = 0
  const maxMovesInDirection = 6
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
  //? REMOVE PLAYER AND ENEMIES
  function removePlayer() {
    cells[playerPosition].classList.remove('player')
  }
  function removeAllEnemies() {
    enemyPositions.forEach(enemy => cells[enemy].classList.remove('ghost-shriek'))
  }
  // CREATE ALL ENEMY ROWS COMBINED FUNCTION
  function createAllEnemies() {
    enemyPositions.forEach(enemy => cells[enemy].classList.add('ghost-shriek'))
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
    // createPlayer()
    // createAllEnemies()
    moveEnemies()
  }
  function startEnter(e) {
    if (e.keyCode === 13) {
      // createPlayer()
      // createAllEnemies()
      moveEnemies()
    }
  }
  //? RESET GAME - BUTTON AND KEYBOAD INPUT
  function resetClick() {
    clearInterval(enemyTimerId)
    removePlayer()
    playerPosition = 240
    removeAllEnemies()
  }
  function resetKey(e) {
    if (e.keyCode === 82) {
      clearInterval(enemyTimerId)
      removePlayer()
      playerPosition = 240
      removeAllEnemies()
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
  function removeAllEnemyClasses() {
    enemyPositions.forEach(enemy => cells[enemy].classList.remove('ghost-shriek'))
  }
  function moveEnemiesRight() {
    removeAllEnemyClasses()
    enemyPositions = enemyPositions.map(enemy => enemy + 1)
    createAllEnemies()
  }
  function moveEnemiesLeft() {
    removeAllEnemyClasses()
    enemyPositions = enemyPositions.map(enemy => enemy - 1)
    createAllEnemies()
  }
  function moveEnemiesDown() {
    removeAllEnemyClasses()
    enemyPositions = enemyPositions.map(enemy => enemy += width)
    createAllEnemies()
  }


  const bottomLeftGridIndex = (width * width) - width + 1  

  let enemyTimerId = null
  function moveEnemies() {   
    clearInterval(enemyTimerId)
    enemyTimerId = setInterval(() => {
      if (enemyDirection) {
        moveEnemiesRight()
      } else {
        moveEnemiesLeft()
      }
      movesSinceDirectionSwitch++
      if (movesSinceDirectionSwitch >= maxMovesInDirection) {
        movesSinceDirectionSwitch = 0
        enemyDirection = !enemyDirection
        moveEnemiesDown()
      }
      if (cells[bottomLeftGridIndex].classList.contains('ghost-shriek')) {
      
        console.log('enemies over boundries - game over')
        
        clearInterval(enemyTimerId)
      }
      if (cells[playerPosition].classList.contains('ghost-shriek')) {
        console.log('player hit - game over')
        clearInterval(enemyTimerId)
      }

    }, 666)
  }

    
  
  //* PLAYER SHOOT
  function createLaser() {
    cells[laserPosition].classList.add('laser')
  }
  function removeLaser() {
    cells[laserPosition].classList.remove('laser')
  }

  let isLaserShooting = true

  let laserTimerId = null
  let explosionTimeoutId = null


  function addExplosion() {
    cells[laserPosition].classList.add('explosion')
  }

  function moveLaser() {
    if (!isLaserShooting) {       
      return
    }
    isLaserShooting = false

    laserPosition = playerPosition

    const laserMovingUp = true
  
    // clearTimeout(explosionTimerId)
    clearInterval(laserTimerId)

    
    
    laserTimerId = setInterval(() => {  
      
      
      if (cells[laserPosition].classList.contains('ghost-shriek')) {
        isLaserShooting = true 
        clearInterval(laserTimerId)               
        cells[laserPosition].classList.remove('ghost-shriek')    
        enemyPositions = enemyPositions.filter(enemy => enemy !== laserPosition)
        removeLaser()  
        addExplosion()                    
        explosionTimeoutId = setTimeout(() => {         
          cells[laserPosition].classList.remove('explosion')
            
        }, 200 )  
        
        
  
      } else if (laserPosition < width) {            
                    
        removeLaser()     
        isLaserShooting = true
      } else if (laserMovingUp) {     
             
        removeLaser()
        laserPosition = laserPosition - width
        createLaser()  
        

      }
      if (Array.isArray(enemyPositions) && enemyPositions.length) {
        console.log(enemyPositions.length + ' enemies still alive')
      } else {
        cells[laserPosition].classList.remove('ghost-shriek') 
        enemyPositions = enemyPositions.filter(enemy => enemy !== laserPosition)   
        removeLaser()
        removePlayer()
        removeAllEnemies()
        clearInterval(laserTimerId)
        clearInterval(enemyTimerId)
        alert('WINNER WINNER!')
      }     
    }, 25)

    

  }

  //* SPRITES
  
 
  //* GAME OVER


  //?LOSE - RESET AND THROW MESSAGE
  //? IF ENEMIES COLLIDE WITH PLAYER
  //? IF ENEMY LASER COLLIDES WITH PLAYER
  //?WIN:
  //? NO ENEMIES LEFT - WINNER MESSAGE / SCREEN AND RESET




  //* DECLARE FUNCTIONS ON LOAD
  makeGrid()
  createAllEnemies()
  createPlayer()
  
  
  // 
  // PRINT PRESSED KEYCODE IN CONSOLE:
  // function printKey(e) {
  //   console.log(e.keyCode)
  // }
  // document.addEventListener('keyup', printKey)
}

document.addEventListener('DOMContentLoaded', init)