let currentTile = { sully: null, randall: null };
let score = 0;
let isGameOver = false;

document.addEventListener("DOMContentLoaded", setGame);

function setGame() {
    const board = document.getElementById("board");
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }

    setInterval(() => setCharacter("sully", "./images/sully.png"), 1500);
    setInterval(() => setCharacter("randall", "./images/randall.png"), 2000);
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setCharacter(character, imgSrc) {
    if (isGameOver) return;

    const prevTile = currentTile[character];
    if (prevTile) prevTile.innerHTML = "";

    const randomNumber = getRandomTile();
    if (
        currentTile.sully?.id === randomNumber ||
        currentTile.randall?.id === randomNumber
    )
        return;

    const tile = document.getElementById(randomNumber);
    const img = document.createElement("img");
    img.src = imgSrc;
    tile.appendChild(img);

    currentTile[character] = tile;

    setTimeout(() => {
        if (currentTile[character]) currentTile[character].innerHTML = "";
    }, Math.random() * 1000 + 500);
}

function selectTile() {
    if (isGameOver) return;

    const restart = document.getElementById("restart");
    const scoreCounter = document.getElementById("score");

    if (this === currentTile.sully) {
        score += 10;
        scoreCounter.textContent = score.toString();
        currentTile.sully.innerHTML = "";
    } else if (this === currentTile.randall) {
        isGameOver = true;
        scoreCounter.textContent = `GAME OVER: ${score}`;

        disableBoard();
        restart.classList.add("active");
        restart.addEventListener("click", restartGame);
    }
}

function disableBoard() {
    const tiles = document.getElementById("board").children;
    for (let tile of tiles) {
        tile.removeEventListener("click", selectTile);
    }
}

function restartGame() {
    isGameOver = false;
    score = 0;

    const scoreCounter = document.getElementById("score");
    scoreCounter.textContent = score.toString();

    const tiles = document.getElementById("board").children;
    for (let tile of tiles) {
        tile.innerHTML = "";
        tile.addEventListener("click", selectTile);
    }
}
