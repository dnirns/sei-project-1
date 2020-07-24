function init() {

  //* GENERATE GRID //
  const width = 16
  const numberOfCells = width * width

  function makeGrid() {
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
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
  const gameWrapper = document.querySelector('.game-wrapper')
  const grid = document.querySelector('.game-grid')
  const startButton = document.querySelector('#start-button')
  const resetButton = document.querySelector('#reset-button')
  const resetButtonWIn = document.querySelector('#reset-button-win')
  const gameOverText = document.querySelector('.game-over')
  const gameWonText = document.querySelector('.game-won')

  //? AUDIO
  const startButtonSfx = new Audio('./assets/audio/start-hover-audio.wav')
  const startSfx = new Audio('./assets/audio/Retro_Game_Sounds_SFX_36.wav')
  const music = new Audio('./assets/audio/Feeble-Screams-from-Forests-unknown-8 bit.mp3')
  const musicWin = new Audio('./assets/audio/8-Bit Trivium - Like Light To The Flies..mp3')
  const laserAudio = new Audio('./assets/audio/laser_014.mp3')
  
  const enemyHitAudio = new Audio('./assets/audio/explosion_29.wav')
  const enemyDeathAudio = new Audio('./assets/audio/ghost-death.mp3')
  const gameOverLaugh = new Audio('./assets/audio/wickedmalelaugh1.mp3')
  const gameOverAmbience = new Audio('./assets/audio/game-over-ambient.mp3')
 
 

  //* DOM EXECUTION //
  //? CREATE PLAYER AND ENEMIES
  function createPlayer() {
    cells[playerPosition].classList.add('player')
  }

  function createAllEnemies() {
    enemyPositions.forEach(enemy => cells[enemy].classList.add('ghost-shriek'))
  }

  //? REMOVE PLAYER AND ENEMIES
  function removePlayer() {
    cells[playerPosition].classList.remove('player')
  }

  function removeAllEnemies() {
    enemyPositions.forEach(enemy => cells[enemy].classList.remove('ghost-shriek'))
  }
  // function startButtonHover() {
  //   startButtonSfx.play()
  // }

  //* DOM EVENTS //
  //? CLICKS
  resetButton.addEventListener('click', resetClick)
  resetButtonWIn.addEventListener('click', resetClick)
  startButton.addEventListener('click', startClick)
  // startButton.addEventListener('mouseover', startButtonHover)
  //? KEYS
  document.addEventListener('keyup', startEnter)
  document.addEventListener('keydown', movePlayer)
  // document.addEventListener('keyup', resetKey)


  //* GAME FUNCTIONS //
  //? START GAME - BUTTON AND ENTER KEY
  function startClick() {
    startSfx.play()
    music.play()    
    startButton.style.visibility = 'hidden'
    gameWrapper.style.visibility = 'visible'
    createPlayer()
    createAllEnemies()
    moveEnemies()
  }

  function startEnter(e) {
    if (e.keyCode === 13) {  
      startClick()
    }
  }

  //? RESET GAME - BUTTON AND KEYBOAD INPUT
  function resetClick() {
    startSfx.play()
    location.reload()
  }
  // function resetKey(e) {  
  //   if (e.keyCode === 82) {
  //     startSfx.play()
  //     location.reload() 
  //   }
  // }


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
      clearTimeout(explosionTimeoutId)
      moveLaser()
    }
    if (cells[playerPosition].classList.contains('ghost-shriek')) {
      console.log('player moved onto enemy')
      cells[playerPosition].classList.add('explosion-no-loop')
      removePlayer()
      removeAllEnemies()
      gameOverLaugh.play()
      music.pause()
      music.currentTime = 0
      gameOverAmbience.play()
      gameOverText.style.visibility = 'visible'
      resetButton.style.visibility = 'visible'
      gameWrapper.style.visibility = 'hidden'
      resetButton.style.animation = 'blink 2s linear infinite'
      clearInterval(enemyTimerId)
    }
  }

  //* ENEMY MOVEMENT
 
  function moveEnemiesRight() {
    removeAllEnemies()
    enemyPositions = enemyPositions.map(enemy => enemy + 1)
    createAllEnemies()
  }

  function moveEnemiesLeft() {
    removeAllEnemies()
    enemyPositions = enemyPositions.map(enemy => enemy - 1)
    createAllEnemies()
  }

  function moveEnemiesDown() {
    removeAllEnemies()
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
        cells[playerPosition].classList.add('explosion-no-loop')
        removePlayer()
        removeAllEnemies()
        gameOverLaugh.play()
        music.pause()
        music.currentTime = 0
        gameOverAmbience.play()
        gameOverText.style.visibility = 'visible'
        resetButton.style.visibility = 'visible'
        gameWrapper.style.visibility = 'hidden'
        resetButton.style.animation = 'blink 2s linear infinite'
        clearInterval(enemyTimerId)
      }
      if (cells[playerPosition].classList.contains('ghost-shriek')) {
        cells[playerPosition].classList.add('explosion-no-loop')
        removePlayer()
        removeAllEnemies()
        gameOverLaugh.play()
        music.pause()
        music.currentTime = 0
        gameOverAmbience.play()
        gameOverText.style.visibility = 'visible'
        resetButton.style.visibility = 'visible'
        gameWrapper.style.visibility = 'hidden'
        resetButton.style.animation = 'blink 2s linear infinite'
        clearInterval(enemyTimerId)
      }

    }, 500)
  }


  //* PLAYER SHOOT
  function createLaser() {
    laserAudio.play()
    cells[laserPosition].classList.add('laser')
  }

  function removeLaser() {
    cells[laserPosition].classList.remove('laser')
  }
 
  function addExplosion() {
    // explosionAudio.play()
    cells[laserPosition].classList.add('explosion')
  }

  let isLaserShooting = true
  let laserTimerId = null
  let explosionTimeoutId = null

  function moveLaser() {
    if (!isLaserShooting) {
      return
    }
    isLaserShooting = false
    laserPosition = playerPosition
    const laserMovingUp = true
    clearInterval(laserTimerId)
    laserTimerId = setInterval(() => {
      if (cells[laserPosition].classList.contains('ghost-shriek')) {
        isLaserShooting = true
        clearInterval(laserTimerId)
        cells[laserPosition].classList.remove('ghost-shriek')
        enemyPositions = enemyPositions.filter(enemy => enemy !== laserPosition)
        removeLaser()
        addExplosion()
        enemyHitAudio.play()
        enemyDeathAudio.play()
        explosionTimeoutId = setTimeout(() => {
          cells[laserPosition].classList.remove('explosion')
        }, 300)
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
        music.pause()
        music.currentTime = 0
        musicWin.play()
        gameWrapper.style.visibility = 'hidden'
        gameWonText.style.visibility = 'visible'
        resetButtonWIn.style.visibility = 'visible'
      }
    }, 30)
  }

  //* FUNCTIONS ON LOAD

  makeGrid()

}

document.addEventListener('DOMContentLoaded', init)