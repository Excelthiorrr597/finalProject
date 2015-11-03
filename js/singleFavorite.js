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
				alert('saved')
				location.hash = 'consumer/home'
			})
		}

		var styleObj = {display:'none'}
		var color = {color:'grey'}

		if (this.props.state.focusId === objectId) {
			styleObj = {
				display:'block',
				margin:'0 auto',
				'borderBottom':'2px dashed slategrey',
				opacity:'1',
				transition:'opacity 1s ease',
				width:'500px'
			}
			color = {color:'black'}
		}
		
		var styleObj2 = {display:'none'}
		//if (Parse.User.current().get('type')==='consumer') styleObj2={display:'block'}

		return (
			<div id='programContainer' key={objectId}>
				<p id='programTitle' style={color}>{title}</p>
				<input type='button' id='programButton' value='+' onClick={walkieTalkie.bind(this)}/>
				<p id='programDetails' style={styleObj}>{date}<br/>
					{program}<br/>
					{guest}<br/>
					{notes}<br/>
					<input type='submit' id='unfavoriteButton' value='Remove Favorite!' onClick={favorite.bind(this)} style={styleObj2}/>
					</p>
			</div>
			)
	}
})

export default SingleFavorite