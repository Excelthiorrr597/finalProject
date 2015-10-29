// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher'),
	Backbone = require('backbone'),
	$ = require('jquery'),
	React = require('react'),
	Parse = require('parse')

console.log('loaded javascript')

window.p = Parse

import LogInView from './loginView.js'
import ConsumerView from './consumerView.js'
import VenueView from './venueView.js'
import VenueNewEntry from './venueNewEntry.js'
import VenueProfile from './venueProfile.js'
import VenueSaved from './venueSaved.js'

var APP_ID = '2TotJaout7xh2sVGRrYSQnwVmc1k7CL6qKPolcQf',
	JS_KEY = '2mmibCcmnly9cgCjDdGojsFpWEiBkoEfT3HUcN2Q',
	REST_API = 'dO5oxq9Dci9CBcxc4DLYF7LnbpQp3QltSIs2x31G'

Parse.initialize(APP_ID,JS_KEY)

var Event = Parse.Object.extend('Event'),
	Profile = Parse.Object.extend('Profile')


var ProjectRouter = Backbone.Router.extend({

	routes: {
		'login':'showLogInView',
		'logout':'logOutUser',
		'consumer/home':'showConsumerView',
		'consumer/search/:query':'showConsumerSearchView',
		'consumer/saved':'showConsumerEntries',
		'venue/home':'showVenueView',
		'venue/new':'showVenueNewEntry',
		'venue/profile':'showVenueProfile',
		'venue/saved':'showVenueEntries',
		'*default':'showDefaultView'
	},

	logOutUser: function() {
		console.log('logging user out')
		Parse.User.logOut()
		location.hash = 'login'
	},

	showConsumerEntries: function() {
		console.log('showing consumer entries')
	},

	showConsumerSearchView: function(query) {
		console.log('showing search view')
	},

	showConsumerView: function() {
		console.log('showing consumer view')
		React.render(<ConsumerView />, document.querySelector('#container'))
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

	showVenueProfile: function() {
		console.log('editing venue profile')
		React.render(<VenueProfile profileUpdate={this.updateVenueProfile} />,document.querySelector('#container'))
	},

	showVenueView: function() {
		console.log('showing venue view')
		React.render(<VenueView />, document.querySelector('#container'))
	},

	updateVenueProfile: function(name,add1,add2,city,state,zip) {
		var query = new Parse.Query(Profile)
		query.equalTo("venueId", Parse.User.current().id)
		query.find({
			success: function(profile) {
				if (profile.length !== 0) {
					var update = profile[0]
					update.set({
						'name':name,
						'add1':add1,
						'add2':add2,
						'city':city,
						'state':state,
						'zip':zip
					})
					update.save().then(function(){
					location.hash = 'venue/home'
					alert('Profile Updated')
					})
				}
				else {
					var profile = new Profile()
					profile.set({
						'name':name,
						'add1':add1,
						'add2':add2,
						'city':city,
						'state':state,
						'zip':zip,
						'venueId':Parse.User.current().id
					})	
					profile.save().then(function(){
					location.hash = 'venue/home'

					alert('Profile Created')
					})
				}
				
			}, error: function(object,error) {
				console.log(object)
				console.log(error.message)
				alert('Update failed')
				location.hash = 'venue/home'
			}
		})
	},


	newEventEntry: function(title,date,program,guest,notes) {
		var	event = new Event()
		event.set({
			'title':title,
			'date':date,
			'program':program,
			'guest':guest,
			'notes':notes,
			'venueId':Parse.User.current().id
		})
		event.save().then(function(){
			alert('Saved to Database')
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
			alert('Username/Password combination not in the database')
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
				location.hash = 'venue/home'
			}			
		}, function(err){
			alert('Username already taken')
		})
	},

	initialize: function(){
		if (!Parse.User.current()) location.hash = 'login'
		console.log('initializing router')
		Backbone.history.start()
	}
})

var pr = new ProjectRouter()