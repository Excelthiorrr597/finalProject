import SingleList from './singleList'

let React = require('react')

var VenueList = React.createClass({

    getInitialState: function() {
        return {
            focusId: null
        }
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
        var styleObj = {
            textAlign:'center'
        }
        return (
            <div style={styleObj}>
                <div id='linkHolder'>
                    <a id="logoutLink" href="#logout">Log Out</a>
                    <a id="backLink" href="#consumer/home">Go Back Home</a>
                </div>
                {this.props.profiles.map(this._listProfiles)}
            </div>
            )
    }
})

export default VenueList