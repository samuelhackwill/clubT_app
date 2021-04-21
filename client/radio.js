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
})

Template.radioMobile.helpers({
	live(){
		return true
	}
})