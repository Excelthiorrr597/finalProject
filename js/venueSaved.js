let React = require('react')

var VenueSaved = React.createClass({

	_getEvents: function(event) {
		var title = event.get('title'),
			date = event.get('date'),
			program = event.get('program'),
			guest = event.get('guest'),
			notes = event.get('notes'),
			objectId = event.id
		return (
			<div id='programContainer' key={objectId}>
				{title}<br/>
				{date}<br/>
				{program}<br/>
				{guest}<br/>
				{notes}
			</div>
			)
	},

	_goBack: function() {
		location.hash = 'venue/home'
	},

	_logOut: function() {
		location.hash = 'logout'
	},

	render: function() {
		var events = this.props.events
		console.log(events)
		return (
			<div>
				<input id='backButton' type='submit' value='Go Back Home' onClick={this._goBack} />
				<div id='logOut'>
					<input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
				</div>

				<div>
					{events.map(this._getEvents)}
				</div>	
			</div>
			)
	}
})

export default VenueSaved