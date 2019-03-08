//frontend script that uses API


//Wait for the dom to load
$(document).ready(function(){
	//get all of the todos from db
	$.getJSON("/api/todos")
	.then(addTodos)
	//on the form when the enter key is pressed
	//POST requset to API to add new todo
	$('#todoInput').keypress(function(event){
		//enter keycode is 13
		if(event.which === 13) {
			createTodo();
		}
	});

	$('.list').on('click', 'li', function(){
		updateTodo($(this));
	});


	//add click listener to the LIST since the li's
	//won't be there until the db query finishes
	//but the list itself will be
	$('.list').on('click', 'span', function(e){
		//stops the li click event from bubbling up
		//when the span event is triggered
		//(with this, the li and the span events trigger on span click)
		e.stopPropagation();
		//makes the delete button work
		removeTodo($(this).parent());
	});
});


//Adds todos from the db to the ul in the DOM
//the ul is there on load
function addTodos(todos) {
	//add todos to the page
	todos.forEach(function(todo){
		addTodo(todo);
	});
}


//create a new li and populate it with the todo 
//item from the db
function addTodo(todo){
	//create new jQuery li (add the span for the X button)
	var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
	//stick the mongo _id in the jQuery data here so that the delete button works
	newTodo.data('id', todo._id);
	//pstick the completed property in the jQuery data store
	newTodo.data('completed', todo.completed);
	//cross out item if it's completed
	if(todo.completed) {
		newTodo.addClass("done");
	}
	//add the generated todo to the list on the page
	$(".list").append(newTodo);
}


//creates a new todo (used with post route) to
//add to the db (gets atatched to the enter key press listener)
function createTodo() {
	//Get the input text
	var userInput = $('#todoInput').val();
	//post to API -> ends up in db
	$.post('/api/todos', {
		name: userInput
	})
	.then(function(newTodo){
		//db returns the create todo
		//now put it on the page
		addTodo(newTodo);
		//clear the input form
		$('#todoInput').val('');
	})
	.catch(function(err){
		console.log(err);
	})
}



//remove a todo from the page and db
function removeTodo(todo) {
	//pull the mongo _id from the id key stored
	//in jQuery variable
	var clickedId = todo.data('id');
	//prep for API request
	var deleteUrl = '/api/todos/' + clickedId; 
	//send delete request
	$.ajax({
		method: 'DELETE',
		url: deleteUrl
	})
	.then(function(data){
		//remove the li from the DOM
		todo.remove();
	})
	.catch(function(err){
		console.log(err);
	});
}


//bound to the click of the li in the list
//updates the completion status of todo clicked
function updateTodo(todo) {
	//build url for API request
	var updateUrl = '/api/todos/' + todo.data('id');
	//pull completed data from jQuery data store and
	//negate it (the completed property is added based
	//on what's in the db when it's created in the addTodo method)
	var isCompleted = !todo.data('completed');
	//package the data for sending the put request
	var updateData = {completed: isCompleted};
	$.ajax({
		method: "PUT",
		url: updateUrl,
		data: updateData
	})
	//API sends back updated data on put
	.then(function(updateTodo){
		//toggle whether it's crossed out
		todo.toggleClass("done");
		//the jQuery data store needs to be updated with the negated value
		//since we're toggling completion
		todo.data('completed', isCompleted);
	})
}






