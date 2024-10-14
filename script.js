let currentTile = { sully: null, randall: null };

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div");
        tile.id = i.toString();
        board.appendChild(tile);
    }

    setInterval(() => setCharacter("sully"), 1500);
    setInterval(() => setCharacter("randall"), 2000);
});

const getRandomTileId = () => Math.floor(Math.random() * 9).toString();

const setCharacter = (character) => {
    const randomTileId = getRandomTileId();
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
