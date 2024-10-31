let currentDoor = { sully: null, randall: null };

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    for (let i = 0; i < 9; i++) {
        const door = document.createElement("div");
        door.id = i.toString();
        board.appendChild(door);
    }

    setInterval(() => setCharacter("sully"), 1500);
    setInterval(() => setCharacter("randall"), 2000);
});

const getRandomDoorId = () => Math.floor(Math.random() * 9).toString();

const setCharacter = (character) => {
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
