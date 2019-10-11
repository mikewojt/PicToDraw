const path = require('path');
const express = require('express');
const app = express();
const UserDao = require('../database/UserDAO')
const User = require('../database/User')

function onLanding(request, response){
    userDao = new UserDao()
    console.log(userDao.select_by_username('mwojtyna').username)
    response.sendFile('home.html', { root: path.join(__dirname, '../templates') });
}



app.get('/', onLanding);
app.listen(800);