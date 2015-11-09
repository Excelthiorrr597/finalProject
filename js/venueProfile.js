let React = require('react'),
	Parse = require('parse')

var VenueProfile = React.createClass({

	_goBack: function() {
		location.hash = 'venue/home'
	},

	_sendToRouter: function() {
		var name = this.refs.name.getDOMNode().value,
			add1 = this.refs.address1.getDOMNode().value,
			city = this.refs.city.getDOMNode().value,
			state = this.refs.state.getDOMNode().value,
			zip = this.refs.zip.getDOMNode().value,
            email = Parse.User.current().get('email'),
            url = this.refs.url.getDOMNode().value

		if (!name) {
			alert('Please Enter Name')
			return
		}
		if (!add1) {
			alert('Please Enter Address')
			return
		}
		if (!city) {
			alert('Please Enter City')
			return
		}
		if (!state) {
			alert('Please Enter State')
			return
		}
		if (!zip) {
			alert('Please Enter Zip')
			return
		}

		this.props.profileUpdate(name,add1,city,state,zip,email,url)
	},


	render: function() {
    var styleObj = {'textAlign':'center'}

		return (
			<div style={styleObj}>
				<input id='backButton' type='submit' value='Go Back Home' onClick={this._goBack} />
                <h2>Edit your Profile Information</h2>
				<div id='venueProfile'>
					<input id='venueName' type='text' placeholder='Venue Name' ref='name'/>
					<input id='venueAddress1' type='text' placeholder='Street Address' ref='address1'/>
                    <div>
    					<input id='venueCity' type='text' placeholder='City' ref='city'/>
    					<input id='venueState' type='text' maxLength='2' placeholder='ST' ref='state'/>
    					<input id='venueZip' type='text' maxLength='5' placeholder='Zip' pattern='\d*' ref='zip'/>
                    </div>
                    <input id='venueUrl' type='text' placeholder='Web Address' ref='url'/>
				</div>
				<div id='profileSubmitBox'>
					<input id='profileSubmit' type='submit' onClick={this._sendToRouter} />
				</div>
			</div>
			)
	}
})

export default VenueProfile