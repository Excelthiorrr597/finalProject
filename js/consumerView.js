let React = require('react')

var ConsumerView = React.createClass({

	_logOut: function() {
		location.hash = 'logout'
	},

	_handleEnter: function(event) {
		if (event.which === 13) {
			var query = event.target.value
			location.hash = `consumer/search/${query}`
		}
	},

	_showSavedEvents: function() {
		location.hash = 'consumer/saved'		
	},

	render: function() {
		return (
			<div id='ConsumerView'>
				<div id='logOut'>
					<input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
				</div>
				<div id='consumerMenu'>
					<input id='consumerEventSearch' type='text' placeholder='Search for Events' onKeyPress={this._handleEnter}/>
					<input id='consumerEventsButton' type='submit' value='View Saved Events' onClick={this._showSavedEvents} />
				</div>
			</div>
			)
	}
})

export default ConsumerView