let React = require('react'),
    Parse = require('parse'),
    $ = require('jquery')

var ProfileView = React.createClass({

    componentDidMount: function() {
        this._initMap()
    },

    _goHome: () => {
        if (Parse.User.current().get('type')==='venue') location.hash = 'venue/home'
        else location.hash = 'consumer/home'
    },

    _initMap: function() {
        console.log('initializing map')
        var lat = this.props.profile.get('lat'),
            lng = this.props.profile.get('lng')

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: lng},
            scrollwheel: false,
            zoom: 16
        });
        var marker = new google.maps.Marker({
            map:map,
            position: {lat:lat,lng:lng}
        })

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
            citstzip = `${city}, ${state} ${zip}`,
            lat = profile.get('lat'),
            lng = profile.get('lng')

        return (
            <div id='profile'>
                <input type='submit' value='Go Home' onClick={this._goHome} id='backButton'/>
                <div id='profileContent'>
                    <p>{name}</p>
                    <p>{add1}</p>
                    <p>{citstzip}</p>
                    <p>{email}</p>
                    <a href={url}>Visit our website!</a>
                    <div id="map"></div>
                </div>
            </div>
            )
    }
})

$(window).load

export default ProfileView