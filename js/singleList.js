let React = require('react')

var SingleList = React.createClass({

    render: function() {
        var profile = this.props.singleProfile,
            name = profile.get('name'),
            address = profile.get('add1'),
            city = profile.get('city'),
            state = profile.get('state'),
            zip = profile.get('zip'),
            profileId = profile.id,
            url = `#profile/${name}`,
            citstzip = `${city}, ${state} ${zip}`

        function walkieTalkie(){
            this.props._walkieTalkie(profileId)
        }

        var styleObj = {display:'none'},
            plusMinus = '+'

        if (this.props.state.focusId === profileId) {
            styleObj = {
                display:'block',
                margin:'0 auto',
                borderBottom:'2px dashed slategrey',
                width:'500px',
                backgroundColor: 'white'
            }
            plusMinus = '-'
        }

        return (
            <div id='singleListContainer' >
                <p id='listTitle'>{name}</p>
                <input type='button' id='listButton' value={plusMinus} onClick={walkieTalkie.bind(this)}/>
                <div id='listDetails' style={styleObj}>
                    <p>{citstzip}</p>
                    <a href={url}>Click Here to Visit their Profile</a>
                </div>
            </div>
            )

    }
})

export default SingleList