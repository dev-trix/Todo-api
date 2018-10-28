var express = require("express");
var bodyParser = require("body-parser");
var _ = require("underscore"); //underscorejs.org

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("TODO API ROOT");
});

// Get /todos

app.get("/todos", function(req, res) {
  res.json(todos);
});

// Get /todos/:id
app.get("/todos/:id", function(req, res) {
  var todoId = parseInt(req.params.id, 10); //req.params.id always a string you need to convert
  var matchedTodo = _.findWhere(todos, { id: todoId });

  // var matchedTodo;

  // res.send(todoId);
  // iterate of todos array. find the match.
  // todos.forEach(function(todo) {
  //   if (todoId === todo.id) {
  //     // res.send(todoId);
  //     matchedTodo = todo;
  //   }
  // });

  if (matchedTodo) {
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }
  // res.satus(404).send();
  // res.json("asking for todo with id of " + req.params.id);
});
// POST /todos
app.post("/todos", function(req, res) {
  var body = _.pick(req.body, "description", "completed");

  //add id field
  body.id = todoNextId++;

  if (
    !_.isBoolean(body.completed) ||
    !_.isString(body.description) ||
    body.description.trim().length === 0
  ) {
    return res.status(400).send();
  }
  body.description = body.description.trim();

  //push body into array
  todos.push(body);
  console.log("description: " + body.description);
  res.json(body);
});

app.listen(PORT, function() {
  console.log("express listening on port " + PORT + "!");
});
