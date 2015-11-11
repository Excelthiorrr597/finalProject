let React = require('react'),
    Parse = require('parse')

var VenueView = React.createClass({

	_editProfileView: function() {
		location.hash = 'venue/edit'
	},

	_enterEventView: function() {
		location.hash = 'venue/new'
	},

	_logOut: function() {
		location.hash = 'logout'
	},

    _viewProfileView: function() {
        var name = Parse.User.current().get('name')
        location.hash = `profile/${name}`
    },

	_viewSavedEvents: function() {
		location.hash = 'venue/saved'
	},

	render: function() {
        var venue = Parse.User.current().get('name')

		return (
			<div>
				<div id='logOut'>
					<input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
				</div>
				<div id='venueMenu'>
					<h2>Welcome {venue}!</h2>
                    <input id='venueProfileViewButton' type='submit' value='View Profile' onClick={this._viewProfileView} />
					<input id='venueProfileEditButton' type='submit' value='Edit Profile' onClick={this._editProfileView} />
					<input id='venueNewEventButton' type='submit' value='Enter New Event' onClick={this._enterEventView} />
					<input id='venueSavedEventButton' type='submit' value='View/Edit Saved Events' onClick={this._viewSavedEvents} />
				</div>
			</div>
			)
	}
})

export default VenueView