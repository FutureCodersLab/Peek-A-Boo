let currentTile = { sully: null, randall: null };
let score = 0;
let isGameOver = false;

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    createBoard(board);

    setInterval(() => setCharacter("sully", "./images/sully.png"), 1500);
    setInterval(() => setCharacter("randall", "./images/randall.png"), 2000);
});

const createBoard = (board) => {
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }
};

const getRandomTile = () => Math.floor(Math.random() * 9).toString();

const setCharacter = (character, src) => {
    if (isGameOver) return;

    const prevTile = currentTile[character];
    if (prevTile) prevTile.innerHTML = "";

    const randomNumber = getRandomTile();
    if (isTileOccupied(randomNumber)) return;

    const tile = document.getElementById(randomNumber);
    addCharacterToTile(tile, src);
    currentTile[character] = tile;

    setTimeout(() => clearTile(character), Math.random() * 1000 + 500);
};

const addCharacterToTile = (tile, src) => {
    const img = document.createElement("img");
    img.src = src;
    tile.appendChild(img);
};

const isTileOccupied = (randomNumber) =>
    currentTile.sully?.id === randomNumber ||
    currentTile.randall?.id === randomNumber;

const clearTile = (character) => {
    if (currentTile[character]) currentTile[character].innerHTML = "";
};

const selectTile = function () {
    if (isGameOver || !this.innerHTML) return;

    if (this === currentTile.sully) {
        updateScore(10);
        clearTile("sully");
    } else if (this === currentTile.randall) {
        endGame();
    }
};

const updateScore = (points) => {
    score += points;
    document.getElementById("score").textContent = score.toString();
};

const endGame = () => {
    isGameOver = true;
    document.getElementById("score").textContent = `GAME OVER: ${score}`;
    disableBoard();
    showRestartButton();
};

const disableBoard = () => {
    const tiles = document.getElementById("board").children;
    for (let tile of tiles) {
        tile.removeEventListener("click", selectTile);
    }
};

const showRestartButton = () => {
    const restart = document.getElementById("restart");
    restart.classList.add("active");
    restart.addEventListener("click", restartGame);
};

const restartGame = () => {
    isGameOver = false;
    score = 0;

    document.getElementById("score").textContent = score.toString();
    resetBoard();
};

const resetBoard = () => {
    const tiles = document.getElementById("board").children;
    for (let tile of tiles) {
        tile.innerHTML = "";
        tile.addEventListener("click", selectTile);
    }
};
