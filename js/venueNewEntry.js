let React = require('react'),
    $ = require('jquery'),
    swal = require('sweetalert')

var VenueNewEntry = React.createClass({

    componentDidMount: function() {
        this._newEvent = []
    },

    _addPiece: function() {
        console.log('clicked')
        var newPiece = document.createElement('input'),
            newComposer = document.createElement('input'),
            newEntry = document.createElement('div')

        window.newEvent = this._newEvent

        newPiece.setAttribute('ref','piece')
        newPiece.placeholder = 'Enter Piece'
        newPiece.className = 'piece'

        newComposer.setAttribute('ref','composer')
        newComposer.placeholder = 'Enter Composer'
        newComposer.className = 'composer'

        newEntry.appendChild(newPiece)
        newEntry.appendChild(newComposer)
        document.querySelector('#programContent').appendChild(newEntry)
    },

	_goBack: function() {
		location.hash = 'venue/home'
	},

    _pushToArray: function(){
        var pieces = document.getElementsByClassName('piece'),
            composers = document.getElementsByClassName('composer'),
            i = 0

        while ( i < pieces.length) {
            var piece = pieces[i].value,
                composer = composers[i].value,
                event = {}

            event = {
                piece:piece,
                composer:composer
            }
            this._newEvent.push(event)
            i++
        }

        swal({title:'Pieces Prepared for Submitting',type:'success',animation:'slide-from-bottom'})
        console.log(this._newEvent)
    },

	_sendToRouter: function() {
		var title = this.refs.title.getDOMNode().value,
			date = this.refs.date.getDOMNode().value,
			program = this._newEvent,
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
			swal({title:'Fill in the Title Field',type:'error'})
			return
		}
		if (!date) {
			swal({title:'Event must include a Date',type:'error'})
			return
		}
		if(program.length === 0) {
			swal({title:"Don't forget to Submit Program Information",type:'error'})
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
                <div id="logOut">
				    <a id="backLink" href="#venue/home">Go Back Home</a>
				</div>
                <div id='newEventWrapper'>
					<input id='eventTitle' type='text' placeholder='Event Title' ref='title' />
                    <div>
					   <input id='eventDate' type='datetime-local' ref='date' />
                    </div>
                    <div id='programContent'>
                        <input type='submit' id="programAdd" value='Add a New Piece' onClick={this._addPiece}/>
                        <input type='submit' id="programAdd" value='Submit Program' onClick={this._pushToArray} />
                    </div>
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