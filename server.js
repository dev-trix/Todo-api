var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [
  {
    id: 1,
    description: "Meet mom for lunch",
    completed: false
  },
  {
    id: 2,
    description: "Go to market",
    completed: false
  },
  {
    id: 3,
    description: "Feed cat",
    completed: true
  }
];

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
  var matchedTodo;
  // res.send(todoId);
  // iterate of todos array. find the match.
  todos.forEach(function(todo) {
    if (todoId === todo.id) {
      // res.send(todoId);
      matchedTodo = todo;
    }
  });

  if (matchedTodo) {
    res.json(matchedTodo);
  } else {
    res.status(404).send();
  }
  // res.satus(404).send();
  // res.json("asking for todo with id of " + req.params.id);
});

app.listen(PORT, function() {
  console.log("express listening on port " + PORT + "!");
});
