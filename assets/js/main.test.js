/**
 * @jest-environment jsdom
 */

const { test, expect } = require("@jest/globals");
const { startGame, handleKeyPress, handleClear, handleGuess, update, handleGameOver, clearBoard, startNewGame } = require("./main");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("main.js", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});