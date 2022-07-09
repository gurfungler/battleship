/*
ship factory
    hit()
    isSunk()
    length
gameboard factory
    place ships
    recieveAttack()




*/

const shipFactory = (length, n) => {
  return {
    length,
    name: n,
    life: length,
    hit() {
      this.life--;
    },
    isSunk() {
      if (this.life == 0) {
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
    for (let i = 0; i < 5; ) {
      s[i] = shipFactory(i, i);
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
          for (let i = 0; i < ship.length; ++i) {
            board[startY + i][startX] = ship.name;
          }
        } else {
          for (let i = 0; i < ship.length; ++i) {
            board[startY][startX + i] = ship.name;
          }
        }
      }
    },
    checkOverFlow(ship, startX, startY, direction) {
      if (direction == 0) {
        if (startY + ship.length < 9) {
          return true;
        }
      } else if (startX + ship.length < 9) {
        return true;
      }
    },
    recieveAttack(x, y) {
      if (board[y][x] != "x" && board[y][x] != "m") {
        if (board[y][x] == "-") {
          board[y][x] = "m";
        } else {
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
  let turn = 0;
  // do {
  // if (turn == 0) {
  // }
  // } while (condition);
};
module.exports = {
  shipFactory: shipFactory,
  gameboardFactory: gameboardFactory,
  playerFactory: playerFactory,
};
