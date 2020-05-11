import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import '/imports/methods';
import './main.html';
import jsCookie from 'js-Cookie';
import moment from 'moment/min/moment-with-locales.min.js';

tas1count = 1
tas2count = 1
tas3count = 1
tas4count = 1
tas5count = 1

currentDurLong = 0
currentDurShort = ''

pointsdevie = 0


var jauge = 0
var maxjauge = 1200
var temps = 1500
var banThisBastard = false
var clearJauge
var startBan

var query = TheDiscussion.find();
query.observeChanges({
	added:function(){
		setTimeout(function(){
		Meteor.call("scrollDiv")

	},20)
	}
})

var queryy = CardTime.find();
queryy.observeChanges({
	changed(id,fields){
		setTimeout(function(){
		console.log("HEY ITS CARD TIME bruh!")
		console.log(id, fields.activated)

		if(fields.activated=="tarot1"){
			pointsdevie++
			document.getElementById("tas").style.display="none"
			document.getElementById("tas1PLAYD").style.display="none"
			document.getElementById("tas2PLAYD").style.display="none"
			document.getElementById("tas3PLAYD").style.display="none"
			document.getElementById("tas4PLAYD").style.display="none"
			document.getElementById("tas5PLAYD").style.display="none"
			document.getElementById("tarot").style.display="block"

		}
		if(fields.activated=="tarot2"){
			pointsdevie++
		}
		if(fields.activated=="tarot3"){
			pointsdevie++
		}

	},20)
	}
})

// lastauthor = ""

allAudio = ["01", "02", "03", "04"]


Template.registerHelper('formatedDate', function(timestamp) {
  return moment(timestamp).format('dddd [à] LT');
});

Template.content.onCreated(function helloOnCreated() {
	moment.locale('fr')
	// shuffle(allAudio);
	Meteor.subscribe("TheDiscussion", {
		onReady: function () { 
			// console.log("onReady And the Items actually Arrive", arguments); 
			// showError("BIENVENUE : ",'ici c\'est un forum, hum bon alors c\'est peut être un peu redondant avec toutes les technologies qui existent aujourd\'hui, genre facebook 💩 et autres, m\'enfin ici ce qui est cool c\'est que si vous tapez \"play\" ben ça va jouer un son de quelqu\'un qui parle de concours d\'entrée en écoles d\'art. Quand vous en avez marre vous pouvez aussi taper \"silencio\" et le son va s\'arrêter. Voilà à plus tard! faites ce que vous voulez de cette espace, peut être avec jean-claude on s\'en servira aussi pour mettre des rappels de planning \& des comptes-rendus de ce qui va se passer ces jours.',"")
	},
		onError: function () { console.log("onError", arguments); }
	});	

	Meteor.subscribe("TheInstructions", {
		onReady: function () { 
			// console.log("onReady And the Items actually Arrive", arguments); 
			// showError("BIENVENUE : ",'ici c\'est un forum, hum bon alors c\'est peut être un peu redondant avec toutes les technologies qui existent aujourd\'hui, genre facebook 💩 et autres, m\'enfin ici ce qui est cool c\'est que si vous tapez \"play\" ben ça va jouer un son de quelqu\'un qui parle de concours d\'entrée en écoles d\'art. Quand vous en avez marre vous pouvez aussi taper \"silencio\" et le son va s\'arrêter. Voilà à plus tard! faites ce que vous voulez de cette espace, peut être avec jean-claude on s\'en servira aussi pour mettre des rappels de planning \& des comptes-rendus de ce qui va se passer ces jours.',"")
	},
		onError: function () { console.log("onError", arguments); }
	});


	Meteor.subscribe("TheIds", {
		onReady: function () { 
			// console.log("onReady And the Items actually Arrive", arguments); 
			// showError("BIENVENUE : ",'ici c\'est un forum, hum bon alors c\'est peut être un peu redondant avec toutes les technologies qui existent aujourd\'hui, genre facebook 💩 et autres, m\'enfin ici ce qui est cool c\'est que si vous tapez \"play\" ben ça va jouer un son de quelqu\'un qui parle de concours d\'entrée en écoles d\'art. Quand vous en avez marre vous pouvez aussi taper \"silencio\" et le son va s\'arrêter. Voilà à plus tard! faites ce que vous voulez de cette espace, peut être avec jean-claude on s\'en servira aussi pour mettre des rappels de planning \& des comptes-rendus de ce qui va se passer ces jours.',"")
		
	// attribution d'un ID unique
	// bon on part du principe que personne va trifouiller la variable de session

			Session.set("localId",TheIds.findOne().theid)
			TheIds.remove({_id:TheIds.findOne()._id})
 

	},
		onError: function () { console.log("onError", arguments); }
	});
		Meteor.subscribe("CardTime", {
	})
});

