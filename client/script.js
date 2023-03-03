const $ = (selector, node = document) => node.querySelector(selector);
const $$ = (selector, node = document) => node.querySelectorAll(selector);

const params = new URLSearchParams(window.location.search);
const gameId = params.get('gameId');
const team = params.get('team');

var board = $("#board");

function createCell(color, x, y) {
    let cell = document.createElement('td');
    cell.className = `cell ${color}cell`;
    cell.id = `cell-${x}-${y}`;
    cell.onclick = () => select(x, y);
    return cell;
}

for (let y = 0; y < 8; y++) {
    let row = document.createElement('tr');
    for (let x = 0; x < 8; x++) {
        if ((x + y) % 2 == 0) row.appendChild(createCell('white', x, y));
        else row.appendChild(createCell('black', x, y));
    }
    board.appendChild(row);
}

function renderPiece(pieceId, x, y) {
    let tc = $(`#cell-${x}-${y}`, board);

    if (pieceId.length == 0) { tc.innerHTML = ''; return; }
    if (tc.lastChild?.src == 'https://chess-server.iamaprogramador.repl.co/assets/pieces?piece=' + pieceId) return;

    let piece = document.createElement('img');
    piece.width = 30;
    piece.height = 30;
    piece.src = '/assets/pieces?piece=' + pieceId;

    tc.innerHTML = '';
    tc.appendChild(piece);
}

function render(pieces) {
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++)
            renderPiece(pieces[x][y], x, team == 'white' ? y : 7 - y);
    }
}

function updatePieces() {
    fetch("https://chess-server.iamaprogramador.repl.co/game/board?gameId=" + gameId)
        .then(res => res.json())
        .then(render);
}

updatePieces();

var selectedX = -1, selectedY;

function select(x, y) {
    if (selectedX == -1) {
        console.log(`(${x}, ${y}) -> (?, ?)`);
        selectedX = x;
        selectedY = y;
        $(`#cell-${selectedX}-${selectedY}`, board).classList.toggle('selected-cell');
    }
    else {
        console.log(`(${selectedX}, ${selectedY}) -> (${x}, ${y})`);
        $(`#cell-${selectedX}-${selectedY}`, board).classList.toggle('selected-cell');
        let params = new URLSearchParams();
        params.set('gameId', gameId);
        params.set('team', team);
        params.set('x1', selectedX);
        params.set('y1', team == 'black' ? 7 - selectedY : selectedY);
        params.set('x2', x);
        params.set('y2', team == 'black' ? 7 - y : y);
        fetch("https://chess-server.iamaprogramador.repl.co/game/move?" + params.toString())
            .then(res => res.json())
            .then(data => data.valid == true ? updatePieces() : undefined);

        selectedX = -1;
    }
}

setInterval(updatePieces, 100);