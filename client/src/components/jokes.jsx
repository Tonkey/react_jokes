import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../stylesheets/logo.svg';
import '../stylesheets/main.css';
import '../stylesheets/Jokes.css';

// import Joke from './Joke/Joke';
// import * as JokeActions from '../actions/JokeActions';
import JokeStore from '../stores/jokeStore';

export default class Jokes extends Component {
	constructor() {
		super();

		this.getJokes = this.getJokes.bind(this);
		this.state = {
			jokes: JokeStore.getAll()
		};
	}

	componentWillMount() {
		JokeStore.on('change', this.getJokes);
	}



	componentWillUnmount() {
		JokeStore.removeListener('change', this.getJokes);
	}

	getJokes() {
		this.setState({
			jokes: JokeStore.getAll()
		});
	}


	render() {
		const { jokes } = this.state;
		const jokesList = jokes.map((joke, i) => <li key={i}>{joke.joke}</li>);
		// const jokesList = jokes.map((joke, i) => <Joke key={i} joke={joke.joke} />);

		return (
			<div className='App'>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Here's a list of all available jokes</h1>
				</header>
				<div>
					<p>But first, here's a link back to the <Link to="/">front page</Link></p>
					<ul>
						{jokesList}
					</ul>
				</div>
			</div>
		);
	}
}

// <button onClick={this.createJoke.bind(this)}>Create</button>