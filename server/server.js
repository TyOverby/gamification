var express = require('express');
var app = express();
var store = require('./store')();

app.use(express.bodyParser());

app.put('/users/:user', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(store.addUser(req.params.user)));
});

app.get('/users/:user', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(store.getUser(req.params.user)));
});

app.get('/tasks/:id', function (req, res) {
    console.log(req.params.id);
});


app.listen(6666);
