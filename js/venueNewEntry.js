let React = require('react')

var VenueNewEntry = React.createClass({

	_goBack: function() {
		location.hash = 'venue/home'
	},

	_sendToRouter: function() {
		var title = this.refs.title.getDOMNode().value,
			date = this.refs.date.getDOMNode().value,
			program = this.refs.program.getDOMNode().value,
			guest = this.refs.guestArtist.getDOMNode().value,
			notes = this.refs.programNotes.getDOMNode().value

        var d = new Date(date),
            minutes = d.getUTCMinutes(),
            hours = d.getUTCHours(),
            years = d.getUTCFullYear(),
            days = d.getUTCDate(),
            wkday = d.getUTCDay(),
            month = d.getUTCMonth(),
            weekArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
            monthArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            timePeriod = 'AM'

        if (hours > 12) {
            timePeriod = 'PM'
            hours -= 12
        }

        if (minutes < 10) {
            minutes = '0' + minutes
        }

        wkday = weekArr[wkday]
        month = monthArr[month]

        date = wkday + ', ' + month + ' ' + days + ', ' + years + ' at ' + hours + ':' + minutes + ' ' + timePeriod

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
					   <input id='eventDate' type='datetime-local' ref='date' />
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