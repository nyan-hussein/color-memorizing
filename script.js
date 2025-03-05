let sequence = [];
let playerSequence = [];
let level = 1;
let gameState = false;

const colors = document.querySelectorAll(".color-button");
disabledBtn();

document.getElementById("start").addEventListener("click", function () {
  restGame();
  generateSequence();
  setTimeout(showSequence, 900);
  gameState = true;
  document.getElementById("start").disabled = true;
  document.getElementById("start").style.pointerEvents = "none";
});

colors.forEach((color, index) => {
  color.addEventListener("click", function () {
    if (gameState) {
      handlePlayerClick(index);
    } else {
      return;
    }
  });
});

//----------functions

function handlePlayerClick(index) {
  playerSequence.push(index);
  checkPlyerN();
}
function checkPlyerN() {
  let over = false;
  for (let i = 0; i < playerSequence.length; i++) {
    if (sequence[i] !== playerSequence[i]) {
      over = true;
      break;
    }
  }
  if (over) {
    gameOver();
  } else if (playerSequence.length === sequence.length) {
 setTimeout(() => {
      document.getElementById("level-up").play();
      disabledBtn();
      setTimeout(() => {
        document.getElementById("score").textContent = "Score: " + level;
      }, 200);
      setTimeout(()=>{
        nextLevel();
         document.activeElement.blur();
      }, 500);
    }, 500);
  }
}

function generateSequence() {
  for (let i = 0; i < level; i++) {
    sequence.push(Math.floor(Math.random() * 12));
  }
}
function nextLevel() {
  level++;
  sequence = [];
  playerSequence = [];
  generateSequence();
  setTimeout(showSequence, 700);
}
function showSequence() {
  disabledBtn();
  sequence.forEach((se, index) => {
    setTimeout(() => {
      colors[se].classList.add("highlight");
    }, 1000 * index);
    setTimeout(() => {
      colors[se].classList.remove("highlight");
    }, 1000 * index + 400);
  });
  setTimeout(() => {
    activeBtn();
  }, 1000 * sequence.length + 400);
}

function disabledBtn() {
  colors.forEach((color, index) => {
    color.disabled = true;
    color.style.pointerEvents = "none";
    color.classList.add("disable");
  });
}
function activeBtn() {
  colors.forEach((color) => {
    color.classList.remove("disable");
    color.style.pointerEvents = "auto";
    color.disabled = false;
  });
}

function restGame() {
  sequence = [];
  playerSequence = [];
  level = 1;
}
function gameOver() {
  document.getElementById("game-over").play();
  disabledBtn();
  document.getElementById("start").disabled = false;
  document.getElementById("start").style.pointerEvents = "auto";
  const message = document.getElementById("message");
  message.style.visibility = "visible";
  message.classList.remove("hide");
  message.classList.add("show");
  document.querySelector(".container").classList.add("message-background");
  document.getElementById("score-value").textContent = level - 1;
  document.getElementById("score-number").textContent = level;
  setTimeout(() => {
    document.addEventListener("click", function removeMessage() {
      message.classList.remove("show");
      message.classList.add("hide");
      setTimeout(() => {
        message.style.visibility = "hidden";
      }, 500);
      document
        .querySelector(".container")
        .classList.remove("message-background");
      document.removeEventListener("click", removeMessage);
    });
  }, 200);
  restGame();
  document.getElementById("score").textContent = "Score: 0";
}
