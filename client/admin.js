import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import '/imports/methods';
import './main.html';
import jsCookie from 'js-Cookie';
import moment from 'moment/min/moment-with-locales.min.js';


// var query = TheDiscussion.find();
// query.observeChanges({
// 	added:function(){
// 		setTimeout(function(){
// 		Meteor.call("scrollDiv")

// 	},20)
// 	}
// })


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

});


Template.vueAdmin.onRendered(function yo(){
	document.body.style.opacity=1

	// là faut trouver un meilleur hook, probablement un onbefore action avec iron router
	document.getElementById("mainTxtInput").focus();

	console.log("onrendered fired")

});

Template.vueAdmin.helpers({
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

	'click .tas' : function(e){
		console.log(e.target.innerHTML)

		if (e.target.innerHTML[2]=="R") {
			// lol
			// c'est le "r" de "tarot"
			CardTime.update(CardTime.findOne()._id, {$set:{activated:"tarot"+e.target.innerHTML[5]}})
			return
		}else{
		// 0T 1A 2S 3_ tu vois le délire? faites moi un procès
		CardTime.update(CardTime.findOne()._id, {$set:{activated:"tas"+e.target.innerHTML[3]}})
		}
	},

	'click #envoyerINSTRUCTIONS' : function(){
		pushInstr();
		document.getElementById("instructionsInput").focus()
	}

});