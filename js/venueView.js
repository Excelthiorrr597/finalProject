let React = require('react'),
    Parse = require('parse')

var VenueView = React.createClass({

    _viewProfileView: function() {
        var name = Parse.User.current().get('name')
        location.hash = `profile/${name}`
    },

	render: function() {
        var venue = Parse.User.current().get('name'),
            url = `#profile/${venue}`

		return (
			<div>
				<div id='logOut'>
					<a id="logoutLink" href="#logout">Log Out!</a>
				</div>
				<div id='venueMenu'>
					<h2>Welcome {venue}!</h2>
                    <div id="linkHolder">
    					<a id="profileViewLink" href={url}>View Profile</a>
                        <a id="profileEditLink" href="#venue/edit">Edit Profile</a>
    					<a id="venueNewEventLink" href="#venue/new">Enter New Event</a>
                        <a id="venueSavedLink" href="#venue/saved">View Saved Events</a>
                    </div>
				</div>
			</div>
			)
	}
})

export default VenueView