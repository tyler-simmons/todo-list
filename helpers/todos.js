//helpers for the API's router - these handle the db logic to
//keep the size of router file down

//get our models index which exports our todo model
var db = require('../models');

//get all todos from db the send as JSON
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


//create a new todo entry, add it to db, then send newly
//created todo db entry in JSON form
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



//Query db by the _id property and send result back in JSON
//form (_id comes as url param)
exports.getTodoById = function(req, res){
	db.Todo.findById(req.params.todoId)
	.then(function(queriedTodo){
		res.json(queriedTodo);
	})
	.catch(function(err){
		res.send(err);
	})
}


//Update existing record in db (_id comes from url param)
//send back the updated entry in JSON form
exports.updateTodoById = function(req, res){
	db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
	.then(function(todo){
		res.json(todo);
	})
	.catch(function(err){
		res.send(err);
	})
}


//find entry by _id (comes from url param) then
//delete it in the db (send basic message on success)
exports.deleteTodoById = function(req, res){
	db.Todo.deleteOne({_id: req.params.todoId})
	.then(function(){
		res.json({message: "Entry deleted"});
	})
	.catch(function(err){
		res.send(err);
	})
}

//export the 'exports' object
//Think about it exports = {
//	getAllTodos: function(req, res){...},
//	cretaeNewTodo: function(req, res){...}, etc
//}
module.exports = exports;