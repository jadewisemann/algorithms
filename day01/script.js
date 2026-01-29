const cells = document.getElementsByClassName("cell")


const game = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]

let curr = 0
const plays = ['X', 'O']

const checkIsWin = () => {
  for (let r = 0; r < 3; r++) {
    if (
      game[r][0] !== 0 
      && game[r][0] === game[r][1]
      && game[r][1] === game[r][2]
    ) {
      return game[r][0];
    }
  }

  for (let c = 0; c < 3; c++) {
    if (
      game[0][c] !== 0
      && game[0][c] === game[1][c]
      && game[1][c] === game[2][c] 
    ) {
      return game[0][c];
    }
  }

  if (
    game[0][0] !== 0
    && game[0][0] === game[1][1]
    && game[1][1] === game[2][2]
  ) {
    return game[0][0];
  }

  if (
    game[0][2] !== 0
    && game[0][2] === game[1][1]
    && game[1][1] === game[2][0]
  ) {
    return game[0][2];
  }

  return null;
}



const markToGame = (cell, mark) => {
  const row = cell.getAttribute('row')
  const col = cell.getAttribute('col')
  game[row][col] =  mark

  const winner = checkIsWin();

  if (winner) {
    setTimeout(() => {
      alert(`${winner} win`);
      location.reload()
    }, 10)
  }
}

const handleCellClick = e => {
  const cell = e.target
  const mark = plays[curr]
  const row = cell.getAttribute('row')
  const col = cell.getAttribute('col')
  if(game[row][col] !== 0){
    return null
  }
  cell.innerText = mark
  curr = (curr + 1) % 2
  markToGame(cell, mark)
}
 
for (cell of cells) {
  cell.addEventListener('click', e => handleCellClick(e))
}



