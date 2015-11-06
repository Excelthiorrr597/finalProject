let React = require('react'),
	Parse = require('parse'),
    swal = require('sweetalert')

var Favorite = Parse.Object.extend('Favorite')

var SingleFavorite = React.createClass ({

	render: function() {
		var event = this.props.event,
			title = event.get('title'),
			date = event.get('date'),
			program = event.get('program'),
			guest = event.get('guest'),
			notes = event.get('notes'),
			eventId = event.id,
            name = event.get('name')

		if (!guest) guest = 'No Guest Artist'

		if (!notes) notes = 'No Additional Notes Provided'

		function walkieTalkie(){
			this.props._walkieTalkie(eventId)
		}

		function unfavorite(){
			var query = new Parse.Query(Favorite)
			query.get(eventId,{success: function(object){object.destroy({success: function(){swal({title:'Removed from your Favorites',type:'success'});location.hash='consumer/home'}})}})
		}

		var styleObj = {display:'none'},
		    border = {border:'none'},
            plusMinus = '+'

		if (this.props.state.focusId === eventId) {
			styleObj = {
				display:'block',
				margin:'0 auto',
				'borderBottom':'2px dashed slategrey',
				width:'500px'
			}
            plusMinus = '-'
		}

        var programLines = program.trim().split('\n')

        return (
            <div id='programContainer' key={eventId}>
                <p id='programTitle'>{title}</p>
                <input type='button' id='programButton' value={plusMinus} onClick={walkieTalkie.bind(this)}/>
                <div id='programDetails' style={styleObj}>
                    <p>{name}</p>
                    {programLines.map((line) => <p>{line}</p>)}
                    <p>{date}</p>
                    <p>{guest}</p>
                    <p>{notes}</p>
                    <input type='submit' id='unfavoriteButton' value='Unfavorite!' onClick={unfavorite.bind(this)} />
                </div>
            </div>
            )
	}
})

export default SingleFavorite