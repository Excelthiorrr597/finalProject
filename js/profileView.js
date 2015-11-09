let React = require('react'),
    Parse = require('parse')

var ProfileView = React.createClass({

    _goHome: () => {
        if (Parse.User.current().get('type')==='venue') location.hash = 'venue/home'
        else location.hash = 'consumer/home'
    },

    render: function() {
        var profile = this.props.profile,
            name = profile.get('name'),
            add1 = profile.get('add1'),
            city = profile.get('city'),
            state = profile.get('state'),
            zip = profile.get('zip'),
            email = profile.get('email'),
            url = `http://${profile.get('url')}`,
            citstzip = `${city}, ${state} ${zip}`

        return (
            <div id='profile'>
                <input type='submit' value='Go Home' onClick={this._goHome} id='backButton'/>
                <div id='profileContent'>
                    <p>{name}</p>
                    <p>{add1}</p>
                    <p>{citstzip}</p>
                    <p>{email}</p>
                    <a href={url}>Visit our website!</a>
                </div>
            </div>
            )
    }
})

export default ProfileView