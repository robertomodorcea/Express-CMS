const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to Roberto's Blog")
})

app.listen(2200);