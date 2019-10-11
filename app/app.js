const path = require('path');
const express = require('express');
const app = express();
const mysql = require('mysql')
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'csrocks55',
    database : 'pictodraw_dev'
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

app.get('/', onLanding);
app.listen(800);