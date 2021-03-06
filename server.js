const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const Clarifai = require('clarifai');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
//const app = new Clarifai.App({
 //apiKey: '47dbac022fb24667a75efd6df1b440d6'
//});
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'hagthedon',
    password : '10Revolution!@#',
    database : 'smart-brain'
  }
});
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
	res.send(database.users);
})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt)} )
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex)} )
app.put('/image', (req, res) => { image.handleImage(req, res, knex)} )
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)} )
app.listen(3000, () => {
	console.log('app is running on port 3000');
})
