import { EventEmitter } from 'events';
import dispatcher from '../dispatcher';
// import * as JokeActions from '../actions/JokeActions';

class JokeStore extends EventEmitter {
	constructor(){
		super();
		this.jokes = [];
	}
	
	createJoke(){
		this.emit('isAdded');
		this.emit('change');
	}

	fetchJokes(data){
		this.jokes = data;
		this.emit('change');
	}

	getAll(){
		return this.jokes;
	}

	handleActions(action){
		switch (action.type) {
		case 'CREATE_JOKE':
			this.createJoke();
			this.fetchJokes(action.text);
			break;
		case 'RECIEVED_JOKES':
			this.fetchJokes(action.text);
			break;

		default:
			break;
		}
	}

}

const jokeStore = new JokeStore();

dispatcher.register(jokeStore.handleActions.bind(jokeStore));

export default jokeStore;