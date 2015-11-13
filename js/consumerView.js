let React = require('react'),
    Parse = require('parse'),
    $ = require('jquery')

String.prototype.contains = function(substr) {
    return this.indexOf(substr) !== -1
}

Node.prototype.clearChildren = function() {
    while (this.firstChild) {
        this.removeChild(this.firstChild)
    }
}

var ConsumerView = React.createClass({

    componentWillMount: function() {
        this.compArray = []
        var self = this
        this.props.events.forEach(function(event){
            var programArray = event.get('programArray')
            programArray.forEach(function(program){
                self.compArray.push(program.composer)
            })
        })
    },

    getInitialState: function() {
        return {
            options: [],
            inputlength: 0
        }
    },

    _handleEnter: function(event) {
        var query = event.target.value
        if (event.which === 13) {
            location.hash = `consumer/search/${query}`
        }
    },

	_handleKeyStroke: function(event) {
        var query = event.target.value,
            filteredArray = this.compArray.filter(function(comp){
                return comp.toLowerCase().contains(query.toLowerCase())
            }).map((comp) => comp + '_' + query)
        this.setState({
            options:filteredArray,
            inputlength:query.length
        })
        console.log(query.length)
	},

	render: function() {
        var user = Parse.User.current().get('username'),
            styleObj = {textAlign:'center'}

		return (
			<div id='ConsumerView' style={styleObj}>
                <div id="logOut">
				    <a id="logoutLink" href="#logout">Log Out!</a>
                </div>
                <h2>Welcome {user}!</h2>
				<div id='consumerMenu'>
                    <div id='searchContainer'>
                        <input id='consumerEventSearch' type='text' placeholder='Search by Composer' onChange={this._handleKeyStroke} onKeyPress={this._handleEnter} ref='search'/>
                        <OptionsHolder length={this.state.inputlength} options={this.state.options} ref='options'/>
                    </div>
                    <div id='linkHolder'>
                        <a id="availableEventsLink" href="#consumer/events">View Available Events</a>
    					<a id="nearbyEventsLink" href="#consumer/near">View Nearby Events</a>
                        <a id="consumerSavedLink" href="#consumer/saved">View Saved Events</a>
                        <a id="venueListLink" href="#consumer/list">View a List of Venues</a>
                    </div>
				</div>
			</div>
			)
	}
})

var OptionsHolder = React.createClass({

    _assignInputValue: function(e) {
        var selection = e.target.textContent
        consumerSearchEl.value = selection
        location.hash = selection
    },

    _genOption: function(comp) {
        var styleObj = {
            border: '2px solid grey',
            backgroundColor:'white',
            width: '200px'
        },
            url=`#consumer/search/${comp}`
        if (this.props.length < 1) styleObj={display:'none'}
        var compNquery = comp.split('_'),
            comp = compNquery[0],
            query = compNquery[1],
            comp1 = comp.slice(0,comp.indexOf(query)),
            comp2 = comp.slice(comp.indexOf(query) + query.length)

        var compNode = <a href={url}>{comp1}<strong>{query}</strong>{comp2}</a>
        return <div key={comp} style={styleObj} className="option">{compNode}</div>
    },

    render: function() {
        var styleObj={
            position:'absolute',
            left:'25%'
        }

        return <div id='optionsHolder' style={styleObj}>
                {this.props.options.map(this._genOption)}
                </div>
    }
})

export default ConsumerView