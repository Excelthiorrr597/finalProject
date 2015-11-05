let React = require('react')

var VenueNewEntry = React.createClass({

	_goBack: function() {
		location.hash = 'venue/home'
	},

	_sendToRouter: function() {
        window.obj = this.refs.date.getDOMNode()
        window.obj2 = this.refs.time.getDOMNode()

		var title = this.refs.title.getDOMNode().value,
			date = this.refs.date.getDOMNode().value,
			program = this.refs.program.getDOMNode().value,
			guest = this.refs.guestArtist.getDOMNode().value,
			notes = this.refs.programNotes.getDOMNode().value

		if (!title) {
			alert('Fill in the Title Field')
			return
		}
		if (!date) {
			alert('Event must include a Date')
			return
		}
		if(!program) {
			alert('Event needs Program Information')
			return
		}
		if(!guest) {
			guest = null
		}
		if(!notes){
			notes = null
		}

		this.props.sendToRouter(title,date,program,guest,notes)
	},

	render: function() {
		return (
			<div>
				<input id='backButton' type='submit' value='Go Back Home' onClick={this._goBack} />
				<div id='newEventWrapper'>
					<input id='eventTitle' type='text' placeholder='Event Title' ref='title' />
                    <div>
					   <input id='eventDate' type='date' ref='date' />
                       <input id='eventTime' type='time' ref='time' />
                    </div>
					<textarea id='eventProgram' type='text' placeholder='Program Content' ref='program' />
					<input id='eventGuests' type='text' placeholder='Guest Artists (optional)' ref='guestArtist' />
					<textarea id='eventNotes' type='text' placeholder='Any additional notes or comments you want to include' ref='programNotes' />
					<div id='eventSubmitBox'>
						<input id='eventSubmit' type='submit' value='Submit Event' onClick={this._sendToRouter}/>
					</div>
				</div>
			</div>
			)
	}
})

export default VenueNewEntry