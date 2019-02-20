const express = require('express');
const app = express();
var fs = require('fs');
const port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', function (req, res) {
  fs.readFile('frontend/index.html', function (err, data) {
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
  var solution = findSolution(req.body.data);
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify({data: solution}) );
  res.end();
});

function findSolution(inputData){
  setupTheArrays(inputData);
  recursiveSolveFunction(inputData);
  return inputData;
}

function setupTheArrays(inputData){
  for (var i = 0; i < 9; i++) { 
    for (var j = 0; j < 9; j++) {
      var sureNotValue = [];
      inputData[i][j].sureNotValue= sureNotValue;
    }
  }
  for (var i = 0; i < 9; i++)
    for (var j = 0; j < 9; j++)
      setNotSureValues(i, j, inputData);
  console.log(inputData => console.log(inputData.sureNotValue));
}

function setNotSureValues(i, j, inputData){
  if(inputData[i][j].sureValue!=0){
    for (var k = 0; k < 9; k++)
      if(inputData[k][j].sureValue==0)
        inputData[k][j].sureNotValue.push(inputData[i][j].sureValue);
    for (var k = 0; k < 9; k++)
      if(inputData[i][k].sureValue==0)
        inputData[i][k].sureNotValue.push(inputData[i][j].sureValue);
    var cordinates = calculateSquareCordinates(i,j);
    for (var k = 0; k < cordinates.length; k++)
      if(inputData[cordinates[k].x][cordinates[k].y].sureValue==0)
      inputData[cordinates[k].x][cordinates[k].y].sureNotValue.push(inputData[i][j].sureValue);
  }
} 

// i sor
// j oszlop
function calculateSquareCordinates(i, j){
  var firstSquare = [{x:0 , y:0},{x:0 , y:1},{x:0 , y:2},{x:1 , y:0},{x:1 , y:1},{x:1 , y:2},{x:2 , y:0},{x:2 , y:1},{x:2 , y:2}];
  if(i<3 && j<3)
    return firstSquare;
  if(i<3 && 3<=j && j<6 )
    return  firstSquare.map(item => {item.y+=3; return item;});
  if(i<3 && 6<=j)
    return  firstSquare.map(item => {item.y+=6; return item;});
  if(3<=i && i<6 && j<3)
    return firstSquare.map(item => {item.x+=3; return item;});
  if(3<=i && i<6 &&  3<=j && j<6)
    return firstSquare.map(item => {item.x+=3; item.y+=3; return item;});
  if(3<=i && i<6 && 6<=j)
    return firstSquare.map(item => {item.x+=3; item.y+=6; return item;});
  if(6<=i && j<3)
    return firstSquare.map(item => {item.x+=6; return item;});
  if(6<=i && 3<=j && j<6)
    return firstSquare.map(item => {item.x+=6; item.y+=3; return item;});
  if(6<=i && 6<=j)
    return firstSquare.map(item => {item.x+=6; item.y+=6; return item;});
}
  
function recursiveSolveFunction(inputData){
}

app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`));

