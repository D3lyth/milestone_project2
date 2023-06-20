let height = 6; // Number of guesses
let width = 5; //Number of letters/emojis
//Players guessing position
let row = 0; //current guess attempt
let col = 0; //current letter within attempt
let gameOver = false;
let word;
let testAnswer = document.getElementById("test_answer");

//Game to start on the loading of the screen
window.onload = function () {
	startGame();
}

function startGame() {
	// List of emojis to choose from
	const emojiList = [
		"\uD83C\uDF4E", // 🍎
		"\uD83E\uDD51", // 🥑
		"\uD83C\uDF2D", // 🌭
		"\uD83C\uDF51", // 🍑
		"\uD83E\uDDC0", // 🧀
		"\uD83C\uDF54", // 🍔
		"\uD83C\uDF36", // 🌶️
		"\uD83C\uDF2E", // 🌮
		"\uD83C\uDF66", // 🍦
		"\uD83C\uDF4C", // 🍌
		"\uD83C\uDF55", // 🍕
		"\uD83C\uDF5F", // 🍟
		"\uD83C\uDF63", // 🍣
		"\uD83C\uDF69", // 🍩
		"\uD83C\uDF7F", // 🍿
		"\uD83E\uDD68", // 🥨
		"\uD83C\uDF52", // 🍒
		"\uD83C\uDF49", // 🍉
		"\uD83C\uDF6D", // 🍭
		"\uD83C\uDF53", // 🍓
		"\uD83C\uDF3D", // 🌽
		"\uD83E\uDD65" // 🥥
	];
}

// Randomly select 5 unique emojis from the list
const randomEmojis = [];
while (randomEmojis.length < width) {
    const randomIndex = Math.floor(Math.random() * emojiList.length);
    const emoji = emojiList[randomIndex];
    if (!randomEmojis.includes(emoji)) {
        randomEmojis.push(emoji);
    }
}

// Set the word variable with the randomly chosen emojis
word = randomEmojis.join("");
// // Access the HTML element by its ID
// Clear any existing content
testAnswer.innerHTML = '';
// Create spans for each emoji and append them to the word display
randomEmojis.forEach((emoji, index) => {
    let span = document.createElement("span");
    span.innerText = emoji;
    span.classList.add(`order-${index + 1}`);
    testAnswer.appendChild(span);
});

// Create board with empty squares
for (let r = 0; r < height; r++) {
	for (let c = 0; c < width; c++) {
		//create span and add id to tile
		let tile = document.createElement("span");
		tile.id = r.toString() + "-" + c.toString();
		tile.classList.add("tile"); //add class to styling
		tile.innerText = "";
		document.getElementById("gameboard").appendChild(tile);
	}
}

// START OF CODE TO USE ON-SCREEN KEYBOARD    
// Get all the emoji keyboard buttons
const keyboard = document.getElementById("keyboard");
const keys = keyboard.getElementsByClassName("key");

// Get the backspace and clear buttons
const backspaceButton = document.getElementById("backspace");
const clearButton = document.getElementById("clear");