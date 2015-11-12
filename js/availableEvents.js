import SingleVenue from './singleVenue'

let React = require('react')

var AvailableEvents = React.createClass({

	getInitialState: function() {
		return {
			focusId: null
		}
	},

	_getEvents: function(event) {
		return <SingleVenue key={event.id} state={this.state} event={event} _walkieTalkie={this._showDetails} />
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
        var styleObj = {
            textAlign:'center'
        }
		return (
			<div style={styleObj}>
				<div id='linkHolder'>
					<a id="logoutLink" href="#logout">Log Out</a>
                    <a id="backLink" href="#consumer/home">Go Back Home</a>
				</div>
                <h2>Here are all Available Events</h2>
				<div>
					{this.props.events.map(this._getEvents)}
				</div>
			</div>
			)
	}
})





export default AvailableEvents