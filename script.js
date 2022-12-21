const playerLeft = document.getElementById("player_left");
const playerRight = document.getElementById("player_right");

const leftTotalScore = document.getElementById("point_total_left");
const rightTotalScore = document.getElementById("point_total_right");
const leftCurrentScore = document.getElementById("point_current_left");
const rightCurrentScore = document.getElementById("point_current_right");

const imgDice = document.getElementById("img_dice");
const btnNewGame = document.getElementById("button_new_game");
const btnRoll = document.getElementById("button_roll");
const btnHold = document.getElementById("button_hold");

let currentScore;
let totalScore;
let activePlayer;

init();

btnNewGame.addEventListener("click", function () {
  init();
  finalScore();

  leftCurrentScore.textContent = 0;
  rightCurrentScore.textContent = 0;
  imgDice.src = "./assets/images/dice0.png";

  btnRoll.disabled = false;
  btnHold.disabled = false;

  if (playerLeft.classList.contains("--right"))
    playerLeft.classList.remove("--right");
  if (!playerLeft.classList.contains("--left"))
    playerLeft.classList.add("--left");
  if (playerRight.classList.contains("--left"))
    playerRight.classList.remove("--left");
  if (!playerRight.classList.contains("--right"))
    playerRight.classList.add("--right");

  if (!(playerLeft.style.opacity === 1)) playerLeft.style.opacity = "";
  if (!(playerRight.style.opacity === 0.5)) playerRight.style.opacity = "";
});

btnRoll.addEventListener("click", function () {
  const random_number = Number(Math.floor(Math.random() * 6) + 1);
  currentScore += random_number;
  imgDice.src = `./assets/images/dice${random_number}.png`;

  if (random_number !== 1) {
    liveScore();
  } else {
    activeSide();
  }
});

btnHold.addEventListener("click", function () {
  totalScore[activePlayer ? 0 : 1] += currentScore;
  winningCondition();
  finalScore();
  liveScore();
  activeSide();
});

function init() {
  currentScore = 0;
  totalScore = [0, 0];
  activePlayer = true;
}

function liveScore() {
  if (activePlayer) {
    leftCurrentScore.textContent = currentScore;
  } else {
    rightCurrentScore.textContent = currentScore;
  }
}

function finalScore() {
  leftTotalScore.textContent = totalScore[0];
  rightTotalScore.textContent = totalScore[1];
}

function activeSide() {
  currentScore = 0;
  liveScore();
  activePlayer = !activePlayer;
  playerLeft.classList.toggle("--left");
  playerLeft.classList.toggle("--right");
  playerRight.classList.toggle("--right");
  playerRight.classList.toggle("--left");
}

function winningCondition() {
  if (totalScore[0] >= 50 || totalScore[1] >= 50) {
    if (activePlayer) {
      playerLeft.style.opacity = "1";
      playerRight.style.opacity = "0.2";
    } else {
      playerRight.style.opacity = "1";
      playerLeft.style.opacity = "0.2";
    }
    btnRoll.disabled = true;
    btnHold.disabled = true;
  }
}
