const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/cod.js', (req, res) => {
    res.sendFile(__dirname + '/client/script.js');
});

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/client/script.js');
});