const express = require('express');
const port = 3000;

const app = express()

app.get('/', (req, res) => {
    res.send('Hellow world');
});

app.listen(port, () => {
    console.log(`port dijalankan adalah http://localhost:${port}`)
});