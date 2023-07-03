/* jshint esversion: 11 */

/**
 * @jest-environment jsdom
 */

const { test, expect } = require("@jest/globals");
const { startGame, handleKeyPress, handleClear, handleGuess, update, handleGameOver, clearBoard, startNewGame } = require("../main");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("DOM test", () => {
    test("h1 should exist", () => {
        expect(document.getElementsByTagName("h1").length).toBe(2);
    });
    test("button should exist", () => {
        expect(document.getElementsByTagName("button").length).toBe(29);
    });
    test("h2 should exist", () => {
        expect(document.getElementsByTagName("h2").length).toBe(1);
    });
    test("key should exist", () => {
        expect(document.getElementsByClassName("key").length).toBe(24);
    });
    test("footer should exist", () => {
        expect(document.getElementsByTagName("footer").length).toBe(1);
    });
});