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

	var allAudio = document.getElementsByClassName("soundBytes");
	
	for (var i = document.getElementsByClassName("soundBytes")[0].children.length - 1; i >= 0; i--) {
		document.getElementsByClassName("soundBytes")[0].children[i].children[1].onended=hideSelf
	}
	// audio1.onended = function() {
	// 	alert("audio playback has ended");
	// };

})

Template.tarot.helpers({
	
})


Template.tarot.events({

})

hideSelf = function(){
	console.log(this)
	this.parentElement.style.backgroundColor="beige"
	this.parentElement.style.opacity=0.5
}