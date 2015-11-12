let React = require('react')

import SingleFavorite from './singleFavorite'

var ConsumerFavorites = React.createClass({

	getInitialState: function() {
		return {
			focusId: null
		}
	},

	_goBack: function() {
		location.hash = 'consumer/home'
	},

	_logOut: function() {
		location.hash = 'logout'
	},

	_showDetails: function(eventId) {

		if (this.state.focusId === eventId) {
			this.setState({
				focusId: null
			})
		}
		else {
			this.setState({
				focusId: eventId
			})
		}
	},

	_singleFavorite: function(event) {
		return <SingleFavorite key={event.id} event={event} state={this.state} _walkieTalkie={this._showDetails}/>
	},

	render: function(){
		return (
			<div id='eventsList'>
				<div id='linkHolder'>
					<a id="logoutLink" href="#logout">Log Out</a>
                    <a id="backLink" href="#comsumer/home">Go Back Home</a>
				</div>
                <h2>These are your Favorited Events!</h2>
				<div>
					{this.props.events.map(this._singleFavorite)}
				</div>
			</div>
			)
	}
})

export default ConsumerFavorites
