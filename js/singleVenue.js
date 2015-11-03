let React = require('react'),
	Parse = require('parse')

var Favorite = Parse.Object.extend('Favorite')

var SingleVenue = React.createClass ({

	render: function() {
		var event = this.props.event,
			title = event.get('title'),
			date = event.get('date'),
			program = event.get('program'),
			guest = event.get('guest'),
			notes = event.get('notes'),
			objectId = event.id

		if (!guest) guest = 'No Guest Artist'

		if (!notes) notes = 'No Additional Notes Provided'

		function walkieTalkie(){
			this.props._walkieTalkie(objectId)
		}

		function favorite(){
			var favorite = new Favorite()
			favorite.set({
				'title':title,
				'date':date,
				'program':program,
				'guest':guest,
				'notes':notes,
				'eventId':objectId,
				'userId':Parse.User.current().id
			})
			favorite.save().then(function(){
				alert('Saved to your favorites')
				location.hash = 'consumer/home'
			})
		}

		var styleObj = {display:'none'}

		if (this.props.state.focusId === objectId) {
			styleObj = {
				display:'block',
				margin:'0 auto',
				'borderBottom':'2px dashed slategrey',
				width:'500px'
			}
		}
		
		var styleObj2 = {display:'none'}
		if (Parse.User.current().get('type')==='consumer') styleObj2={display:'block'}

		return (
			<div id='programContainer' key={objectId}>
				<p id='programTitle'>{title}</p>
				<input type='button' id='programButton' value='+' onClick={walkieTalkie.bind(this)}/>
				<p id='programDetails' style={styleObj}>{date}<br/>
					{program}<br/>
					{guest}<br/>
					{notes}<br/>
					<input type='submit' id='favoriteButton' value='Favorite!' onClick={favorite.bind(this)} style={styleObj2}/>
					</p>
			</div>
			)
	}
})

export default SingleVenue