import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../stylesheets/logo.svg';
import '../stylesheets/main.css';
import Joke from './Joke/Joke';
import * as JokeActions from '../actions/JokeActions';
import JokeStore from '../stores/jokeStore';

export default class RandomJoke extends Component {

	constructor() {
		super();
		this.getJokes = this.getJokes.bind(this);
		this.state = {
			jokes: this.getJokes,
			isReady:false,
		};
	}

	componentWillMount() {
		JokeActions.getJokes();
		JokeStore.on('change', this.getJokes);
	}	

	componentWillUnmount() {
		JokeStore.removeListener('change', this.getJokes);
	}
	
	getJokes() {
		this.setState({
			jokes: JokeStore.getAll(),
		});
		this.setState({
			isReady: true
		});
	}

	render() {
		while(!this.state.isReady){
			return(
				<div>Is Loading...</div>
			);
		}
		
		const jokes = this.state.jokes;
		const randJoke = jokes[Math.floor(Math.random() * jokes.length)].joke;

		return (
			<div className='App'>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Here's a random joke</h1>
				</header>
				<div>
					<p>But first, here's a link back to the <Link to="/">front page</Link></p>
					<Joke joke={randJoke} />
				</div>
			</div>
		);
	}
}