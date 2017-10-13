import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../stylesheets/logo.svg';
import '../stylesheets/main.css';

import JokeStore from '../stores/jokeStore';
import * as JokeActions from '../actions/JokeActions';

class addJoke extends Component {
	constructor(){
		super();
		this.isAdded = this.isAdded.bind(this);
		this.state = {
			joke: '',
			isAddedText: ''
		};

		this.updateState = this.updateState.bind(this);
	}
	
	componentWillMount() {
		JokeStore.on('isAdded', this.isAdded);
	}

	componentWillUnmount() {
		JokeStore.removeListener('isAdded', this.isAdded);
	}

	updateState(e){
		this.setState({ joke: e.target.value });
	}

	addJoke() {
		JokeActions.createJoke(this.state.joke);
		this.setState({ joke: '' });
	}

	isAdded(){
		this.setState({ isAddedText: 'your joke was added, go back to the front page and find \'all available jokes\' to see it' });
	}

	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<h1 className='App-title'>Here you can add a new joke</h1>
				</header>
				<div>
					<p>But first, here's a link back to the <Link to="/">front page</Link></p>
					<input type='text' value={this.state.joke} onChange={this.updateState}/>
					<button onClick={this.addJoke.bind(this)}>Click</button>
					<p>{this.state.isAddedText}</p>
				</div>
			</div>
		);
	}
}

export default addJoke;