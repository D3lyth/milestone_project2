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
​