const modules = require("./js");
let shipF = modules.shipFactory;
let gameboardF = modules.gameboardFactory;

it("ship make", () => {
  let ship = shipF(1, "s1");
  expect(ship.name).toBe("s1");
});

it("ship length", () => {
  let ship = shipF(1, "s1");
  expect(ship.length).toBe(1);
});

it("ship hit", () => {
  let ship = shipF(1, "s1");
  ship.hit();
  expect(ship.life).toBe(0);
});

it("ship isSunk not", () => {
  let ship = shipF(1, "s1");
  expect(ship.isSunk()).toBe(false);
});

it("ship isSunk size 2", () => {
  let ship = shipF(2, "s2");
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

it("ship length", () => {
  let ship = shipF(1, "s1");
  expect(ship.length).toBe(1);
});

it("gameboard make", () => {
  let gameboard = gameboardF();
  expect(gameboard.board[0][0]).toBe("-");
});

it("gameboard place ship", () => {
  let ship = shipF(1, "s1");
  let gameboard = gameboardF();
  gameboard.placeShip(ship, 0, 0, 1);
  expect(gameboard.board[0][0]).toBe("s1");
});

it("gameboard place direction", () => {
  let ship = shipF(2, "s1");
  let gameboard = gameboardF();
  gameboard.placeShip(ship, 0, 0, 1);
  expect(gameboard.board[0][1]).toBe("s1");
});

it("gameboard place out of bounds", () => {
  let ship = shipF(3, "s1");
  let gameboard = gameboardF();
  gameboard.placeShip(ship, 0, 9, 0);
  expect(gameboard.board[0][9]).toBe("-");
});

it("gameboard hit", () => {
  let ship = shipF(3, "s1");
  let gameboard = gameboardF();
  gameboard.placeShip(ship, 0, 0, 0);
  gameboard.recieveAttack(0, 0);
  expect(gameboard.board[0][0]).toBe("x");
});

it("gameboard hit already", () => {
  let ship = shipF(3, "s1");
  let gameboard = gameboardF();
  gameboard.placeShip(ship, 0, 0, 0);
  expect(gameboard.board[0][0]).toBe("Already hit");
});

it("gameboard hit miss", () => {
  let ship = shipF(3, "s1");
  let gameboard = gameboardF();
  gameboard.placeShip(ship, 0, 0, 0);
  expect(gameboard.board[0][0]).toBe("m");
});
