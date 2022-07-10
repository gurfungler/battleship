/*
ship factory
    hit()
    isSunk()
    length
gameboard factory
    place ships
    recieveAttack()




*/

const shipFactory = (length) => {
  const getInfo = (l) => {
    switch (l) {
      case 0:
        return { name: "Destroyer", life: 2, length: 2 };
      case 1:
        return { name: "Submarine", life: 3, length: 3 };
      case 2:
        return { name: "Cruiser", life: 3, length: 3 };
      case 3:
        return { name: "Battleship", life: 4, length: 4 };
      case 4:
        return { name: "Carrier", life: 5, length: 5 };
    }
  };
  return {
    info: getInfo(length),
    hit() {
      this.info.life -= 1;
    },
    isSunk() {
      if (this.info.life == 0) {
        return true;
      } else {
        return false;
      }
    },
  };
};

const gameboardFactory = () => {
  const makeBoard = () => {
    let board = Array(10);
    for (let i = 0; i < 10; ++i) {
      board[i] = new Array(10);
      board[i].fill("-");
    }

    return board;
  };
  const makeShips = (s) => {
    for (let i = 0; i < 5; ++i) {
      s[i] = shipFactory(i);
    }
  };
  let ships = new Array(5);
  let board = makeBoard();
  makeShips(ships);
  return {
    ships,
    board,
    placeShip(ship, startX, startY, direction) {
      let c = 0;
      if (this.checkOverFlow(ship, startX, startY, direction)) {
        if (direction == 0) {
          for (let i = 0; i < ship.info.length; ++i) {
            board[startY + i][startX] = this.ships.indexOf(ship);
          }
        } else {
          for (let i = 0; i < ship.info.length; ++i) {
            board[startY][startX + i] = this.ships.indexOf(ship);
          }
        }
      }
    },
    checkOverFlow(ship, startX, startY, direction) {
      if (direction == 0) {
        if (startY + ship.info.length < 9) {
          return true;
        }
      } else if (startX + ship.info.length < 9) {
        return true;
      }
    },
    recieveAttack(x, y) {
      let value = board[y][x];
      if (value != "x" && value != "m") {
        if (value == "-") {
          board[y][x] = "m";
        } else {
          ships[value].hit();
          board[y][x] = "x";
        }
      } else {
        board[y][x] = "a";
      }
    },
  };
};

const playerFactory = () => {
  return {
    playerBoard: gameboardFactory(),
    cpuHit(board) {
      let x;
      let y;
      do {
        x = Math.floor((Math.random() % 10) * 10);
        y = Math.floor((Math.random() % 10) * 10);
      } while (board.board[x][y] == "x" || board.board[x][y] == "m");
      this.hit(x, y, board);
    },
    hit(x, y, board) {
      board.recieveAttack(x, y);
    },
  };
};
const game = () => {
  let cpu = new playerFactory();
  let player = new playerFactory();
  for (let i = 0; i < 5; ++i) {
    player.playerBoard.placeShip(player.playerBoard.ships[i], i, 0, 0);
  }
  for (let i = 0; i < 5; ++i) {
    cpu.playerBoard.placeShip(player.playerBoard.ships[i], i, 0, 0);
  }

  // let turn = true;
  // do {
  // if (turn == 0) {
  // }
  // } while (condition);
  return { player: player, cpu: cpu };
};

module.exports = {
  shipFactory: shipFactory,
  gameboardFactory: gameboardFactory,
  playerFactory: playerFactory,
  game: game,
};
