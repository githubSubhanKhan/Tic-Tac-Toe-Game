let boxes = document.querySelectorAll(".box");
let newBtn = document.querySelector(".newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector(".msg");
let audio = document.querySelector("#clickAudio");
let winneraudio = document.querySelector("#winnerAudio");
let overaudio = document.querySelector("#gameOveraudio");

// Feature 1
let containerDiv = document.querySelector(".container");
let newBtnDiv = document.querySelector("#newBtn");
let userInfoContainer = document.querySelector(".userInfoContainer");
let leftArea = document.querySelector(".leftArea");
let rightArea = document.querySelector(".rightArea");

let score1 = 0;
let score2 = 0;

let player1Score = document.querySelector(".player1Score");
let player2Score = document.querySelector(".player2Score");
let player1Name = document.querySelector(".player1Name");
let player2Name = document.querySelector(".player2Name");

let left = false;
let right = false;

containerDiv.classList.add("hide");
newBtnDiv.classList.add("hide");

let userName1;
let userName2;

function saveUserInfo() {
  userName1 = document.querySelector("#userName1").value;
  userName2 = document.querySelector("#userName2").value;

  const userInfo = {
    user1: userName1,
    user2: userName2,
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  player1Name.innerHTML = userName1;
  player2Name.innerHTML = userName2;
  console.log(userInfo);
  playGame();
}

let winIcon = '<i class="fa-solid fa-chess-king"></i>';
let overIcon = '<i class="fa-solid fa-skull-crossbones"></i>';

let turnX = true;

let count = 0;

let winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const playGame = () => {
  containerDiv.classList.remove("hide");
  newBtnDiv.classList.remove("hide");
  userInfoContainer.classList.add("hide");

  leftArea.addEventListener("click", () => {
    left = true;
    console.log(left);
  });

  rightArea.addEventListener("click", () => {
    right = true;
    console.log(right);
  });

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      audio.play();
      if (turnX) {
        turnX = false;
        box.innerText = "X";
        newBtn.addEventListener("click", newGame);
      } else {
        turnX = true;
        box.innerText = "O";
        newBtn.addEventListener("click", newGame);
      }
      box.disabled = true;
      count++;

      let iswinner = checkWInner(left, right);

      if (count === 9 && !iswinner) {
        gameDraw();
      }
    });
  });
};

const gameDraw = () => {
  overaudio.play();
  msg.innerHTML = `${overIcon} Game Tied ${overIcon}`;
  msgContainer.classList.remove("hide");
};

const disabledboxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const enabledboxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerHTML = `${winIcon} Congratulations! Player '${winner}' ${winIcon}`;
  msgContainer.classList.remove("hide");
};

const newGame = () => {
  turnX = true;
  count = 0;
  left = false;
  right = false;
  enabledboxes();
  msgContainer.classList.add("hide");
};

const checkWInner = (left, right) => {
  for (let pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        disabledboxes();
        winneraudio.play();
        if (left) {
          showWinner(pos1Val);
          score1 += 1;
          player1Score.innerHTML = score1;
        } else {
          showWinner(pos1Val);
          score2 += 1;
          player2Score.innerHTML = score2;
        }
      }
    }
  }
};

newBtn.addEventListener("click", newGame);
