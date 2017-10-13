import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../stylesheets/logo.svg';
import '../stylesheets/main.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome Humanbeing</h1>
				</header>
				<div>
					<p>Here is the available sub-pages:</p>
					<p><Link to="/joke">Random joke</Link></p>
					<p><Link to="/jokes">All available jokes</Link></p>
					<p><Link to="/addJoke">Add a new joke</Link></p>
				</div>
			</div>
		);
	}
}

export default App;
