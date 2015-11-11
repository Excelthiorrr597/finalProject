let React = require('react'),
    Parse = require('parse')


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

	_showAvailableEvents: function() {
		location.hash = 'consumer/events'
	},

    _showNearbyEvents: function() {
        location.hash = 'consumer/near'
    },

	_showSavedEvents: function() {
		location.hash = 'consumer/saved'
	},

	render: function() {
        var user = Parse.User.current().get('username')

        var styleObj = {textAlign:'center'}

		return (
			<div id='ConsumerView' style={styleObj}>
				<div id='logOut'>
					<input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
				</div>
                <h2>Welcome {user}!</h2>
				<div id='consumerMenu'>
                    <input id='consumerEventSearch' type='text' placeholder='Search for Events' onKeyPress={this._handleEnter}/>
					<input id='availableEvents' type='submit' value='View Available Events' onClick={this._showAvailableEvents} />
                    <input id='nearbyEvents' type='submit' value='View Nearby Events' onClick={this._showNearbyEvents} />
					<input id='consumerSavedEventsButton' type='submit' value='View Saved Events' onClick={this._showSavedEvents} />
				</div>
			</div>
			)
	}
})

export default ConsumerView