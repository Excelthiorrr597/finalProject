let React = require('react')

import SingleFavorite from './singleFavorite.js'

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
			<div>
				<input id='backButton' type='submit' value='Go Back Home' onClick={this._goBack} />
				<div id='logOut'>
					<input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
				</div>

				<div>
					{this.props.events.map(this._singleFavorite)}
				</div>	
			</div>
			)
	}
})

export default ConsumerFavorites
