import SingleVenue from './singleVenue.js'

let React = require('react')

var VenueSaved = React.createClass({

	getInitialState: function() {
		return {
			focusId: null
		}
	},

	_getEvents: function(event) {
		return <SingleVenue key={event.id} state={this.state} event={event} _walkieTalkie={this._showDetails} />
	},

	_goBack: function() {
		location.hash = 'venue/home'
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
		var events = this.props.events,
            styleObj = {
                display:'block'
            }

		return (
			<div id='eventsList'>
				<div id='linkHolder'>
					<a id="logoutLink" href="#logout">Log Out</a>
                    <a id="backLink" href="#venue/home">Go Back</a>
                </div>
                <h2>Here are your saved events!</h2>
				<div>
					{events.map(this._getEvents)}
				</div>
			</div>
			)
	}
})

export default VenueSaved