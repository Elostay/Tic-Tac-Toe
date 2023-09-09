const content = document.querySelector(".js-content");
const combinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
  [3, 6, 9],
];
markup();
const historyX = [];
const historyO = [];
let player = "X";
function markup() {
  let markup = "";
  for (let i = 1; i <= 9; i += 1) {
    markup += `<div class="item" data-id ="${i}"></div>`;
  }
  content.innerHTML = markup;
}
content.addEventListener("click", onCellClick);

function onCellClick(event) {
  const target = event.target;
  if (target === event.currentTarget || target.textContent) {
    return;
  }
  const id = Number(target.dataset.id);
  let winner = false;

  if (player === "X") {
    historyX.push(id);
    winner = historyX.length >= 3 ? checkWinner(historyX) : false;
  } else {
    historyO.push(id);
    winner = historyO.length >= 3 ? checkWinner(historyO) : false;
  }

  if (winner) {
    const instance = basicLightbox.create(
      `<div class="box"><h1>Player ${player} is winner</h1></div>`
    );
    instance.show();
    resetGame();
    return;
  }
  if (historyX.length + historyO.length === 9) {
    const instance = basicLightbox.create(
      `<div class="box"><h1>It's DRAW</h1></div>`
    );
    instance.show();
    resetGame();
    return;
  }
  target.textContent = player;
  player = player === "X" ? "O" : "X";
}

function checkWinner(history) {
  return combinations.some((combination) =>
    combination.every((id) => history.includes(id))
  );
}

function resetGame() {
  markup();
  player = "X";
  historyX.splice(0);
  historyO.splice(0);
  return;
}
