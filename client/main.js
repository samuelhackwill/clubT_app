import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import '/imports/methods';
import './main.html';
import jsCookie from 'js-Cookie';

var moment = require('moment');
// wtf quand tu import la fonction du session.set fonctionne
// mais pas le moment.locale(), qui marche seulement avec require

Template.content.onCreated(function helloOnCreated() {
	console.log("language is ", moment.locale())
	moment.locale('fr')
	console.log("NOW language is ", moment.locale())
});

Template.content.helpers({
	line:function(){
		return Blahblah.find({});
	}
});

Template.form.helpers({
	when:function(){
		return Session.get("time");
	},

	randomUsr:function(){
		min = Math.ceil(1);
		max = Math.floor(999);
		randomId = Math.floor(Math.random() * (max - min)) + min
		return ("Individu n°"+randomId)
	}
})

Template.form.events({
	'keyup #mainTxtInput' : function(e){
	    e = e || window.event
		if (e.keyCode == '13') pushTxt();
	},

	'click #eraseAll' : function(){

        var pwd = prompt('Eh oh dis donc c\'est quoi le mot de passe', 'hein');
        if (pwd != "Xeshobservatoiretour42" ) {
        	// alors ça tu vois faudrait le passer en --setting au deployement a travers un JSON et tout
            alert("désolé mais c'est pas ça");
        }else{
		Meteor.call('eraseAll')
		alert("BIM")
		}
	}

});

pushTxt = function(){
	var message = document.getElementById("mainTxtInput").value
	var who = document.getElementById("authorInput").value
	if(message=="") message="..."

	Meteor.call('newMessage',{message, who}, function(error, result){
		if(error){
			alert(error.reason);
		}else{
			console.log("message bien inséré dans la db, ", result)
		}
	})
	// message = ""
	// mmh relou cette histoire de truc que j'ai pas compris là
	document.getElementById("mainTxtInput").value = ""
}

// ci-dessous gros écouteur d'evenements DDP
  var _send = Meteor.connection._send;
  Meteor.connection._send = function (obj) {
    // console.log("send", obj);
    // console.log("envoie du brol stp")
    _send.call(this, obj);
  };

  // log received messages
  Meteor.connection._stream.on('message', function (message) { 
    // console.log("receive", JSON.parse(message).msg); 
    if(JSON.parse(message).msg=="added"){
	    console.log("scrolle le bordel STP")
	    setTimeout(function(){
			var objDiv = document.getElementById("content");
			objDiv.scrollTop = objDiv.scrollHeight;	
	    }, 25)
  		}
	});

Meteor.setInterval(function() {
    Session.set("time", moment().format('LTS'))
}, 1000); //Every sec