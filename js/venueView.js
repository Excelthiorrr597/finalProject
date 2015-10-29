let React = require('react')

var VenueView = React.createClass({

	_editProfileView: function() {
		location.hash = 'venue/profile'
	},

	_enterEventView: function() {
		location.hash = 'venue/new'
	},

	_logOut: function() {
		location.hash = 'logout'
	},

	_viewSavedEvents: function() {
		location.hash = 'venue/saved'
	},

	render: function() {
		return (
			<div>
				<div id='logOut'>
					<input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
				</div>
				<div id='venueMenu'>
					<h2>What can I do for you?</h2>
					<input id='venueProfileEditButton' type='submit' value='Edit Profile' onClick={this._editProfileView} />
					<input id='venueNewEventButton' type='submit' value='Enter New Event' onClick={this._enterEventView} />
					<input id='venueSavedEventButton' type='submit' value='View/Edit Saved Events' onClick={this._viewSavedEvents} />
				</div>
			</div>
			)
	}
})

export default VenueView