import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';

import Main from './components/main';
import Joke from './components/randomJoke';
import Jokes from './components/jokes';
import AddJoke from './components/addJoke';

import { BrowserRouter, Route } from 'react-router-dom';

import * as JokeActions from './actions/JokeActions';
JokeActions.getJokes();


ReactDOM.render(
	<BrowserRouter>
		<div>
			<Route exact path='/' component={Main} />
			<Route exact path='/joke' component={Joke} />
			<Route exact path='/jokes' component={Jokes} />
			<Route exact path='/addJoke' component={AddJoke} />
			<Route path='/home' render={() => <h1>Hello</h1>} />
		</div>
	</BrowserRouter>,
	document.getElementById('root')
);
