const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const updateEntries = require('./controllers/updateEntries.js');
const profile = require('./controllers/profile.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'SamuelKorkoyah',
    password : '',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

// Dependencies injection
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

app.put('/image', (req, res) => { updateEntries.handleEntries(req, res, db) })

app.post('/imageurl', (req, res) => { updateEntries.handleApiCall(req, res) })


app.listen(3000, () => {
    console.log('app is running on port 3000');
});

/*
/ --> res = this is working
/signin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/