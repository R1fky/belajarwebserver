const express = require('express');
const app = express()
const port = 3000;

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    // res.sendFile('./index.html', {root: __dirname});
    res.render('index', {
        title: 'halaman index',
        user: 'rifky Yudha',
    });
});

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'halaman about'
    })
});

app.listen(port, () => {
    console.log(`port dijalankan adalah http://localhost:${port}`)
});