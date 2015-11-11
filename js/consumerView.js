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

    _showVenueList: function() {
        location.hash ='consumer/list'
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
                    <input id='venueListButton' type='submit' value='View a List of Venues' onClick={this._showVenueList} />
				</div>
			</div>
			)
	}
})

export default ConsumerView