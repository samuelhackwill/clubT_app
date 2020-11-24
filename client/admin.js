import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import '/imports/methods';
import './main.html';
// import jsCookie from 'js-Cookie';
import moment from 'moment/min/moment-with-locales.min.js';


Template.registerHelper('formatedDate', function(timestamp) {
  return moment(timestamp).format('dddd [à] LT');
});

Template.vueAdmin.onCreated(function() {
	moment.locale('fr')
	// shuffle(allAudio);
	Meteor.subscribe("CardTime");
	Meteor.subscribe("ViewSwitcher");
	Meteor.subscribe("TheInstructions");
	Meteor.subscribe("TheDiscussion");
	Meteor.subscribe("GlobalVars");
	Meteor.subscribe("allTheCards")

	$(document.body).addClass('admin');

});


Template.vueAdmin.onRendered(function yo(){
	document.body.style.opacity=1

	// là faut trouver un meilleur hook, probablement un onbefore action avec iron router
	document.getElementById("mainTxtInput").focus();

	console.log("onrendered fired")

});

Template.vueAdmin.helpers({
	getDecks:function(){
		return TheCards.find({index:1})
	},

	currentRDV:function(){
		return GlobalVars.findOne({"name":"RDV"}).value
	},

	ViewSwitchers:function(){
	    return ViewSwitcher.find({})
  	},
  	
	lineADMIN:function(){
		// console.log("new line fetched")
		// montre moi les posts de MOI MEME, ou un des admins.
		return TheDiscussion.find({});
	},


})


Template.vueAdmin.events({
	// 'keyup #mainTxtInput' : function(e){
	//     e = e || window.event
	// 	if (e.keyCode == '13'){
	// 			pushTxt();
	// 	}
	// },
	'keyup #timeRDV' : function(e){
		whattime = document.getElementById("timeRDV").value
		fetched = GlobalVars.findOne({"name":"RDV"})
		GlobalVars.update(fetched._id, {$set:{"value":whattime},})
	},


	'click .removeAll' : function(){
		Meteor.call("removeAll")
	},

	'click .viewSwitcher' : function(e){
	    console.log(e.target.id)
	    fetched = ViewSwitcher.find({}).fetch()

	    // you know what? can't be arsed
	    if (e.target.id==="waiting") {
	    	// reset the phase to phase 1 (messages aren't broadcasted to everyone.)
	    	GlobalVars.update(GlobalVars.find({"name":"phase"}).fetch()[0]._id, {$set:{"value":"1"}})
	    	GlobalVars.update(GlobalVars.find({"name":"clickable"}).fetch()[0]._id, {$set:{"value":"1"}})
	    	GlobalVars.update(GlobalVars.find({"name":"end"}).fetch()[0]._id, {$set:{"value":"1"}})
	    }

	    for(i=fetched.length-1; i>-1; i--){
	    // uncheck all the other checkboxes
			ViewSwitcher.update(fetched[i]._id, {$set:{"activated":false},})
	    }

    // change the db for the checked checkbox
	    ViewSwitcher.update(ViewSwitcher.find({"name":e.target.id}).fetch()[0]._id, {$set:{"activated":!ViewSwitcher.find({"name":e.target.id}).fetch()[0].activated},})

  },


	'click #envoyer' : function(){
		pushTxt();
		document.getElementById("mainTxtInput").focus()
	},	

	'click #ToggleEveryone' : function(){
    	GlobalVars.update(GlobalVars.find({"name":"phase"}).fetch()[0]._id, {$set:{"value":"2"}})
	},

	'click #ToggleSolo' : function(){
    	GlobalVars.update(GlobalVars.find({"name":"phase"}).fetch()[0]._id, {$set:{"value":"1"}})
	},

	'click #ToggleClickable' : function(){
		_not =! GlobalVars.find({"name":"clickable"}).fetch()[0].value
    	GlobalVars.update(GlobalVars.find({"name":"clickable"}).fetch()[0]._id, {$set:{"value":_not}})
	},

	'click #End' : function(){
    	GlobalVars.update(GlobalVars.find({"name":"end"}).fetch()[0]._id, {$set:{"value":"2"}})
	},

	'click .tas' : function(e){
		console.log(e.target.innerHTML)

		_typeOfCard = e.target.innerHTML.substring(0,3)

		if (_typeOfCard=="TAR") {
			// tarot is 5 letters, so get number at the end of "tarot", position 5 of substring
			CardTime.update(CardTime.findOne()._id, {$set:{activated:"tarot"+e.target.innerHTML.substring(5)}})
			return
		}
		if (_typeOfCard=="TAS"){
			// tas is 3 letters, so get number at the end of "tas", position 3 of substring
			CardTime.update(CardTime.findOne()._id, {$set:{activated:"tas"+e.target.innerHTML.substring(3)}})
			return
		}
		if (_typeOfCard=="HID"){
			//"hide all tas"
			CardTime.update(CardTime.findOne()._id, {$set:{activated:false}})
			return
		}
		
	},

	'click #envoyerINSTRUCTIONS' : function(){
		pushInstr();
		document.getElementById("instructionsInput").focus()
	}

});