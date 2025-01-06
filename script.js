let currentDoor = { villain: null, hero: null };
let score = 0;
let isGameOver = false;

document.addEventListener("DOMContentLoaded", () => {
    const customCursor = document.createElement("div");
    customCursor.id = "custom-cursor";
    document.body.appendChild(customCursor);

    document.addEventListener("mousemove", (e) => {
        customCursor.style.left = `${e.pageX - 25}px`;
        customCursor.style.top = `${e.pageY - 25}px`;
    });

    const board = document.getElementById("board");

    for (let i = 0; i < 9; i++) {
        const door = document.createElement("div");
        door.id = i.toString();
        door.addEventListener("click", selectDoor);
        board.appendChild(door);
    }

    spinCursor(true);
    setInterval(() => setCharacter("villain"), 1500);
    setInterval(() => setCharacter("hero"), 2000);
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
    currentDoor.villain?.id === randomDoorId ||
    currentDoor.hero?.id === randomDoorId;

const clearDoor = (character) => {
    if (currentDoor[character]) currentDoor[character].innerHTML = "";
};

const selectDoor = (e) => {
    const selectedDoor = e.target;
    if (isGameOver || selectedDoor.children.length === 0) return;

    if (selectedDoor === currentDoor.villain) {
        updateScore();
        clearDoor();
    }
    if (selectedDoor === currentDoor.hero) {
        isGameOver = true;
        spinCursor(false);
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
    spinCursor(true);
};

const spinCursor = (shouldSpin) => {
    const customCursor = document.getElementById("custom-cursor");
    if (shouldSpin) {
        customCursor.classList.add("spinning");
    } else {
        customCursor.classList.remove("spinning");
    }
};
