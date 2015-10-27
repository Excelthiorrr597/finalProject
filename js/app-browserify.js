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
import HomeView from './homeView.js'

var APP_ID = '2TotJaout7xh2sVGRrYSQnwVmc1k7CL6qKPolcQf',
	JS_KEY = '2mmibCcmnly9cgCjDdGojsFpWEiBkoEfT3HUcN2Q',
	REST_API = 'dO5oxq9Dci9CBcxc4DLYF7LnbpQp3QltSIs2x31G'

Parse.initialize(APP_ID,JS_KEY)

var ProjectRouter = Backbone.Router.extend({

	routes: {
		'login':'showLogInView',
		'logout':'logOutUser',
		'home':'showHomeView',
		'*default':'showHomeView'
	},

	logOutUser: function() {
		console.log('logging user out')
		Parse.User.logOut()
		location.hash = 'login'
	},

	showHomeView: function() {
		console.log('showing home view')
		React.render(<HomeView />, document.querySelector('#container'))
	},

	showLogInView: function() {
		console.log('showing login view')
		React.render(<LogInView logInUser={this.logInUser} signUpUser={this.signUpUser}/>, document.querySelector('#container'))
	},

	logInUser: function(username,password)	{
		var newUser = new Parse.User()
		newUser.set({
			'username':username,
			'password':password
		})
		newUser.logIn().then(function(){
			location.hash = 'home'
		}, function(err){
			alert('Username/Password combination not in the database')
		})
	},

	signUpUser: function(username,password) {
		var newUser = new Parse.User()
		newUser.set({
			'username':username,
			'password':password
		})
		newUser.signUp().then(function(){
			location.hash = 'home'
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