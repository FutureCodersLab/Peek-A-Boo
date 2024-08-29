let currentTile = { sully: null, randall: null };
let score = 0;
let isGameOver = false;

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");

    for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }
    setInterval(() => setCharacter("sully"), 1500);
    setInterval(() => setCharacter("randall"), 2000);
});

const getRandomTile = () => Math.floor(Math.random() * 9).toString();

const setCharacter = (character) => {
    if (isGameOver) return;

    clearTile(character);

    const randomTile = getRandomTile();
    if (isTileOccupied(randomTile)) return;
    const tile = document.getElementById(randomTile);

    const img = document.createElement("img");
    img.src = `./images/${character}.png`;
    tile.appendChild(img);

    currentTile[character] = tile;
    setTimeout(() => clearTile(character), 1000);
};

const isTileOccupied = (randomTile) =>
    currentTile.sully?.id === randomTile ||
    currentTile.randall?.id === randomTile;

const clearTile = (character) => {
    if (currentTile[character]) currentTile[character].innerHTML = "";
};

const selectTile = (e) => {
    const tile = e.target;
    if (isGameOver || tile.children.length === 0) return;

    if (tile === currentTile.sully) {
        updateScore(10);
        clearTile("sully");
    } else if (tile === currentTile.randall) {
        isGameOver = true;
        document.getElementById("score").textContent = `GAME OVER: ${score}`;
        showRestartButton();
    }
};

const updateScore = (points) => {
    score += points;
    document.getElementById("score").textContent = score.toString();
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
    const restart = document.getElementById("restart");
    restart.classList.remove("active");
};
