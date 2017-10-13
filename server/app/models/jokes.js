// app/models/jokes.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JokeSchema = new Schema({
	joke: String
});

module.exports = mongoose.model('Joke', JokeSchema);