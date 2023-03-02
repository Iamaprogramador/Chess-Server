const express = require('express');
const chess = require('./chess.js');
const app = express();

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/game/script.js', (req, res) => {
    res.sendFile(__dirname + '/client/script.js');
});

app.get('/game/style.css', (req, res) => {
    res.sendFile(__dirname + '/client/style.css');
});

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home/index.html');
});

app.get('/home/script.js', (req, res) => {
    res.sendFile(__dirname + '/home/script.js');
});

app.get('/home/style.css', (req, res) => {
    res.sendFile(__dirname + '/home/style.css');
});

app.get('/assets/pieces/', (req, res) => {
    res.sendFile(__dirname + `/assets/pieces/${req.query.piece}.png`);
});

// -------------------------------------------------------------------
const games = {};
const gameStates = {};
var nextGameId = 0;

const gameBoard = [
    ['black_rook', 'black_knight', 'black_bishop', 'black_queen', 'black_king', 'black_bishop', 'black_knight', 'black_rook'],
    ['black_pawn', 'black_pawn', 'black_pawn', 'black_pawn', 'black_pawn', 'black_pawn', 'black_pawn', 'black_pawn'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['white_pawn', 'white_pawn', 'white_pawn', 'white_pawn', 'white_pawn', 'white_pawn', 'white_pawn', 'white_pawn'],
    ['white_rook', 'white_knight', 'white_bishop', 'white_queen', 'white_king', 'white_bishop', 'white_knight', 'white_rook']
];

function cloneArray(arr) {
    let copy = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) copy.push(cloneArray(arr[i]));
        else copy.push(arr[i]);
    }
    return copy;
}

app.get('/game/new', (req, res) => {
    let gameId = nextGameId;
    if (gameStates[gameId] == 'waiting') {
        res.redirect('/game?gameId=' + gameId + '&team=black');
        gameStates[gameId] = 'white';
        nextGameId++;
    }
    else {
        games[gameId] = cloneArray(gameBoard);
        gameStates[gameId] = 'waiting';
        res.redirect('/game?gameId=' + gameId + '&team=white');
    }
});

app.get('/game/board', (req, res) => {
    res.json(games[req.query.gameId]);
});

app.get('/game/move', (req, res) => {
    let gameId = req.query.gameId;
    let team = req.query.team;
    let x1 = req.query.x1,
        x2 = req.query.x2,
        y1 = req.query.y1,
        y2 = req.query.y2;

    console.log(`[${gameId}:${team}] (${x1},${y1};${games[gameId][x1][y1]}) -> (${x2}, ${y2};${games[gameId][x2][y2]}) { ${gameStates[gameId]} }`);

    let board = games[gameId];
    if (x1 == x2 && y1 == y2) res.json({ valid: false })
    else if (board[x1][y1].includes(team) && gameStates[gameId] == team) {
        let valid = chess.checkMove(board, x1, y1, x2, y2);
        if (valid == true) {
            board[x2][y2] = board[x1][y1];
            board[x1][y1] = '';
            if (gameStates[gameId] == 'white') gameStates[gameId] = 'black';
            else gameStates[gameId] = 'white';
        }
        res.json({ valid });
    }
    else res.json({ valid: false });
});

app.listen(5000);