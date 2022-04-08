import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import '/imports/methods';

import './tarot.html';


Template.tarot.onRendered(function(){
	// Meteor.subscribe("TheDiscussion",()=>{
	// 	console.log("arrived!!!")
	// 	document.getElementsByClassName("chatContainer")[0].style.opacity=1
	// });	
	
	document.body.style.opacity=1
	$(document.body).addClass('tarot');

})

Template.tarot.helpers({
	
})


Template.tarot.events({

})