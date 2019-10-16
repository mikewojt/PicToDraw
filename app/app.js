const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mysql = require('mysql')
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'csrocks55',
    database : 'pictodraw'
  });

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql connected')
})
function onLanding(request, response){
    response.sendFile('home.html', { root: path.join(__dirname, '../templates') });
}

app.get('/selectuser', (req, res) => {
    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, result)=> {
        if(err) throw err;
        res.send(result)
    });
});

//app.get('/', onLanding);

app.get('/chatProto', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/chatRoomProto', function(req, res){
    res.sendFile(__dirname + '/views/chatRoomProto.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('room', function(room){
        console.log('joining room ' + room)
        socket.join(room);
    });
    socket.on('multiroom_chat', function(args){
        console.log('chat from room' + args.room_id);
        io.to(args.room_id).emit('multiroom_message', args.message);
    })
    socket.on('disconnect', function(){
        console.log('user disconnected')
    });
});

/*
app.get('/chatProto', function(req, res) {
    res.render('chat.ejs');
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});*/

http.listen(800, function(){
    console.log('listening on *:800');
});