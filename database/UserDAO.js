const User = require('./User.js')
const mysql = require('mysql')

class UserDAO{
    constructor(){
        this.db = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'csrocks55',
            database : 'pictodraw_dev'
          });
    }
    select_by_username(username){
        this.db.connect((err) => {
            if(err) throw err;
            console.log('MySql connected')
            let sql = 'SELECT * FROM users WHERE username = ?';
            this.db.query(sql, username, (err, result) => {
                if (err) throw err;
                var user = new User(result[0].username, result[0].password)
                this.db.end();
                console.log('connection ended')
                return user
            });
        });
        
        
    }
}

module.exports = UserDAO
