// TODO: write your code here

const playerOneRaceTrack = document.querySelector('#player1_race')
const playerTwoRaceTrack = document.querySelector('#player2_race')

const moveCarForward = (playerTrack) => {
  // define activeChild and nextChild //
  let activeChild
  let nextChild
  // get all of the <td> children from parent elem
  const allChildren = playerTrack.'querySelector('.active')
  activeChild.classList.toggle('active')
}

const handleKeyDown = (event) => {
  if (event.code === 'KeyQ') {
  // the user pressed Q //
    console.log('the user pressed Q')
    moveCarForward(playerOneRaceTrack)
  }

 if (event.code === 'KeyP') {
  // the user pressed P //
    console.log('the user pressed P')
    moveCarForward(playerTwoRaceTrack)
  }
}

document.addEventListener('keydown', handleKeyDown)

