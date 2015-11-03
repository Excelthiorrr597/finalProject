import SingleVenue from './singleVenue.js'

let React = require('react')

var AvailableEvents = React.createClass({

	getInitialState: function() {
		return {
			focusId: null
		}
	},

	_getEvents: function(event) {
		return <SingleVenue state={this.state} event={event} _walkieTalkie={this._showDetails} />
	},

	_goBack: function() {
		location.hash = 'consumer/home'
	},

	_logOut: function() {
		location.hash = 'logout'
	},

	_showDetails: function(objectId) {

		if (this.state.focusId === objectId) {
			this.setState({
				focusId: null
			})
		}
		else {
			this.setState({
				focusId: objectId
			})
		}
	},

	render: function() {
		return (
			<div>
				<input id='backButton' type='submit' value='Go Back Home' onClick={this._goBack} />
				<div id='logOut'>
					<input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
				</div>

				<div>
					{this.props.events.map(this._getEvents)}
				</div>	
			</div>
			)
	}
})





export default AvailableEvents