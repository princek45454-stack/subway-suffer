const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");

let score = 0;
let speed = 4;
let gameOver = false;

let playerLeft = 175;
let isJumping = false;

/* Controls */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && playerLeft > 0) {
    playerLeft -= 50;
  }
  if (e.key === "ArrowRight" && playerLeft < 350) {
    playerLeft += 50;
  }
  if (e.key === "ArrowUp" && !isJumping) {
    jump();
  }
  player.style.left = playerLeft + "px";
});

/* Jump */
function jump() {
  isJumping = true;
  let up = 0;

  const jumpUp = setInterval(() => {
    if (up >= 100) {
      clearInterval(jumpUp);
      const fallDown = setInterval(() => {
        if (up <= 0) {
          clearInterval(fallDown);
          isJumping = false;
        }
        up -= 5;
        player.style.bottom = 50 + up + "px";
      }, 20);
    }
    up += 5;
    player.style.bottom = 50 + up + "px";
  }, 20);
}

/* Obstacles */
function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  let left = Math.floor(Math.random() * 8) * 50;
  obstacle.style.left = left + "px";

  game.appendChild(obstacle);

  let obstacleTop = -60;

  const moveObstacle = setInterval(() => {
    if (gameOver) {
      clearInterval(moveObstacle);
      return;
    }

    obstacleTop += speed;
    obstacle.style.top = obstacleTop + "px";

    /* Collision */
    if (
      obstacleTop > 500 &&
      obstacleTop < 550 &&
      left === playerLeft &&
      !isJumping
    ) {
      endGame();
    }

    if (obstacleTop > 600) {
      clearInterval(moveObstacle);
      obstacle.remove();
      score++;
      speed += 0.1;
      scoreText.innerText = "Score: " + score;
    }
  }, 20);

  setTimeout(createObstacle, 1200);
}

function endGame() {
  gameOver = true;
  gameOverScreen.style.display = "block";
}

createObstacle();
