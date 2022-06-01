const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

// If page is requested serve it.
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

 // If API is requested
  else if (page == '/api') {
    // and choice is a parameter
    if('choice' in params){
    // Generate 1, 2, or 3 which will act as Rock, Paper, or Scissors
      let serverThrows = Math.ceil(Math.random() * 3 )
      
      if(params['choice'] == 'Rock' && serverThrows == 1){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          serverThrew: 'Rock',
          outcome: 'You Tie. Try Again?',
          incrementPlayerScore: false,
          incrementServerScore: false,
        }
        res.end(JSON.stringify(objToJson));
      }

      else if(params['choice']== 'Rock' && serverThrows == 2){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          serverThrew: 'Paper',
          outcome: "Paper beats Rock! You Lose!",
          incrementPlayerScore: false,
          incrementServerScore: true,
        }
        res.end(JSON.stringify(objToJson));
      }

      else if(params['choice']== 'Rock' && serverThrows == 3){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          serverThrew: "Scissors",
          outcome: "Rock beats Scissors! You Win!",
          incrementPlayerScore: true,
          incrementServerScore: false,
        }
        res.end(JSON.stringify(objToJson));
      }

 // Choice 2 = ROCK!
 if(params['choice']=== 'Paper' && serverThrows == 1){
  res.writeHead(200, {'Content-Type': 'application/json'});
  const objToJson = {
    serverThrew: 'Rock',
    outcome: 'Paper beats Rock! You Win!',
    incrementPlayerScore: true,
    incrementServerScore: false,
  }
  res.end(JSON.stringify(objToJson));
}

else if(params['choice']== 'Paper' && serverThrows == 2){
  res.writeHead(200, {'Content-Type': 'application/json'});
  const objToJson = {
    serverThrew: 'Paper',
    outcome: 'You Tie. Try Again?',
    incrementPlayerScore: false,
    incrementServerScore: false,
  }
  res.end(JSON.stringify(objToJson));
}

else if(params['choice']== 'Paper' && serverThrows == 3){
  res.writeHead(200, {'Content-Type': 'application/json'});
  const objToJson = {
    serverThrew: "Scissors",
    outcome: "Scissors beats Paper! You lose!",
    incrementPlayerScore: false,
    incrementServerScore: true,
  }
  res.end(JSON.stringify(objToJson));
}

// Choice 3 = Scissors!
if(params['choice']=== 'Scissors' && serverThrows == 1){
  res.writeHead(200, {'Content-Type': 'application/json'});
  const objToJson = {
    serverThrew: 'Rock',
    outcome: 'Rock beats Scissors. You Lose!',
    incrementPlayerScore: false,
    incrementServerScore: true,
  }
  res.end(JSON.stringify(objToJson));
}

else if(params['choice']== 'Scissors' && serverThrows == 2){
  res.writeHead(200, {'Content-Type': 'application/json'});
  const objToJson = {
    serverThrew: 'Paper',
    outcome: "Scissors beats Paper. You Win!",
    incrementPlayerScore: true,
    incrementServerScore: false,
  }
  res.end(JSON.stringify(objToJson));
}

else if(params['choice']== 'Scissors' && serverThrows == 3){
  res.writeHead(200, {'Content-Type': 'application/json'});
  const objToJson = {
    serverThrew: "Scissors",
    outcome: 'You Tie. Try Again?',
    incrementPlayerScore: false,
    incrementServerScore: false,
  }
  res.end(JSON.stringify(objToJson));
}  
       }
  }

// If request is for CSS, send it!
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });

// If request is for JS, send it!
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });

    // If request is something else, send an error.
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);