const express = require('express');
const app = express();

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/client/script.js');
});

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/client/style.css');
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
        res.redirect('/game?gameId=' + gameId + '&side=black');
        gameStates[gameId] = 'white';
        nextGameId++;
    }
    else {
        games[gameId] = cloneArray(gameBoard);
        gameStates[gameId] = 'waiting';
        res.redirect('/game?gameId=' + gameId + '&side=white');
    }
});

app.get('/game/board', (req, res) => {
    res.json(games[req.query.gameId]);
});

app.listen(5000);