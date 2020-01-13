const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');


const app = express();
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'todouser',
    password: 'password',
    database: 'todo_project'
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        sql.query(`SELECT * FROM user WHERE email = '${username}';`, (err, user) => {
            console.log(user);
            if (err) {
                console.log('Db error in local strategy');
                return done(err);
            }
            if (user.length != 1) {
                console.log('Error in user query, no user or multiple');
                return done(null, false, {message: 'Bad email'});
            }
            if (password != user[0].password) {
                console.log('bad password in strategy');
                console.log(password);
                console.log(user.password);
                return done(null, false, {message: 'Incorrect password'});
            }
            return done(null, user);
        });
    }
))


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'cats',
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
    sql.query(`SELECT * FROM user WHERE id=${id};`, (err, user) => {
        done(err, user);
    });
});

app.get('/login', (req, res, next) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/register'}));

app.get('/register', (req, res, next) => {
    res.render('register');
});

app.post('/register', (req, res, next) => {
    
});

app.get('/', (req, res) => {
    sql.query('SELECT title, info, first_name FROM todo join user on user.id = todo.author', (err, result) => {
        if (err) {
            console.log(err);
            res.send('Error');
        }
        console.log(result);
        res.render('index', {results: result});
    });
    
});

app.listen(3000, () => {
    console.log('Server listening on port 3000 --');
});

