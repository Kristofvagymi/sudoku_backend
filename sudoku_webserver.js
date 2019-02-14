const express = require('express');
const app = express();
var fs = require('fs');
const port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', function (req, res) {
  fs.readFile('./frontend/index2.html', function (err, data) {
    if (err) console.log(err);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

app.get('/styles.css', function (req, res) {
  fs.readFile('./frontend/styles.css', function (err, data) {
    if (err) console.log(err);
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    res.end();
  });
});

app.get('/script.js', function (req, res) {
  fs.readFile('./frontend/script.js', function (err, data) {
    if (err) console.log(err);
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(data);
    res.end();
  });
});

app.post('/solve', function (req, res) {
  console.log('app path found');
  console.log(req.body.data);
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify({data: req.body.data}) );
  res.end();
});

app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`));

