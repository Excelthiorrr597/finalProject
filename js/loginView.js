let React = require('react'),
	Parse = require('parse')

var LogInView = React.createClass({

	render: function() {
		return (
			<div>
				<LogIn logInUser={this.props.logInUser} signUpUser={this.props.signUpUser}/>
			</div>
			)
	}
})

var SignUp = React.createClass({

	_handleClick: function() {
		var username = this.refs.username.getDOMNode().value,
			password = this.refs.password.getDOMNode().value

		this.refs.username.getDOMNode().value = ''
		this.refs.password.getDOMNode().value = ''

		this.props.signUpUser(username,password)
	},

	_handleEnter: function(event) {
		if (event.which === 13) {
			var password = event.target.value,
				username = this.refs.username.getDOMNode().value

			event.target.value = ''
			this.refs.username.getDOMNode().value = ''

			this.props.signUpUser(username,password)
		}
	},

	_logIn: function() {
		React.render(<LogIn signUpUser={this.props.signUpUser} logInUser={this.props.logInUser}/>,document.querySelector('#container'))
	},

	render: function() {
		return (
			<div id='usrPassContainer'>
				<p>First Time User? Sign Up Here!</p>
				<div>
					<input id='usrPass' type='text' placeholder='Enter Username' ref='username'/>
					<input id='usrPass' type='password' placeholder='Enter Password' ref='password' onKeyPress={this._handleEnter}/>
				</div>
				<input id='submit' type='submit' onClick={this._handleClick}/>
				<div id='switchContainer'>
					<p id='switchText'><i>Already have an account? Click below to Log In</i></p>
					<input id='submit' type='submit' value='Log In' onClick={this._logIn}/>
				</div>
			</div>
			)
	}
})

var LogIn = React.createClass({

	_handleClick: function() {
		var username = this.refs.username.getDOMNode().value,
			password = this.refs.password.getDOMNode().value

		this.refs.username.getDOMNode().value = ''
		this.refs.password.getDOMNode().value = ''

		this.props.logInUser(username,password)
	},

	_handleEnter: function(event) {
		if (event.which === 13) {
			var password = event.target.value,
				username = this.refs.username.getDOMNode().value

			event.target.value = ''
			this.refs.username.getDOMNode().value = ''

			this.props.logInUser(username,password)
		}
	},

	_signUp: function() {
		React.render(<SignUp logInUser={this.props.logInUser} signUpUser={this.props.signUpUser}/>,document.querySelector('#container'))
	},

	render: function() {
		return (
			<div id='usrPassContainer'>
				<p>Log In Here!</p>
				<div>
					<input id='usrPass' type='text' placeholder='Enter Username' ref='username'/>
					<input id='usrPass' type='password' placeholder='Enter Password' ref='password' onKeyPress={this._handleEnter}/>
				</div>
				<input id='submit' type='submit' onClick={this._handleClick}/>
				<div id='switchContainer'>
					<p id='switchText'><i>First Time User? Click below to Sign Up</i></p>
					<input id='submit' type='submit' value='Sign Up' onClick={this._signUp}/>
				</div>
			</div>
			)
	}
})


export default LogInView