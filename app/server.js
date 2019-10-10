var express = require('express');
var app = express();

function onLanding(request, response){
    response.send('Hello World');
    console.log("on landing");
}

function onLogin(request, response){
    response.send("Bye World");
    console.log("on login");
}

app.get('/', onLanding);

app.get('/login', onLogin);

app.listen(800);