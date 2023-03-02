/*
function inCheck(board, team) {
  //Checks to see if team's king is in check or not
  //get king loc at kx, ky
  for piece in opponent pieces {
    //get piece loc at px, py
    if (check{ board[kx][ky].substring(6) }(board, px, py, kx, ky)){
    return True;
    }
  }
  return False;
}


*/

function checkMove(board, x1, y1, x2, y2) {
    return true;
    let pieceId = board[x1][y1].substring(6);
    //return && with inCheck(board, team) after moving the piece
    if (pieceId === 'pawn') return checkPawnMove(board, x1, y1, x2, y2);
    if (pieceId === 'rook') return checkRookMove(board, x1, y1, x2, y2);
    if (pieceId === 'knight') return checkKnightMove(board, x1, y1, x2, y2);
    if (pieceId === 'bishop') return checkBishopMove(board, x1, y1, x2, y2);
    if (pieceId === 'queen') return checkQueenMove(board, x1, y1, x2, y2);
    if (pieceId === 'king') return checkKingMove(board, x1, y1, x2, y2);
    return false;
}

function checkPawnMove(board, x1, y1, x2, y2) {
    if (x1 != x2) {
        console.log('* CANNOT CHANGE X POS');
        return false;
    }
    if (board[x1][y1].startsWith('white')) {
        if (y1 == 1 && y2 - y1 > 2) {
            console.log('* CANNOT MOVE MORE THAN 2');
            return false;
        }
        else if (y2 - y1 > 1) {
            console.log('* CANNOT MOVE MORE THAN 1');
            return false;
        }
    }
    else if (board[x1][y1].startsWith('white')) {
        if (y1 == 6 && y1 - y2 > 2) {
            console.log('* CANNOT MOVE MORE THAN 2');
            return false;
        }
        else if (y1 - y2 > 1) {
            console.log('* CANNOT MOVE MORE THAN 1');
            return false;
        }
    }
    return true;
  //No en passant
}

function checkRookMove(board, x1, y1, x2, y2) {
  if (!(x1 == x2 || y1 == y2)) {
    return False;
  }
    if (x1 == x2) {
      let sy = (2 * ((y2 - y1) > 0))-1;
      for(let yi = 1; yi < Math.abs(y2 - y1); yi++) {
        if (board[x1][y1 + sy * yi] != ''){
          console.log('Rooks cannot jump')
          return False;
        }
      }
    }
    else {
      let sx = (2 * ((x2 - x1) > 0))-1;
      for(let xi = 1; xi < Math.abs(x2 - x1); xi++) {
        if (board[x1 + sy * xi][y1] != ''){
          console.log('Rooks cannot jump')
          return False;
        }
    }
  }
}

function checkKnightMove(board, x1, y1, x2, y2) {
    return (Math.abs(x2 - x1) == 2) && (Math.abs(y2 - y1 == 1)) || (Math.abs(x2 - x1) == 1) && (Math.abs(y2 - y1 == 2));
}

function checkBishopMove(board, x1, y1, x2, y2) {
    if (Math.abs(x2 - x1) != Math.abs(y2 - y1)) {
      return False;
    }
    let xd = (2 * ((x2 - x1) > 0))-1;
    let yd = (2 * ((y2 - y1) > 0))-1;
    for(let d = 1; d < (x2 - x1); d++) {
      if (board[x1 + xd][y1 + yd] != '') {
        return False;
      }
    }
    return True;
}

function checkQueenMove(board, x1, y1, x2, y2) {
    return checkBishopMove(board, x1, y1, x2, y2) || checkRookMove(board, x1, y1, x2, y2);
}

function checkKingMove(board, x1, y1, x2, y2) {
   return (Math.abs(x1 - x2) <= 1) && (Math.abs(y1 - y2) <= 1); 
}

module.exports = { checkMove };