// es5 and 6 polyfills, powered by babel
require("babel/polyfill")
require('isomorphic-fetch')

let Backbone = require('backbone'),
	$ = require('jquery'),
	React = require('react'),
	Parse = require('parse'),
    nlp = require('nlp_compromise'),
    swal = require('sweetalert')

console.log('loaded javascript')

window.p = Parse

import LogInView from './loginView'
import ConsumerView from './consumerView'
import AvailableEvents from './availableEvents'
import ConsumerFavorites from './consumerFavorites'
import NearbyEvents from './nearbyEvents'
import EventSearch from './eventSearch'
import ProfileView from './profileView'
import VenueView from './venueView'
import VenueNewEntry from './venueNewEntry'
import VenueProfile from './venueProfile'
import VenueSaved from './venueSaved'

//=============Google API Information==================//

var geolocationURL = 'https://maps.googleapis.com/maps/api/geocode/json?',
    API_KEY = 'AIzaSyBgNVgOm4vq0Aypg_0Tz8MYqNxSRX6SBlY',
    latlng

//=============Parse SDK Information===================//

var APP_ID = '2TotJaout7xh2sVGRrYSQnwVmc1k7CL6qKPolcQf',
	JS_KEY = '2mmibCcmnly9cgCjDdGojsFpWEiBkoEfT3HUcN2Q',
	REST_API = 'dO5oxq9Dci9CBcxc4DLYF7LnbpQp3QltSIs2x31G'

Parse.initialize(APP_ID,JS_KEY)

var Event = Parse.Object.extend('Event'),
	Profile = Parse.Object.extend('Profile'),
	Favorite = Parse.Object.extend('Favorite')

//=============Backbone Router=======================//

