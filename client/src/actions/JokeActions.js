import dispatcher from '../dispatcher';
import axios from 'axios';

export function createJoke(text){	
	var joke = {joke: text};
	axios.post('http://api.nicklasmolving.com/api/jokes', joke)
		.then(() => {
			axios.get('http://api.nicklasmolving.com/api/jokes').then((data) => {

				dispatcher.dispatch({type: 'CREATE_JOKE', text: data.data});
			});
		});
}

export function getJokes(){
	dispatcher.dispatch({type: 'FETCH_JOKES'});


	axios.get('http://api.nicklasmolving.com/api/jokes')
		.then((data) => {
			dispatcher.dispatch({type: 'RECIEVED_JOKES', text: data.data});
		});
}