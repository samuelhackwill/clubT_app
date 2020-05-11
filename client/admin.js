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

Template.vueAdmin.onCreated(function helloOnCreated() {
	moment.locale('fr')
	// shuffle(allAudio);
	Meteor.subscribe("TheDiscussion", {
		onReady: function () { 
			// console.log("onReady And the Items actually Arrive", arguments); 
			// showError("BIENVENUE : ",'ici c\'est un forum, hum bon alors c\'est peut être un peu redondant avec toutes les technologies qui existent aujourd\'hui, genre facebook 💩 et autres, m\'enfin ici ce qui est cool c\'est que si vous tapez \"play\" ben ça va jouer un son de quelqu\'un qui parle de concours d\'entrée en écoles d\'art. Quand vous en avez marre vous pouvez aussi taper \"silencio\" et le son va s\'arrêter. Voilà à plus tard! faites ce que vous voulez de cette espace, peut être avec jean-claude on s\'en servira aussi pour mettre des rappels de planning \& des comptes-rendus de ce qui va se passer ces jours.',"")
	},
		onError: function () { console.log("onError", arguments); }
	});

			Meteor.subscribe("CardTime", {
	});
			Meteor.subscribe("TheInstructions", {
	});

});


Template.vueAdmin.onRendered(function yo(){
	// là faut trouver un meilleur hook, probablement un onbefore action avec iron router
	document.getElementById("mainTxtInput").focus();

console.log("onrendered fired")

});

Template.vueAdmin.helpers({
	test:function(){
		return Session.get("localId")
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

	'click #envoyer' : function(){
			pushTxt();
		document.getElementById("mainTxtInput").focus()
	},	

	'click .tas' : function(e){
		// console.log(e.target.innerHTML[3])
		// 0T 1A 2S 3_ tu vois le délire? faites moi un procès
		CardTime.update(CardTime.findOne()._id, {$set:{activated:"tas"+e.target.innerHTML[3]}})
	},

	'click #envoyerINSTRUCTIONS' : function(){
			pushInstr();
		document.getElementById("instructionsInput").focus()
	}

});