Template.content.onRendered(function yo(){
	// là faut trouver un meilleur hook, probablement un onbefore action avec iron router
	document.getElementById("mainTxtInput").focus();

console.log("onrendered fired")

	aud = document.getElementById("audioFile");
	aud.src = allAudio[0]+"math.mp3"
	aud.load()
	allAudio.splice(0,1)

	aud.onended = function() {
		
		if(allAudio[0]){
			aud.src = allAudio[0]+"math.mp3"
			aud.load()
			allAudio.splice(0,1)
		}else{
			showError("HÉ BEN BRAVO : ", "VOUS AVEZ ÉCOUTÉ TOUS LES EXTRAITS AUDIO, BELLE PATIENCE.", "")
			aud.src = ""
			aud.load()
		}
	}; 

	aud.onpause = function() {

		if(allAudio[0]){
			aud.src = allAudio[0]+"math.mp3"
			aud.load()
			allAudio.splice(0,1)
		}else{
			showError("HÉ BEN BRAVO : ", "VOUS AVEZ ÉCOUTÉ TOUS LES EXTRAITS AUDIO, BELLE PATIENCE.", "")
			aud.src = ""
			aud.load()
		}
	}; 
})

Template.instructions.helpers({
	instruction:function(){
		return "Mathilde : "+TheInstructions.find({}).fetch()[0].content
	}
})

Template.content.helpers({
	line:function(){
		// console.log("new line fetched")
		// montre moi les posts de MOI MEME, ou un des admins.
		return TheDiscussion.find({author: {$in:[Session.get("localId").toString() , 'Mathilde', 'Samuel', 'Thomas']}});
	},

	checkAdmin:function(){


		var objDiv = document.getElementById("content");
		objDiv.scrollTop = objDiv.scrollHeight;				


		console.log("checking")

		if(this.author==="Mathilde"||this.author==="Thomas"||this.author==="Samuel"){
			return true
		}else{
			return false
			}
	}

	// sameaslast:function(){
	// 	console.log("LAST AUTHOR ", lastauthor)
	// 	console.log("AUTHORS ",this.author)
	// 	// if(!this.author){lastauthor=Session.get("localId")}

	// 	if(this.author === lastauthor){
	// 		console.log("thisauthors AUTHOR IS SAME AS LAST ONE, don't show")
	// 		lastauthor = this.author
	// 		return false
	// 	}else{
	// 		console.log("thisauthors AUTHOR IS DIFFERENT! show name.")	
	// 		lastauthor = this.author
	// 		return true
	// 	}

	// }
});

Template.form.helpers({
	when:function(){
		return Session.get("time");
	}
})

