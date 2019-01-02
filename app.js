const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

const USERNAME = 'admin';
const PASS = 'admin';

const country = [];

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const PORT = process.env.PORT || 9999;

app.get('/', (req, res) => {
  res.send('<b>Working</b>');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== USERNAME && password !== PASS) {
    res.status(401).send('Unauthourized');
    return;
  }
  const token = jwt.sign({
    sub: 1,
    username,
  }, 'mynatterbasetest', {expiresIn: '1 hour'})
  res.status(200).send({token})
});

// middleware to check if the logedin person has access to the api via token
const jwtCheck = expressjwt({
  secret: 'mynatterbasetest'
})

app.get('/countries', jwtCheck, (req, res) => {
  res.json(country)
});

app.put('/countries/:countryName', jwtCheck, (req, res) => {
  const { countryName } = req.params;
  country.push(countryName)
  res.send(country);
});

app.delete('/countries', jwtCheck, (req, res) => {
  const { countryName } = req.params;
  country.find((value) => {
    if (value === countryName) {
      
    }
  })
  res.send(req.params.countryName)
});

app.get('*', (req, res) => {
  res.sendStatus(404);
})

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});