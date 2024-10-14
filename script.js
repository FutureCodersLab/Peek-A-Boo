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

const getRandomTileId = () => Math.floor(Math.random() * 9).toString();

const setCharacter = (character) => {
    if (isGameOver) return;

    clearTile(character);

    const randomTileId = getRandomTileId();
    if (isTileOccupied(randomTileId)) return;
    const randomTile = document.getElementById(randomTileId);

    const img = document.createElement("img");
    img.src = `./images/${character}.png`;
    randomTile.appendChild(img);

    currentTile[character] = randomTile;
    setTimeout(() => clearTile(character), 1000);
};

const isTileOccupied = (randomTileId) =>
    currentTile.sully?.id === randomTileId ||
    currentTile.randall?.id === randomTileId;

const clearTile = (character) => {
    if (currentTile[character]) currentTile[character].innerHTML = "";
};

const selectTile = (e) => {
    const selectedTile = e.target;
    if (isGameOver || selectedTile.children.length === 0) return;

    if (selectedTile === currentTile.sully) {
        updateScore(10);
        clearTile("sully");
    } else if (selectedTile === currentTile.randall) {
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
