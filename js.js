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
  let board = Array(10);
  for (let i = 0; i < 10; ++i) {
    board[i] = new Array(10);
    board[i].fill("-");
  }
  return {
    board,
    placeShip(ship, startX, startY, direction) {
      if (checkOverFlow(ship, startX, startY, direction)) {
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
      }
    },
  };
};
module.exports = {
  shipFactory: shipFactory,
  gameboardFactory: gameboardFactory,
};
