let React = require('react')

var ConsumerView = React.createClass({

	_logOut: function() {
		location.hash = 'logout'
	},

	_showEvents: function() {
		console.log('showing events')
	},

	render: function() {
		return (
			<div id='ConsumerView'>
				<div id='logOut'>
					<input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
				</div>
				<div id='consumerMenu'>
					<input id='eventSearch' type='text' placeholder='Search for Events' onKeyPress={this._handleEnter}/>
					<input id='eventsButton' type='submit' value='View Saved Events' onClick={this._showEvents} />
				</div>
			</div>
			)
	}
})

export default ConsumerView