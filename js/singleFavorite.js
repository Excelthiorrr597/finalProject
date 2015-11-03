let React = require('react'),
	Parse = require('parse')

var Favorite = Parse.Object.extend('Favorite')

var SingleFavorite = React.createClass ({

//need to work on functionality for deleting favorites

	render: function() {
		var event = this.props.event,
			title = event.get('title'),
			date = event.get('date'),
			program = event.get('program'),
			guest = event.get('guest'),
			notes = event.get('notes'),
			eventId = event.id

		if (!guest) guest = 'No Guest Artist'

		if (!notes) notes = 'No Additional Notes Provided'

		function walkieTalkie(){
			this.props._walkieTalkie(eventId)
		}

		function unfavorite(){
			var query = new Parse.Query(Favorite)
			query.get(eventId,{success: function(object){object.destroy({success: function(){alert('Removed from your favorites');location.hash='consumer/home'}})}})
		}		

		var styleObj = {display:'none'}
		var border = {border:'none'}

		if (this.props.state.focusId === eventId) {
			styleObj = {
				display:'block',
				margin:'0 auto',
				'borderBottom':'2px dashed slategrey',
				width:'500px'
			}
		}
		
		return (
			<div id='programContainer' key={eventId}>
				<p id='programTitle'>{title}</p>
				<input type='button' id='programButton' value='+' onClick={walkieTalkie.bind(this)}/>
				<p id='programDetails' style={styleObj}>{date}<br/>
					{program}<br/>
					{guest}<br/>
					{notes}<br/>
					<input type='submit' id='unfavoriteButton' value='Remove Favorite!' onClick={unfavorite.bind(this)} />
					</p>
			</div>
			)
	}
})

export default SingleFavorite