Template.vueParticipant.events({
	'click .tarotc' : function(e){

		if (pointsdevie!==0) {
		console.log("click carte de tarot", e.currentTarget.id)

		whichcardtime = CardTime.findOne().activated
		multiplier = whichcardtime.substring(5)

		number = e.currentTarget.id
		numberClean = number.substring(1)

		document.getElementById(e.currentTarget.id).style.display="none"

		document.getElementById("x"+numberClean).style.transform="Translate("+(multiplier*300-300)+"px ,550px)"
		
		pointsdevie--
		}else{
			return
}
	},

	'click .tas' : function(e){
		console.log(e.currentTarget)

		switch(e.currentTarget.id){
			case "tas1" :
			
			if(CardTime.findOne().activated=="tas1"){
				if(tas1count <document.getElementById("tas1PLAYD").childElementCount){
					document.getElementById("card1."+tas1count).style.display="initial"
				}else{
					document.getElementById("card1."+tas1count).style.display="initial"
					document.getElementById("tas1").style.display="none"
				}
				tas1count ++
			}

			break;
			case "tas2" :
			
			if(CardTime.findOne().activated=="tas2"){
				if(tas2count<document.getElementById("tas2PLAYD").childElementCount){
					document.getElementById("card2."+tas2count).style.display="initial"
				}else{
					document.getElementById("card2."+tas2count).style.display="initial"
					document.getElementById("tas2").style.display="none"
				}
				tas2count ++
			}

			break;
			case "tas3" :
			
			if(CardTime.findOne().activated=="tas3"){
				if(tas3count <document.getElementById("tas3PLAYD").childElementCount){
					document.getElementById("card3."+tas3count).style.display="initial"
				}else{
					document.getElementById("card3."+tas3count).style.display="initial"
					document.getElementById("tas3").style.display="none"
				}
				tas3count ++
			}

			break;
			case "tas4" :
			
			if(CardTime.findOne().activated=="tas4"){
				if(tas4count <document.getElementById("tas4PLAYD").childElementCount){
					document.getElementById("card4."+tas4count).style.display="initial"
				}else{
					document.getElementById("card4."+tas4count).style.display="initial"
					document.getElementById("tas4").style.display="none"
				}
				tas4count ++
			}

			break;
			case "tas5" :
			
			if(CardTime.findOne().activated=="tas5"){
				if(tas5count <document.getElementById("tas5PLAYD").childElementCount){
					document.getElementById("card5."+tas5count).style.display="initial"
				}else{
					document.getElementById("card5."+tas5count).style.display="initial"
					document.getElementById("tas5").style.display="none"
				}
				tas5count ++
			}

			break;




		}
	}
})

Template.form.events({

	'keypress #mainTxtInput' : function(e){
	    e = e || window.event
		if (e.keyCode == '13'){
			if(!banThisBastard && jauge<maxjauge){	
				pushTxt();
				return false
			}else{
				clearTimeout(clearJauge)
				clearTimeout(startBan)
				startBan = setTimeout(function(){
					banThisBastard != banThisBastard
					jauge = 0
					// console.log("unban this bastard")
					document.getElementById("mainTxtInput").value="vous avez été débloqué! merci de ne pas spammer."
				},15000)
				banThisBastard != banThisBastard
				showError("ERREUR : ", "Vous avez déclenché le filtre anti-spam, on va attendre 15 secondes si vous le voulez bien.", "")
			}
		}
	},

	'click #envoyer' : function(){
		if(!banThisBastard && jauge<maxjauge){	
			pushTxt();
		}else{
			clearTimeout(clearJauge)
			clearTimeout(startBan)
			startBan = setTimeout(function(){
				banThisBastard != banThisBastard
				jauge = 0
				// console.log("unban this bastard")
					document.getElementById("mainTxtInput").value="vous avez été débloqué! merci de ne pas spammer."
			},5000)
			banThisBastard != banThisBastard
				showError("ERREUR : ", "Vous avez déclenché le filtre anti-spam, on va attendre 15 secondes si vous le voulez bien.", "")
		}
		document.getElementById("mainTxtInput").focus()
	}

	// 'click #eraseAll' : function(){

 //        var pwd = prompt('Eh oh dis donc c\'est quoi le mot de passe', 'hein');
 //        if (pwd != "YannFabèsEnSlip" ) {
 //        	// alors ça tu vois faudrait le passer en --setting au deployement a travers un JSON et tout
 //            alert("désolé mais c'est pas ça");
 //        }else{
	// 	Meteor.call('eraseAll')
	// 	alert("BIM")
	// 	}
	// }

});

showError = function(type, error, message){
	var node = document.createElement("DIV");
	node.id = "message"
	var textnode = document.createTextNode(type+error);
	node.appendChild(textnode);

	total = document.getElementById('content')
	total.insertBefore(node, total.childNodes[total.childNodes.length-2])

	total.scrollTop = total.scrollHeight;

	document.getElementById("mainTxtInput").value = message
};

