let React = require('react')

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

		var styleObj = {display:'none'}

		if (this.props.state.focusId === objectId) {
			styleObj = {
				display:'block',
				margin:'0 auto',
				'borderBottom':'2px dashed slategrey',
				opacity:'1',
				transition:'opacity 1s ease',
				width:'500px'
			}
		}
		else {
			styleObj = {
				display:'none',
			}
		}

		return (
			<div id='programContainer' key={objectId}>
				<p id='programTitle'>{title}</p>
				<input type='button' id='programButton' value='+' onClick={walkieTalkie.bind(this)}/>
				<p id='programDetails' style={styleObj}>{date}<br/>
					{program}<br/>
					{guest}<br/>
					{notes}</p>
			</div>
			)
	}
})

export default SingleVenue