import SingleVenue from './singleVenue'

let React = require('react')

var NearbyEvents = React.createClass({

    getInitialState: function() {
        return {
            focusId: null
        }
    },

    _getNearbyEvents: function(event) {
        return <SingleVenue key={event.id} state={this.state} event={event} _walkieTalkie={this._showDetails} />
    },

    _goBack: function() {
        location.hash = 'consumer/home'
    },

    _logOut: function() {
        location.hash = 'logout'
    },

    _showDetails: function(objectId) {

        if (this.state.focusId === objectId) {
            this.setState({
                focusId: null
            })
        }
        else {
            this.setState({
                focusId: objectId
            })
        }
    },

    render: function() {
        return (
            <div>
                <div id='logOut'>
                    <input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
                    <input id='backButton' type='submit' value='Go Back Home' onClick={this._goBack} />
                </div>
                {this.props.events.map(this._getNearbyEvents)}
            </div>
            )
    }
})



export default NearbyEvents