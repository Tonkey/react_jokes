// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@ds040837.mlab.com:40837/jokes_nmo_db', { useMongoClient: true });
var Joke = require('./app/models/jokes');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8001;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use((req, res, next) => {
	console.log('Something is happening');
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /jokes
// ---------------------------------------------------------------
router.route('/jokes')

// create a joke (accessed at POST http://localhost:8080/api/jokes)
	.post((req, res) => {
		var joke = new Joke(); // create a new instance of the Joke model
		joke.joke = req.body.joke; // est the jokes joke (comes from the request)

		// save the joke and check for errors
		joke.save((err) => {
			if (err)
				res.send(err);

			res.json({ message: 'Joke created!' });
		});
	})

// get all the jokes (accessed at GET http://localhost:8080/api/jokes)
	.get((req, res) => {
		Joke.find((err, jokes) => {
			if (err)
				res.send(err);

			res.json(jokes);
		});
	});

// on routes that end in /jokes/:joke_id
// ---------------------------------------------------------------
router.route('/jokes/:joke_id')

// get the joke with thatid (accessed at GET http://localhost/8080/api/jokes/:joke_id)
	.get((req, res) => {
		Joke.findById(req.params.joke_id, (err, joke) => {
			if (err) res.send(err);

			res.json(joke);
		});
	})

// update the joke with this id (accessed at PUT http://localhost:8080/api/jokes/:joke_id)
	.put((req, res) => {

		// use our joke model to find the joke we want
		Joke.findById(req.params.joke_id, (err, joke) => {
			if (err) res.send(err);

			joke.joke = req.body.joke; // update the jokes info

			// save the joke
			joke.save((err) => {
				if (err) res.send(err);

				res.json({ message: 'Joke updated!' });
			});
		});
	})

// delete the bear with this id (accessed at DELETE http://localhost:8080/api/jokes/:joke_id)
	.delete((req,res) => {
		Joke.remove({
			_id: req.params.joke_id
		}, (err, joke) => {
			if(err) res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
    



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);