function checkMove(board, x1, y1, x2, y2) {
    return true; // TODO: Remove once all sub-methods are completed
    
    let pieceId = board[x1][y1].substring(6);
    if (pieceId === 'pawn') return checkPawnMove();
    if (pieceId === 'rook') return checkRookMove();
    if (pieceId === 'knight') return checkKnightMove();
    if (pieceId === 'bishop') return checkBishopMove();
    if (pieceId === 'queen') return checkQueenMove();
    if (pieceId === 'king') return checkKingMove();
    return false;
}

function checkPawnMove(board, x1, y1, x2, y2) {
    
}

function checkRookMove(board, x1, y1, x2, y2) {
    return x1==x2 || y1==y2;
}

function checkKnightMove(board, x1, y1, x2, y2) {
    return 
}

function checkBishopMove(board, x1, y1, x2, y2) {
    return x2-x1 == y2-y1;
}

function checkQueenMove(board, x1, y1, x2, y2) {
    return checkBishopMove(board,x1,y1,x2,y2) || checkRookMove(board,x1,y1,x2,y2);
}

function checkKingMove(board, x1, y1, x2, y2) {
   return Math.abs(x1-x2) <= 1 && Math.abs(y1-y2) <= 1; 
}