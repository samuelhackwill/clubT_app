import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import '/imports/methods';
import './radio.html';


Template.radioBrowser.onRendered(function(){
 document.body.style.opacity=1
})

Template.radioMobile.onRendered(function(){
 document.body.style.opacity=1

 Session.set("playing", false)
})

Template.radioMobile.helpers({
	live(){
		return true
	},

	activeLink(arg){
		console.log(arg.hash.arg)
	},

	playing(){
		return Session.get("playing")
	}
})

Template.radioMobile.events({

	'click .Direct'(){
		Session.set("playing", true)
	}

})