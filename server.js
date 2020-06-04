const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/styles'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(port, () => console.log("App listening at http://localhost:3000"));
