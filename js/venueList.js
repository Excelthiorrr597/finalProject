import SingleList from './singleList'

let React = require('react')

var VenueList = React.createClass({

    getInitialState: function() {
        return {
            focusId: null
        }
    },

    _goHome: function() {
        location.hash = 'consumer/home'
    },

    _logOut: function() {
        location.hash = 'logout'
    },

    _listProfiles: function(profile) {
        window.pron = profile
        return <SingleList singleProfile={profile} profileId={profile.id} state={this.state} _walkieTalkie={this._showDetails} />
    },

    _showDetails: function(profileId) {
        if (this.state.focusId === profileId) {
            this.setState({
                focusId: null
            })
        }
        else {
            this.setState({
                focusId: profileId
            })
        }
    },

    render: function() {
        return (
            <div>
                <div id='logOut'>
                    <input id='logOutButton' type='submit' value='Log Out' onClick={this._logOut} />
                    <input id='backButton' type='submit' value='Go Back Home' onClick={this._goHome} />
                </div>
                {this.props.profiles.map(this._listProfiles)}
            </div>
            )
    }
})

export default VenueList