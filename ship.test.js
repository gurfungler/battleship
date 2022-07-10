const modules = require("./js");
let shipF = modules.shipFactory;
let gameboardF = modules.gameboardFactory;
let playerF = modules.playerFactory;
let game = modules.game;
it("ship make", () => {
  let ship = shipF(0);
  expect(ship.info.name).toBe("Destroyer");
});

it("ship length", () => {
  let ship = shipF(0);
  expect(ship.info.length).toBe(2);
});

it("ship hit", () => {
  let ship = shipF(0);
  ship.hit();
  expect(ship.info.life).toBe(1);
});

it("ship isSunk not", () => {
  let ship = shipF(0);
  expect(ship.isSunk()).toBe(false);
});

it("ship isSunk size 2", () => {
  let ship = shipF(1);
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});

it("ship length", () => {
  let ship = shipF(0);
  expect(ship.info.length).toBe(2);
});

it("gameboard make", () => {
  let gameboard = gameboardF();
  expect(gameboard.board[9][9]).toBe("-");
});

it("gameboard place ship", () => {
  let gameboard = gameboardF();
  gameboard.placeShip(gameboard.ships[0], 0, 0, 1);
  expect(gameboard.board[0][0]).toBe(0);
});

it("gameboard place direction", () => {
  let gameboard = gameboardF();
  gameboard.placeShip(gameboard.ships[0], 0, 0, 1);
  expect(gameboard.board[0][1]).toBe(0);
});

it("gameboard place out of bounds", () => {
  let ship = shipF(3);
  let gameboard = gameboardF();
  gameboard.placeShip(gameboard.ships[0], 0, 9, 0);
  expect(gameboard.board[0][9]).toBe("-");
});

it("gameboard hit", () => {
  let gameboard = gameboardF();
  gameboard.placeShip(gameboard.ships[0], 0, 0, 0);
  gameboard.recieveAttack(0, 0);
  expect(gameboard.board[0][0]).toBe("x");
});

it("gameboard hit already", () => {
  let gameboard = gameboardF();
  gameboard.placeShip(gameboard.ships[0], 0, 0, 0);
  gameboard.recieveAttack(0, 0);
  gameboard.recieveAttack(0, 0);
  expect(gameboard.board[0][0]).toBe("a");
});

it("gameboard hit miss", () => {
  let ship = shipF(1);
  let gameboard = gameboardF();
  gameboard.placeShip(ship, 1, 1, 0);
  gameboard.recieveAttack(0, 0);
  expect(gameboard.board[0][0]).toBe("m");
});

it("player attack", () => {
  let gameboard = gameboardF();
  let player = playerF(0);
  gameboard.placeShip(gameboard.ships[0], 0, 0, 0);
  player.hit(0, 0, gameboard, 1);
  expect(gameboard.board[0][0]).toBe("x");
});

it("CPU attack", () => {
  //let gameboard = gameboardF();
  let player = playerF(0);
  player.cpuHit(player.playerBoard);
  let check = false;
  for (let i = 0; i < 10; ++i) {
    if (player.playerBoard.board[i].includes("m")) {
      check = true;
    }
  }
  expect(check).toBe(true);
});

it("game make", () => {
  let g = game();

  expect(g.player.playerBoard.board[0][0]).toBe(0);
});
