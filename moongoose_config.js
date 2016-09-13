// Load mongoose package
var mongoose = require('mongoose');
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://localhost/todoAppTest');
// Create a schema
var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});
// Create a model based on the schema
var Todo = mongoose.model('Todo', TodoSchema);

// Create a todo in memory
var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there...'});
// Save it to database
todo.save(function(err){
  if(err)
    console.log(err);
  else
    console.log("SE CREO DE LA PRIMERA MANERA "+ todo);
});
// CREATE IN ONE STEP
Todo.create({name: 'Create something with Mongoose', completed: true, note: 'this is one'}, function(err, todo){
  if(err) console.log(err);
  else console.log("SE CREO DE LA SEGUNDA MANERA "+todo);
});

// Find all data in the Todo collection
Todo.find(function (err, todos) {
  if (err) return console.error(err);
  console.log("LOS HE ENCONTRADO A TODOS" +todos)
});

// callback function to avoid duplicating it all over LO DE ABAJO
var callback = function (err, data) {
  if (err) { return console.error(err); }
  else { console.log("RESULTADO= "+data); }
}
// Get ONLY completed tasks
Todo.find({completed: true }, callback);
// SI NO ESTUVIERA LA FUNCION CALLBACK ARRIBA, HABRIA QUE ESCRIBIR LA FUNCION ASI
Todo.find({completed: true }, function(err,data){
  if(err) {return console.error(err);}
  else{ console.log("YA LO ENTENDI JAJAJAJA "+data);}
});
// Get all tasks ending with `JS`
Todo.find({name: /JS$/ }, callback);

//PODEMOS ENCADENAR QUERYS JUSTO COMO LO HACIA EN STRONGLOOP, o MUY PARECIDO

var oneYearAgo = new Date();
oneYearAgo.setYear(oneYearAgo.getFullYear() - 1);
// Get all tasks staring with `Master`, completed
Todo.find({name: /^Master/, completed: true }, callback);
// Get all tasks staring with `Master`, not completed and created from year ago to now...
Todo.find({name: /^Master/, completed: false }).where('updated_at').gt(oneYearAgo).exec(callback);

// Model.update(conditions, update, [options], [callback])
// update `multi`ple tasks from complete false to true
Todo.update({ name: /master/i }, { completed: true }, { multi: true }, callback);
//Model.findOneAndUpdate([conditions], [update], [options], [callback])
Todo.findOneAndUpdate({name: /JS$/ }, {completed: false}, callback);
