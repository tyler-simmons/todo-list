//Import dependencies
var express = require('express'),
	app		= express(),
	bodyParser = require('body-parser'),
	//set port (check if local environment or deploy)
	port	= 3000 || process.env.PORT;


//require the router exported from routes dir
var todoRoutes = require('./routes/todos');


//required for express - needed to get data from req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//get request to root route
app.get('/', function(req, res){
	res.send("Hello from the root route");
});


//tell the app to use the router exported from todoRoutes
//anything in routes for todoRoutes is what comes after /api/todos
app.use('/api/todos', todoRoutes);


//Listen for requests
app.listen(port, process.env.IP, function(){
	console.log("Server started on port 3000");
});

