const urlSearchParams = new URLSearchParams(window.location.search);
const timelimit = urlSearchParams.get("time");
const mines = urlSearchParams.get("mines");

const number_of_blocks = 25;
var score = 0;
var currentTime = timelimit;

document.querySelector("#timeval").textContent = timelimit;
document.querySelector("#scoreval").textContent = score;

const periodTimer = setInterval(function () {
  if (currentTime === 0) {
    gameOver();
    clearInterval(periodTimer);
  } else {
    currentTime--;
    document.querySelector("#timeval").textContent = currentTime;
  }
}, 1000);

function createBlocks() {
  var minesList = [];
  while (minesList.length < Number(mines)) {
    rn = getRandomMine();
    if (minesList.includes(rn)) {
      continue;
    }
    minesList.push(rn);
  }
  cluster = ``;
  for (var i = 1; i <= number_of_blocks; i++) {
    if (minesList.includes(i)) {
      cluster += `<div class="block"><span class="material-symbols-outlined">
      bomb</span></div>`;
    } else {
      cluster += `<div class="block"></div>`;
    }
  }
  document.querySelector("#pbtm").innerHTML = cluster;
}

function getRandomMine() {
  return Math.ceil(Math.random() * number_of_blocks);
}

function incrementScore() {
  score += Number(mines) + (60 - Number(timelimit)) / 10;
  document.querySelector("#scoreval").textContent = score;
}

function gameOver() {
  document.querySelector("#pbtm").style.display = "flex";
  document.querySelector(
    "#pbtm"
  ).innerHTML = `<div id="gameover"><div id="message">Game Over</div>
      <div id="score">Your Score: ${score}</div>
      <button id="restart-btn">Restart</button>
      </div>`;
  document.querySelector("#restart-btn").addEventListener("click", function () {
    window.location.reload();
  });
}

function clickEvent(ev) {
  if (ev.target.innerText === "0") {
    return;
  }
  if (ev.target.innerText === "bomb") {
    clearInterval(periodTimer);
    ev.target.innerHTML = `<span class="material-symbols-outlined">explosion</span>`;
    document
      .querySelectorAll(".material-symbols-outlined")
      .forEach((element) => {
        element.style.opacity = 1;
      });
    document.querySelector("#pbtm").removeEventListener("click", clickEvent);
    const timer = setTimeout(function () {
      gameOver();
      clearTimeout(timer);
    }, 2000);
  } else {
    if (ev.target.innerText === "") {
      ev.target.innerText = "0";
      ev.target.style.visibility = "hidden";
      incrementScore();
    }
  }
}

document.querySelector("#pbtm").addEventListener("click", clickEvent);

createBlocks();
