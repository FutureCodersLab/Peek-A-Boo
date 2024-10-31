let currentDoor = { sully: null, randall: null };
let score = 0;
let isGameOver = false;

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");

    for (let i = 0; i < 9; i++) {
        const door = document.createElement("div");
        door.id = i.toString();
        door.addEventListener("click", selectDoor);
        board.appendChild(door);
    }
    setInterval(() => setCharacter("sully"), 1500);
    setInterval(() => setCharacter("randall"), 2000);
});

const getRandomDoorId = () => Math.floor(Math.random() * 9).toString();

const setCharacter = (character) => {
    if (isGameOver) return;

    clearDoor(character);

    const randomDoorId = getRandomDoorId();
    if (isDoorOccupied(randomDoorId)) return;
    const randomDoor = document.getElementById(randomDoorId);

    const img = document.createElement("img");
    img.src = `./images/${character}.png`;
    randomDoor.appendChild(img);

    currentDoor[character] = randomDoor;
    setTimeout(() => clearDoor(character), 1000);
};

const isDoorOccupied = (randomDoorId) =>
    currentDoor.sully?.id === randomDoorId ||
    currentDoor.randall?.id === randomDoorId;

const clearDoor = (character) => {
    if (currentDoor[character]) currentDoor[character].innerHTML = "";
};

const selectDoor = (e) => {
    const selectedDoor = e.target;
    if (isGameOver || selectedDoor.children.length === 0) return;

    if (selectedDoor === currentDoor.sully) {
        updateScore();
        clearDoor();
    }
    if (selectedDoor === currentDoor.randall) {
        isGameOver = true;
        document.getElementById("score").textContent = `GAME OVER: ${score}`;
        showRestartButton();
    }
};

const updateScore = () => {
    score += 10;
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
    document.getElementById("restart").classList.remove("active");
};