var ProjectRouter = Backbone.Router.extend({

	routes: {
		'login':'showLogInView',
		'logout':'logOutUser',
		'consumer/home':'showConsumerView',
		'consumer/events':'showAvailableEvents',
        'consumer/near':'showNearbyEvents',
		'consumer/search/:comp':'showSearchView',
		'consumer/saved':'showConsumerEntries',
        'profile/:name':'showVenueProfile',
		'venue/home':'showVenueView',
		'venue/new':'showVenueNewEntry',
		'venue/edit':'editVenueProfile',
		'venue/saved':'showVenueEntries',
		'*default':'showDefaultView'
	},

	logOutUser: function() {
		console.log('logging user out')
		Parse.User.logOut()
		location.hash = 'login'
	},

	showAvailableEvents: function() {
		var query = new Parse.Query(Event)
        document.querySelector('#container').innerHTML = `<img src='./images/loading2.gif'>`
		query.find({
			success: function(events) {
				React.render(<AvailableEvents events={events}/>, document.querySelector('#container'))
			}
		})
	},

	showConsumerEntries: function() {
		console.log('showing consumer entries')
        document.querySelector('#container').innerHTML = `<img src='./images/loading2.gif'>`
		var query = new Parse.Query(Favorite)
		query.equalTo('userId',Parse.User.current().id)
		query.find({
			success: function(events) {
				React.render(<ConsumerFavorites events={events}/>, document.querySelector('#container'))
			}
		})
	},

	showSearchView: function(comp) {
        comp = comp[0].toUpperCase() + comp.slice(1)
		console.log('showing search view')
        document.querySelector('#container').innerHTML = `<img src='./images/loading2.gif'>`
        var query = new Parse.Query(Event)
        query.matches('program',comp)
        query.find().then(function(events){
            React.render(<EventSearch events={events}/>,document.querySelector('#container'))
        })
	},

	showConsumerView: function() {
		console.log('showing consumer view')
		var query = new Parse.Query(Event)
        document.querySelector('#container').innerHTML = `<img src='./images/loading2.gif'>`
		query.find({
			success: function(events) {
				React.render(<ConsumerView events={events}/>, document.querySelector('#container'))
			}
		})
	},

    showNearbyEvents: function() {
        console.log('showing nearby events')
        swal({
            title:'Getting your location. May take a few seconds.',
            type:'success'
        })
        document.querySelector('#container').innerHTML = `<img src='./images/loading2.gif'>`
        navigator.geolocation.getCurrentPosition(function(loc){
            var lat = loc.coords.latitude,
                lng = loc.coords.longitude

            latlng = `${lat},${lng}`
            var ajaxParams = {
            url: geolocationURL,
            data: {
                key: API_KEY,
                latlng: latlng
                }
            }
            $.ajax(ajaxParams).then(function(obj){
                var usrLoc = obj.results[0].address_components[3].long_name
                console.log(usrLoc)
                var query = new Parse.Query(Event)
                query.equalTo('city',usrLoc)
                query.find({success:function(events){
                    React.render(<NearbyEvents events={events} />,document.querySelector('#container'))
                }})
            },function(){
                swal({title:'Oops!',text:'We had trouble getting your location. Please try again.',type:'error'})
                location.hash = 'consumer/home'
            })
        })
    },

	showDefaultView: function() {
		if (Parse.User.current().get('type')==='venue') {
			location.hash = 'venue/home'
			return
		}
		location.hash = 'consumer/home'
	},

	showLogInView: function() {
		console.log('showing login view')
		React.render(<LogInView logInUser={this.logInUser} signUpUser={this.signUpUser}/>, document.querySelector('#container'))
	},

	showVenueEntries: function() {
		console.log('showing saved entries')
        document.querySelector('#container').innerHTML = `<img src='./images/loading2.gif'>`
		var query = new Parse.Query(Event)
		query.equalTo('venueId',Parse.User.current().id)
		query.find({
			success: function(events) {
				React.render(<VenueSaved events={events}/>,document.querySelector('#container'))
			}
		})
	},

	showVenueNewEntry: function() {
		console.log('showing new entry')
		React.render(<VenueNewEntry sendToRouter={this.newEventEntry} />,document.querySelector('#container'))
	},

    showVenueProfile: function(name) {
        console.log('showing venue profile')
        document.querySelector('#container').innerHTML = `<img src='./images/loading2.gif'>`
        var query = new Parse.Query(Profile)
        query.equalTo('name',name)
        query.find({
            success: (profile) => {
                React.render(<ProfileView profile={profile[0]} />, document.querySelector('#container'))
            }
        });
    },

	editVenueProfile: function() {
		console.log('editing venue profile')
		React.render(<VenueProfile profileUpdate={this.updateVenueProfile} />,document.querySelector('#container'))
	},

	showVenueView: function() {
		console.log('showing venue view')
		React.render(<VenueView />, document.querySelector('#container'))
	},

	updateVenueProfile: function(name,add1,city,state,zip,email,url) {
		var query = new Parse.Query(Profile)
        document.querySelector('#container').innerHTML = `<img src='./images/loading2.gif'>`
		query.equalTo("venueId", Parse.User.current().id)
		query.find({
			success: function(profile) {
				if (profile.length !== 0) {
					var update = profile[0]
					update.set({
						'name':name,
						'add1':add1,
						'city':city,
						'state':state,
						'zip':zip,
                        'email':email,
                        'url':url,
					})
					update.save().then(function(){
						var user = Parse.User.current()
						user.set({'city':city,'name':name})
						user.save()}).then(function(){
					location.hash = 'venue/home'
					swal({title:'Profile Updated',type:'success'})
					})
				}
				else {
					var profile = new Profile()
					profile.set({
						'name':name,
						'add1':add1,
						'city':city,
						'state':state,
						'zip':zip,
						'venueId':Parse.User.current().id,
                        'email':email,
                        'url':url,
                        'username':Parse.User.current().get('username')
					})
					profile.save().then(function(){
						var user = Parse.User.current()
						user.set({'city':city,'name':name})
						user.save()})
						.then(function(){
						location.hash = 'venue/home'
					swal({title:'Profile Created',type:'success'})
					})
				}

			}, error: function(object,error) {
				console.log(object)
				console.log(error.message)
				swal({title:'Update failed',type:'error'})
				location.hash = 'venue/home'
			}
		})
	},


	newEventEntry: function(title,date,program,guest,notes) {
		var	event = new Event()
		event.set({
			'name':Parse.User.current().get('name'),
			'title':title,
			'date':date,
			'program': program,
			'guest':guest,
			'notes':notes,
			'city':Parse.User.current().get('city'),
			'venueId':Parse.User.current().id
		})
		event.save().then(function(){
			swal({title:'Saved to Database',type:'success'})
		})
		location.hash = 'venue/home'
	},

	logInUser: function(username,password)	{
		var newUser = new Parse.User()
		newUser.set({
			'username':username,
			'password':password
		})
		newUser.logIn().then(function(){
			if (Parse.User.current().get('type') === 'consumer') {
				location.hash = 'consumer/home'
			}
			if (Parse.User.current().get('type') === 'venue') {
				location.hash = 'venue/home'
			}
		}, function(err){
			swal({title:'Oops!',text:'Username/Password combination not in the database',type:'error'})
		})
	},

	signUpUser: function(username,password,email,type) {
		var newUser = new Parse.User()
		newUser.set({
			'username':username,
			'password':password,
			'type':type,
			'email':email
		})
		newUser.signUp().then(function(){
			if (type === 'consumer') {
				location.hash = 'consumer/home'
			}
			if (type === 'venue') {
				location.hash = 'venue/edit'
			}
		}, function(err){
			swal({title:'Oops!',text:'Username already taken',type:'error'})
		})
	},

	initialize: function(){
		if (!Parse.User.current()) location.hash = 'login'
		console.log('initializing router')
		Backbone.history.start()
	}
})

var pr = new ProjectRouter()
