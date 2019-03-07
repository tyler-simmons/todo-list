var express = require('express');
//router for the export
var router = express.Router();
//just require the dir since it will automatically look for index.js
var db = require('../models');
//import the db logic for the routes - comes in as an object
//so the functions tied to it can be used as callback for each route
var helpers = require("../helpers/todos");


router.route('/')
	.get(helpers.getAllTodos)
	.post(helpers.createNewTodo)

router.route('/:todoId')
	.get(helpers.getTodoById)
	.put(helpers.updateTodoById)
	.delete(helpers.deleteTodoById)

module.exports = router;