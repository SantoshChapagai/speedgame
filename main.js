const circles = document.querySelectorAll('.circle')
const startButton = document.querySelector('#start')
const endButton = document.querySelector('#end')
const closeButton = document.querySelector('#close')
const scoreSpan = document.querySelector('.score')
const scoreEnd = document.querySelector('.scoreEnd')
const overlay = document.querySelector('.overlay')
let score = 0
let active = 0
let timer
let pace = 2000
let rounds = 0
const startSound = new Audio('sounds/start.mp3')
const playSound = new Audio('sounds/click.mp3')
const endSound = new Audio('sounds/end.mp3')
circles.forEach((circle, i) => {
  circle.addEventListener('click', () => clickCircle(i))
})
const getRndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const clickCircle = (i) => {
  playSound.play()
  startSound.pause()
  if (i !== active) {
    return endGame()
  }
  rounds -= 1
  score += 10
  scoreSpan.textContent = score
}
const enableCircles = () => {
  circles.forEach(circle => {
    circle.style.pointerEvents = 'auto'
  })
}
const startGame = () => {
  startSound.play()
  if (rounds >= 3) {
    return endGame()
  }
  startButton.classList.add('hidden')
  endButton.classList.remove('hidden')
  enableCircles()
  const nextActive = pickNew(active)
  circles[nextActive].classList.toggle('active')
  circles[active].classList.remove('active')
  active = nextActive
  timer = setTimeout(startGame, pace)
  pace -= 10
  rounds++
  function pickNew(active) {
    const nextActive = getRndInt(0, 3)
    if (nextActive !== active) {
      return nextActive
    }
    return pickNew(active)
  }
}
const endGame = () => {
  startSound.pause()
  endSound.play()
  scoreEnd.textContent = score
  if (score < 50) {
    scoreEnd.textContent = (score + ' Try better next time')
  } else if (score <= 100) {
    scoreEnd.textContent = (score + ' Great job, you are on right track')
  } else {
    scoreEnd.textContent = (score + ' You set the bar high, keep going')
  }
  endButton.classList.remove('hidden')
  startButton.classList.add('hidden')
  overlay.style.visibility = 'visible'
  clearTimeout(timer)
}
const resetGame = () => {
  window.location.reload()
}
startButton.addEventListener('click', startGame)
endButton.addEventListener('click', endGame)
closeButton.addEventListener('click', resetGame)
