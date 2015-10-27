let React = require('react')

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
			password = this.refs.password.getDOMNode().value,
			email = this.refs.email.getDOMNode().value,
			consumer = this.refs.consumer.getDOMNode().value,
			venue = this.refs.venue.getDOMNode().value,
			type = ''

		this.refs.username.getDOMNode().value = ''
		this.refs.password.getDOMNode().value = ''
		this.refs.email.getDOMNode().value = ''

		if (this.refs.consumer.getDOMNode().checked) {type = consumer}
		else if (this.refs.venue.getDOMNode().checked) {type = venue}
		else {alert('Please select Consumer or Venue'); return}


		this.props.signUpUser(username,password,email,type)
	},

	_handleEnter: function(event) {
		if (event.which === 13) {
			var password = this.refs.password.getDOMNode().value,
				username = this.refs.username.getDOMNode().value,
				email = this.refs.email.getDOMNode().value

			this.refs.password.getDOMNode().value =''
			this.refs.username.getDOMNode().value = ''
			this.refs.email.getDOMNode().value =''

			this.props.signUpUser(username,password,email)
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
					<input id='usrPass' type='text' placeholder='Enter Username' ref='username' onKeyPress={this._handleEnter}/>
					<input id='usrPass' type='password' placeholder='Enter Password' ref='password' onKeyPress={this._handleEnter}/>
				</div>
				<div>
					<input id='email' type='text' placeholder='Enter Email' ref='email' onKeyPress={this._handleEnter}/>
				</div>
				<form>
					<input type='radio' name='type' value='consumer' ref='consumer'>Consumer</input>
					<br/>
					<input type='radio' name='type' value='venue' ref='venue'>Venue</input>
				</form>
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