pushTxt = function(){
	var untrimmedmsg = document.getElementById("mainTxtInput").value
	var who = Session.get("localId")

	message = untrimmedmsg.trim()

	console.log("MESSAGE "+ message)

	if(message=="\n" || message==""){
		document.getElementById("mainTxtInput").value=""
		return false
		// message="..."
		// jauge = jauge + 450
	}

	if(message=="play" || message=="PLAY" || message=="Play" || message=="play\n" || message=="play\s"){
		if(allAudio[0]){
			// get duration
			currentDurLong = aud.duration
			currentDurShort = currentDurLong.toString()[0]+currentDurLong.toString()[1];
			
			showError("DIFFUSION EN COURS : ", "CET EXTRAIT DURE "+currentDurShort+" SECONDES.", "")
			// là ça serait bien de display le time
			document.getElementById("audioFile").play()
			document.getElementById("mainTxtInput").focus()
		}else{
			showError("HÉ BEN BRAVO : ", "VOUS AVEZ ÉCOUTÉ TOUS LES EXTRAITS AUDIO, BELLE PATIENCE.", "")
		}
		return
	}	

	if(message=="silencio" || message=="silencio\n" || message=="silencio\s"){
		if(allAudio[0]){
			showError("DIFFUSION STOPPÉE : ", "IL RESTE ENCORE "+allAudio.length+" EXTRAITS PAS ÉCOUTÉS LORS DE CETTE SESSION.", "")
			document.getElementById("audioFile").pause()
			document.getElementById("mainTxtInput").focus()
		}else{
			showError("HÉ BEN BRAVO : ", "VOUS AVEZ ÉCOUTÉ TOUS LES EXTRAITS AUDIO, BELLE PATIENCE.", "")
		}
		return
	}

	// hm on pourrait faire un truc moins teubé avec une regex du genre (^\s{0,})(.)

	
	// if(message==">LOL<\n"){
	// 	showError("EMOJIS : ", "☀☁☂☃☄★☆☇☈☉☊☋☌☍☎☏☐☑☒☓☔☕☖☗☘☙☚☛☜☝☞☟☠☡☢☣☤☥☦☧☨☩☪☫☬☭☮☯☰☱☲☳☴☵☶☷☸☹☺☻☼☽☾☿♀♁♂♃♄♅♆♇♈♉♊♋♌♍♎♏♐♑♒♓♔♕♖♗♘♙♚♛♜♝♞♟♠♡♢♣♤♥♦♧♨♩♪♫♬♭♮♯♰♱♲♳♴♵♶♷♸♹♺♻♼♽♾♿⚀⚁⚂⚃⚄⚅⚆⚇⚈⚉⚊⚋⚌⚍⚎⚏⚐⚑⚒⚓⚔⚕⚖⚗⚘⚙⚚⚛⚜⚠⚡⚢⚣⚤⚥⚦⚧⚨⚩⚪", "")
	// }else{


		Meteor.call('newMessage',{message, who}, function(error, result){
			if(error){
				showError("ERREUR : ",error.reason, message)
			}else{
				console.log("message bien inséré dans la db, ", result)
				if(localId!="Mathilde"||"Thomas"||"Samuel"){
				jauge = jauge + message.length
				}	
				clearTimeout(clearJauge)
				clearJauge = setTimeout(function(){
					jauge=0
					console.log("jauge was at : ", jauge)
					console.log("clear jauge now")
				},5000)
			}
		})
	// }
	// message = ""
	// mmh relou cette histoire de truc que j'ai pas compris là
	document.getElementById("mainTxtInput").value=""
}


// // ci-dessous gros écouteur d'evenements DDP
//   var _send = Meteor.connection._send;
//   Meteor.connection._send = function (obj) {
//     _send.call(this, obj);
//   };

//   // log received messages
//   Meteor.connection._stream.on('message', function (message) { 
//     // console.log("receive", JSON.parse(message).msg); 
//     if(JSON.parse(message).msg=="added"){
// 	    //console.log("scrolle le bordel STP")
// 	    setTimeout(function(){
// 			var objDiv = document.getElementById("content");
// 			objDiv.scrollTop = objDiv.scrollHeight;	
// 	    }, 25)
//   		}
// 	});

Meteor.setInterval(function() {
    Session.set("time", moment().format('dddd [à] LT'))
}, 1000);

// shuffle = function(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {

//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }

// const SwiftClient = require('openstack-swift-client');
// const authenticator = new SwiftClient.SwiftAuthenticator('https://storage.gra3.cloud.ovh.net/v1/AUTH_8da090546fb745ad886dc4cb9842c3ef/XeshOneContainer', 'QS6zTpTkYykH', 'MZ3M7DTq7DWXxWXDPajf9xUtMmtrwShg');
// let client = new SwiftClient(authenticator);
// let ovhContainer = client.container('XeshOneContainer');
// console.log("CONTAINERINERIRNEIRNIN", ovhContainer)

// ovhContainer.get('ds.mp3', process.stdout).then(() => {
//     console.log("Done!");
// });