const express = require('express');
const path = require('path');
const axios = require('axios');
const handlebars = require('express-handlebars');

const app = express();
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.use('/assets', express.static(path.join(__dirname, 'public')));

app.get('', (req, res) => {
    const url = path.join(__dirname, 'views', 'index.html');
    res.sendFile(url);
})

app.get('/usuarios', (req, res) => {
    // GET de usuarios
    axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
        const users = response.data;
        res.render('users', {
            users
        });
    }).catch(e => {
        res.send({error: e})
    })
})

app.listen(port, () => {
    console.log(`app is running in port ${port}`);
})
