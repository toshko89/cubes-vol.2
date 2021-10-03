const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const handlebars = require('express-handlebars');
const router = require('./router.js');

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, './static')));
app.use(express.urlencoded({ extended: true }))

app.set('views', path.resolve(__dirname, './views'));

app.engine('hbs', handlebars({
    extname: 'hbs'
}))
app.set('view engine', 'hbs');

app.use(router);

mongoose.connect('mongodb://locallhost:27017/cubes')
    .then(app.listen(port, () => console.log(`Express running on port: ${port}...`)))
    .catch(err => {
        console.log(err);
    })

