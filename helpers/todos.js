var db = require('../models');

exports.getAllTodos = function(req, res){
	//Generic query - get everything in db
	db.Todo.find()
	.then(function(todos){
		//send all of the todos as JSON
		res.json(todos);
	})
	.catch(function(err){
		res.send(err);
	});
}


exports.createNewTodo = function(req, res){
	db.Todo.create(req.body)
	.then(function(newTodo){
		//If new item created - send 201 status (created) and send the
		//db entry back in JSON
		res.status(201).json(newTodo);
	})
	.catch(function(err){
		res.send(err);
	})
}


exports.getTodoById = function(req, res){
	db.Todo.findById(req.params.todoId)
	.then(function(queriedTodo){
		res.json(queriedTodo);
	})
	.catch(function(err){
		res.send(err);
	})
}


exports.updateTodoById = function(req, res){
	db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
	.then(function(todo){
		res.json(todo);
	})
	.catch(function(err){
		res.send(err);
	})
}


exports.deleteTodoById = function(req, res){
	db.Todo.remove({_id: req.params.todoId})
	.then(function(){
		res.json({message: "Entry deleted"});
	})
	.catch(function(err){
		res.send(err);
	})
}

module.exports = exports;