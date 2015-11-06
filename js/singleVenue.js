let React = require('react'),
	Parse = require('parse'),
    swal = require('sweetalert')

var Event = Parse.Object.extend('Event'),
    Favorite = Parse.Object.extend('Favorite')

var SingleVenue = React.createClass ({

	render: function() {
		var event = this.props.event,
			title = event.get('title'),
			date = event.get('date'),
			program = event.get('program'),
			guest = event.get('guest'),
			notes = event.get('notes'),
			objectId = event.id,
            name = event.get('name')

		if (!guest) guest = 'No Guest Artist'

		if (!notes) notes = 'No Additional Notes Provided'

		function walkieTalkie(){
			this.props._walkieTalkie(objectId)
		}

		function favorite(){
			var favorite = new Favorite()
			favorite.set({
                'name':name,
				'title':title,
				'date':date,
				'program':program,
				'guest':guest,
				'notes':notes,
				'eventId':objectId,
				'userId':Parse.User.current().id
			})
			favorite.save().then(function(){
				swal({title:'Saved to your favorites',type:'success'})
				location.hash = 'consumer/home'
			})
		}

        function destroy(){
            var query = new Parse.Query(Event)
            query.get(objectId,{success: function(object){object.destroy({success: function(){swal({title:'Event Deleted!',type:'success'});location.hash='venue/home'}})}})
        }

		var styleObj = {display:'none'},
            plusMinus = '+'

		if (this.props.state.focusId === objectId) {
			styleObj = {
				display:'block',
				margin:'0 auto',
				'borderBottom':'2px dashed slategrey',
				width:'500px'
			}
            plusMinus = '-'
		}

		var styleObj2 = {display:'none'}
		if (Parse.User.current().get('type')==='consumer') styleObj2={display:'block'}

        var styleObj3 = {display:'none'}
        if (Parse.User.current().get('type')==='venue') styleObj3={display:'block'}

        var programLines = program.trim().split('\n')

		return (
			<div id='programContainer' key={objectId}>
				<p id='programTitle'>{title}</p>
				<input type='button' id='programButton' value={plusMinus} onClick={walkieTalkie.bind(this)}/>
				<div id='programDetails' style={styleObj}>
                    <p>{name}</p>
					{programLines.map((line) => <p>{line}</p>)}
                    <p>{date}</p>
					<p>{guest}</p>
					<p>{notes}</p>
					<input type='submit' id='favoriteButton' value='Favorite!' onClick={favorite.bind(this)} style={styleObj2}/>
                    <input type='submit' id='deleteButton' value='Delete Event' onClick={destroy.bind(this)} style={styleObj3}/>
				</div>
			</div>
			)
	}
})

export default SingleVenue