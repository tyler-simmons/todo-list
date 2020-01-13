const mysql = require('mysql');
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'todouser',
    password: 'password',
    database: 'todo_project'
});

sql.query('SELECT * FROM user WHERE id=2', (err, user) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(user);
    console.log(user.length);
});