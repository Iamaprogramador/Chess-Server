const $ = (selector, node = document) => node.querySelector(selector);
const $$ = (selector, node = document) => node.querySelectorAll(selector);

const params = new URLSearchParams(window.location.search);
const gameId = params.get('gameId');
const team = params.get('side');

var board = $("#board");

function createCell(color, i, j) {
    let cell = document.createElement('td');
    cell.className = `cell ${color}cell`;
    cell.id = `cell-${i}-${j}`;
    return cell;
}

for (let i = 0; i < 8; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 == 0) row.appendChild(createCell('white', i, j));
        else row.appendChild(createCell('black', i, j));
    }
    board.appendChild(row);
}

function renderPiece(pieceId, x, y) {
    if (pieceId.length == 0) return;
    
    let piece = document.createElement('img');
    piece.width = 30;
    piece.height = 30;
    piece.src = '/assets/pieces?piece=' + pieceId;
    
    $(`#cell-${x}-${y}`, board).appendChild(piece);
}

function render(pieces) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++)
            renderPiece(pieces[i][j], team == 'white' ? i : 7 - i, j);
    }
}

function updatePieces() {
    fetch("https://chess-server.iamaprogramador.repl.co/game/board?gameId=" + gameId)
        .then(res => res.json())
        .then(render);
}

updatePieces();