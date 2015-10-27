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

var APP_ID = '2TotJaout7xh2sVGRrYSQnwVmc1k7CL6qKPolcQf',
	JS_KEY = '2mmibCcmnly9cgCjDdGojsFpWEiBkoEfT3HUcN2Q',
	REST_API = 'dO5oxq9Dci9CBcxc4DLYF7LnbpQp3QltSIs2x31G'

Parse.initialize(APP_ID,JS_KEY)

var ProjectRouter = Backbone.Router.extend({

	routes: {
		'login':'showLogInView',
		'logout':'logOutUser',
		'consumer/home':'showConsumerView',
		'venue/home':'showVenueView',
		'*default':'showLogInView'
	},

	logOutUser: function() {
		console.log('logging user out')
		Parse.User.logOut()
		location.hash = 'login'
	},

	showConsumerView: function() {
		console.log('showing consumer view')
		React.render(<ConsumerView />, document.querySelector('#container'))
	},

	showLogInView: function() {
		console.log('showing login view')
		React.render(<LogInView logInUser={this.logInUser} signUpUser={this.signUpUser}/>, document.querySelector('#container'))
	},

	showVenueView: function() {
		console.log('showing venue view')
		React.render(<VenueView />, document.querySelector('#container'))
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