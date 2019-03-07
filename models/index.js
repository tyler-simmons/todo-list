var mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connect('mongodb://api:coltsteeletodolist1@ds161335.mlab.com:61335/todo-list', {
	useNewUrlParser: true,
	useCreateIndex: true
});

mongoose.set('useFindAndModify', false);

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");

