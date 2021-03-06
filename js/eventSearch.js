import SingleVenue from './singleVenue'

let React = require('react')

var EventSearch = React.createClass({

    getInitialState: function() {
        return {
            focusId: null
        }
    },

    _getQueriedEvents: function(event) {
        return <SingleVenue key={event.id} state={this.state} event={event} _walkieTalkie={this._showDetails} />
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
                {this.props.events.map(this._getQueriedEvents)}
            </div>
            )
    }
})

export default EventSearch