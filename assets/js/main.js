let height = 6; // Number of guesses
let width = 5; //Number of letters/emojis
//Players guessing position
let row = 0; //current guess attempt
let col = 0; //current letter within attempt
let gameOver = false;
let word;
let gameAnswer = document.getElementById("game_answer");

function startGame() {
	// List of emojis to choose from
	const emojiList = [
		"\uD83C\uDF4E", // 🍎
		"\uD83E\uDD51", // 🥑
		"\uD83C\uDF2D", // 🌭
		"\uD83C\uDF51", // 🍑
		"\uD83E\uDDC0", // 🧀
		"\uD83C\uDF54", // 🍔
		"\uD83C\uDF6B", // 🍫
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
	gameAnswer.innerHTML = '';
	// Create spans for each emoji and append them to the word display
	randomEmojis.forEach((emoji, index) => {
		let span = document.createElement("span");
		span.innerText = emoji;
		span.classList.add(`order-${index + 1}`);
		gameAnswer.appendChild(span);
	});
}

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

// Add event listener for the backspace button
backspaceButton.addEventListener("click", handleBackspace);

// Add event listener for the clear button
clearButton.addEventListener("click", handleClear);

// Add event listener for the guess button
const guessButton = document.getElementById("guessbtn");
guessButton.disabled = true;
guessButton.addEventListener("click", handleGuess);

// Add event listener to each keyboard button
for (let i = 0; i < keys.length; i++) {
	keys[i].addEventListener("click", handleKeyPress);
}

// Add event listener for the new game button
const newGameButton = document.getElementById("newGameButton");
newGameButton.addEventListener("click", startNewGame);


// Function to handle keyboard button click
function handleKeyPress(event) {
	const emojiLetter = event.target.innerText;
	// Check if row and col values are within range
	if (col >= 4) {
		guessButton.disabled = false;
	} else {
		guessButton.disabled = true;
	}
	if (row >= 0 && row < height && col >= 0 && col < width) {
		let currentTile = document.getElementById(row.toString() + "-" + col.toString());
		// Exclude "backspace" and "clear" from being added to the game board
		if (emojiLetter !== "Backspace" && emojiLetter !== "Clear" && currentTile.innerText === "") {
			currentTile.innerText = emojiLetter;
			col += 1;
		}
	}
}

// Function to handle clear button click
function handleClear() {
	for (let i = 0; i < width; i++) {
		let currentTile = document.getElementById(row.toString() + "-" + i.toString());
		currentTile.innerText = "";
	}
	col = 0;
}

// Function to handle backspace button click
function handleBackspace() {
	setTimeout(() => {
		guessButton.disabled = true;
	}, 1);
	if (col > 0) {
		col -= 1;
		let currentTile = document.getElementById(row.toString() + "-" + col.toString());
		currentTile.innerText = "";
	}
}

//Function that sees what happens after pressing 'guess'
function handleGuess() {
	guessButton.disabled = true;
	update(); // Update the colors
	// Increment the row for the next guess attempt
	row += 1;
	col = 0;
	if (row === height) {
		gameOver = true;
		handleGameOver();
	}
}

// Updates the tiles to let the user know if the emoji is in the correct place, is present 
// but incorrect position or not present
function update() {
	let correct = 0;
	for (let c = 0; c < width; c++) {
		// clear the existing (correct, present, absent) classes from the tiles
		let currentTile = document.getElementById(row.toString() + "-" + c.toString());
		currentTile.classList.remove("correct", "present", "absent");
		// grab the current tile's emoji from the user input
		let letter = currentTile.innerText;
		// grab the nth gameAnswer child <span>'s innerText for comparison
		let wordEmoji = gameAnswer.children[c].innerText;

		if (letter !== "") {
			// if the wordEmoji <span> text matches the user's guess
			if (wordEmoji === letter) {
				// make green / correct +1
				currentTile.classList.add("correct");
				correct += 1;
			} else if (word.includes(letter)) {
				// not a match, but is part of the word
				currentTile.classList.add("present");
			} else {
				// not a match, and not part of the word
				currentTile.classList.add("absent");
			}
		}
	}
	if (correct === width) {
        // All emojis guessed correctly
        document.getElementById("well_done").classList.remove("hide");
    }
}

function handleGameOver() {
	// Game over, display appropriate message
	document.getElementById("main_title").innerText = "Game Over";
	if (row >= height) {
		// All attempts used, display the correct answer
		document.getElementById("correct_answer").innerText = "Correct Answer: " + word;
	}
	document.getElementById("result").classList.remove("hide"); // Show the result section
	document.getElementById("keyboard").classList.add("hide");  // hide the keyboard
	guessButton.classList.add("hide");  // hide the guessButton
}

// Function to clear the game board
function clearBoard() {
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "";
            tile.classList.remove("correct", "present", "absent");
        }
    }
    col = 0;
    guessButton.disabled = true;
}

// Function to start a new game
function startNewGame() {
	// Update game title
    document.getElementById("main_title").innerText = "🍒 Emoji Match";

    // Reset game variables and state
    row = 0;
    col = 0;
    gameOver = false;
    word = "";
    gameAnswer.innerHTML = "";
    document.getElementById("well_done").classList.add("hide");
    document.getElementById("result").classList.add("hide");
    document.getElementById("keyboard").classList.remove("hide");
    guessButton.classList.remove("hide");

    // Clear the game board
    clearBoard();

    // Start a new game
    startGame();
}

// not used in-game, purely for using in DevTools console for quicker testing
function testWord() {
	if (word != undefined) console.log(word);
}