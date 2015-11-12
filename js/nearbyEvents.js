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
        var styleObj = {
            textAlign:'center'
        }
        return (
            <div style={styleObj}>
                <div id='linkHolder'>
                    <a id="logoutLink" href="#logout">Log Out</a>
                    <a id="backLink" href="#consumer/home">Go Back Home</a>
                </div>
                <h2>These are the Events in your Area</h2>
                {this.props.events.map(this._getNearbyEvents)}
            </div>
            )
    }
})



export default NearbyEvents