let React = require('react'),
	Parse = require('parse')

var HomeView = React.createClass({

	_logOut: function() {
		location.hash = 'logout'
	},

	render: function() {
		return (
			<div id='logOut'>
				<input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
			</div>
			)
	}
})

export default HomeView