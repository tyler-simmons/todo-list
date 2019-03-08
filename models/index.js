var mongoose = require('mongoose');
//console.log info about queries
mongoose.set('debug', true);

//connect to mlab db
mongoose.connect('mongodb://api:coltsteeletodolist1@ds161335.mlab.com:61335/todo-list', {
	useNewUrlParser: true,
	//avoid depreciation
	useCreateIndex: true
});

//mongoose depreciation
mongoose.set('useFindAndModify', false);

//so we can use .then & .catch instead of nested callback
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");

