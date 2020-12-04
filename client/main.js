import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import '/imports/methods';
import './main.html';
// import jsCookie from 'js-Cookie';
import moment from 'moment/min/moment-with-locales.min.js';
import { Random } from 'meteor/random'

allTarotImgs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

cardsAlreadyPlayed = 0
cardIndex = 1
deckcount = 1
infiniteCardZIndex = 1

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

var gVQuery = GlobalVars.find();
gVQuery.observe({
	changed:function(newDocument){
		console.log("observe change", newDocument.name)

		if(newDocument.name=="clickable"){
			console.log("add class to everybody là")
			allDivs = document.getElementsByClassName(Session.get("localId"))

			for (var i = allDivs.length - 1; i >= 0; i--) {
				allDivs[i].classList.add("clickable")
			}
		}

		if(newDocument.name=="end"&&newDocument.value=="2"){
			// 1 s pour 100 pixels
			pixels = document.getElementById("starWars").clientHeight
			animationSeconds = pixels/100

			document.getElementById("starWars").style.transition = "transform "+ animationSeconds.toFixed() +"s linear, opacity 2s"
			document.getElementById("starWars").style.transform = "translateY(-100%)"
		}

		if(newDocument.name=="end"&&newDocument.value=="1"){
			pixels = document.getElementById("starWars").clientHeight
			animationSeconds = pixels*10

			document.getElementById("starWars").style.opacity = "0"

			setTimeout(function(){
				console.log("starWars ready for next animation")
				document.getElementById("starWars").style.transform = "translateY(0px)"
			},2000)

			setTimeout(function(){
				document.getElementById("starWars").style.opacity = "1"
			},animationSeconds.toFixed())
		}

	}
})

var qqquery = TheInstructions.find();
qqquery.observe({
	changed:function(newDocument){

		document.getElementById("conseillere").style.backgroundImage = "url('/mugshots/"+newDocument.author+".png')";
		// la tête qui demeure.
		document.getElementById("conseillereA").className = "";
		document.getElementById("conseillereA").classList.add(newDocument.author+"A");
		// pour l'animation.

		document.getElementById("conseillere").style.opacity="0"
		document.getElementById("conseillereA").style.opacity="1"


		setTimeout(function(){
			document.getElementById("conseillere").style.opacity="1"
			document.getElementById("conseillereA").style.opacity="0"
			console.log("FU")
		},2000)
		}
})

var queryy = CardTime.find();
queryy.observeChanges({
	changed(id,fields){
		if (Router.current().route.getName()=="admin.:_name") {
			return
		}else{
			setTimeout(function(){
			console.log("HEY ITS CARD TIME bruh!")
			console.log(id, fields.activated)

			if(fields.activated==false){
				//"hidE all tas"
				document.getElementById("tas").style.display="none"
				document.getElementById("tasdeTarot").style.display="none"
			}

			// attentionnnn BUG pour les tas plus grand que 9 parce qu'il y a deux 
			// chiffres mdr

			if(fields.activated=="tas1"||fields.activated=="tas2"||fields.activated=="tas3"||fields.activated=="tas4"||fields.activated=="tas5"||fields.activated=="tas6"||fields.activated=="tas7"||fields.activated=="tas8"||fields.activated=="tas9"||fields.activated=="tas10"||fields.activated=="tas11"||fields.activated=="tas12"||fields.activated=="tas13"){
				//show tas
				document.getElementById("tas").style.display="flex"
			}

			cardsAlreadyPlayed = 0
			cardIndex = 1
			// hum si on change le deck pendant que quelqu'un était 
			// en train de jouer il faut remettre à zéro son compte de cards already
			// played.

			if(fields.activated=="tarot1"){
				pointsdevie++
				document.getElementById("tas").style.display="none"
				document.getElementById("cartes").style.display="none"

				allTarot = document.getElementsByClassName("cartedeTarot")

				for (var i = allTarot.length - 1; i >= 0; i--) {
					allTarot[i].style.display="block"
				}

				document.getElementById("tasdeTarot").style.display="block"

			}
			if(fields.activated=="tarot2"){
				document.getElementById("tasdeTarot").style.opacity="1"
				pointsdevie++
			}
			if(fields.activated=="tarot3"){
				document.getElementById("tasdeTarot").style.opacity="1"
				pointsdevie++
			}

		},20)
		}
	}
})

// lastauthor = ""

allAudio = ["01"]


Template.registerHelper('formatedDate', function(timestamp) {
  return moment(timestamp).format('dddd [à] LT');
});

Template.content.onCreated(function() {
	moment.locale('fr')
	// shuffle(allAudio);
	Meteor.subscribe("TheDiscussion");	
	Meteor.subscribe("GlobalVars");	
	Meteor.subscribe("TheSongs");	
	Meteor.subscribe("TheChosenBits");	
    Meteor.subscribe('allTheCards');
	Meteor.subscribe("TheInstructions");	
	Meteor.subscribe("CardTime", {})

	Session.set("localId",Random.id())
});


Template.vueParticipant.onRendered(function(){
 document.body.style.opacity=1

 setTimeout(function(){
 	console.log("MOVING CARDS & checking cartime")
 	allthecards = document.getElementsByClassName("card")
 	for(i=0; i<allthecards.length; i++){
 		allthecards[i].style="transform:translate("+(Math.floor(Math.random() * 400) + 100)+"px, "+(Math.floor(Math.random() * 200) + 1)+"px) rotate("+Math.ceil(Math.random() * 7) * (Math.round(Math.random()) ? 1 : -1)+"deg);"
 	}
 	
 	if (CardTime.findOne().activated==false) {
 		return
 	}else{
 		document.getElementById("tas").style.display="flex"
 	}

	// prend ton sweet time pour ranger les cartes mon frèr

 },8000)

});

Template.loading.onRendered(function(){
 document.body.style.opacity=1
});

Template.waiting.onCreated(function(){
	Meteor.subscribe("ViewSwitcher", {})
	Meteor.subscribe("GlobalVars", {})
});

Template.waiting.onRendered(function(){
 document.body.style.opacity=1
});

Template.aftershow.onRendered(function(){
 document.body.style.opacity=1
});

Template.content.onRendered(function yo(){
	// là faut trouver un meilleur hook, probablement un onbefore action avec iron router
	document.getElementById("mainTxtInput").focus();

console.log("onrendered fired")

	aud = document.getElementById("audioFile");
	aud.src = allAudio[0]+"math.mp3"
	aud.load()

	aud.onended = function() {
		allAudio.splice(0,1)
		
		if(allAudio[0]){
			aud.src = allAudio[0]+"math.mp3"
			aud.load()
		}else{
			// showError("HÉ BEN BRAVO : ", "VOUS AVEZ ÉCOUTÉ TOUS LES EXTRAITS AUDIO, BELLE PATIENCE.", "")
			aud.src = ""
			aud.load()
		}
	}; 

	// aud.onpause = function() {

	// 	if(allAudio[0]){
	// 		aud.src = allAudio[0]+"math.mp3"
	// 		aud.load()
	// 		allAudio.splice(0,1)
	// 	}else{
	// 		// showError("HÉ BEN BRAVO : ", "VOUS AVEZ ÉCOUTÉ TOUS LES EXTRAITS AUDIO, BELLE PATIENCE.", "")
	// 		aud.src = ""
	// 		aud.load()
	// 	}
	// }; 
})

Template.waiting.helpers({
	listCards : function(){
		return TheCards.find({});
	},

	RDV:function(){
		if (GlobalVars.findOne({"name":"RDV"})===undefined || GlobalVars.findOne({"name":"RDV"}).value=="0") {
			return
		}else{
			return "La prochaine séance débutera ici le "+GlobalVars.findOne({"name":"RDV"}).value
		}

	}
});

Template.instructions.helpers({
	instruction:function(){
		if (TheInstructions.find({}).fetch()[0]==undefined) {
			return ""
		}else{
			return TheInstructions.find({}).fetch()[0].author+" : "+TheInstructions.find({}).fetch()[0].content	
		}
	}
})

Template.content.helpers({
	line:function(){
		if (TheDiscussion.find({}).fetch()[0]==undefined) {
			return ""
		}else{
			// either author: {$in:[Session.get("localId").toString() , 'Mathilde', 'Samuel', 'Nicole']}
			// either ({})
			if(GlobalVars.findOne({"name":"phase"}).value=="2"){ 
				return TheDiscussion.find({});
			}else{
				return TheDiscussion.find({"author" : {$in:[Session.get("localId").toString() , 'Mathilde', 'Samuel', 'Nicole']}});
			}
		}
	},

	checkAdmin:function(){


		var objDiv = document.getElementById("content");
		objDiv.scrollTop = objDiv.scrollHeight;				

		if(this.author==Session.get("localId").toString()){
			return "vous :"
		}else{
			return "quelqu'un.e :"
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

Template.vueParticipant.helpers({
	getSongs : function(){
		now = new Date()
		nowD = now.getDate()
		nowM = now.getMonth()
		nowY = now.getFullYear()

		_date = nowD+"/"+nowM+"/"+nowY

		return TheSongs.find({date:_date})

	},

	currentDeckLogo : function(){

		if(CardTime.findOne().activated){
			deckcount = parseInt(CardTime.findOne().activated.substring(3))
			return TheCards.findOne({deck:deckcount}).logo
		}else{
			return
		}
	},

	listCards : function(){
		return TheCards.find({},{sort: {deck:1, index:1}});
	},

});

Template.vueParticipant.events({
	'click .clickable' : function(e){
		e.currentTarget.classList.add("clicked")
		TheChosenBits.insert({text:e.currentTarget.innerHTML})

		allDivs = document.getElementsByClassName(Session.get("localId"))

			for (var i = allDivs.length - 1; i >= 0; i--) {
				allDivs[i].classList.remove("clickable")
			}

	},

	'click .cartedeTarot' : function(e){

		if (pointsdevie!==0) {
		console.log("click carte de tarot", e.currentTarget.id)

		whichRound=CardTime.find({}).fetch()[0].activated.substring(5)

		shuffle(allTarotImgs)
		randomValue = allTarotImgs.pop()

		console.log(whichRound)

		document.getElementById("tpc"+whichRound).style.opacity="1"
		document.getElementById("tpc"+whichRound).style.backgroundImage = "url('/tarot/"+randomValue+".jpg')"; 


		document.getElementById("tasdeTarot").style.opacity="0"
		document.getElementById(e.currentTarget.id).style.display="none"
		
		pointsdevie--
		}else{
			return
}
	},

	'click .tasDeCartes' : function(){
		// cardsAlreadyPlayed : il revient à 0 à la fin de chaque tas.
		// cardIndex : revient à 1 à la fin de chaque tas.
		// deckcount : est modifié par l'admin (collection CardTime).
		deckcount = parseInt(CardTime.findOne().activated.substring(3))
		// 1, 2, 3, 4, E

		console.log("click on tas de cartes, fetching deck ", deckcount, ", card ", cardIndex, " and ", cardsAlreadyPlayed, " already played.")
			
			if(cardsAlreadyPlayed < TheCards.find({"deck":deckcount}).fetch().length-1){
				cardsAlreadyPlayed ++
			}else{
				document.getElementById("tas").style.display="none"
			}

			document.getElementById("card"+deckcount+"."+cardIndex).style.display="flex"
			document.getElementById("card"+deckcount+"."+cardIndex).style.zIndex=infiniteCardZIndex
			cardIndex ++
			infiniteCardZIndex ++
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
			currentDurSec = aud.duration.toFixed(0)
			
			showError("DIFFUSION EN COURS : ", "CET EXTRAIT DURE "+currentDurSec+" SECONDES.", "")
			// showError("DIFFUSION EN COURS : ","")
			document.getElementById("audioFile").play()
			document.getElementById("mainTxtInput").focus()
		}else{
			// showError("HÉ BEN BRAVO : ", "VOUS AVEZ ÉCOUTÉ TOUS LES EXTRAITS AUDIO, BELLE PATIENCE.", "")
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
				if(who!="Mathilde"||"Nicole"||"Samuel"){
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


pushInstr = function(){
	var untrimmedmsg = document.getElementById("instructionsInput").value

	_author = Session.get("localId")
	message = untrimmedmsg.trim()

	console.log("MESSAGE "+ message)

	// if(message=="\n" || message==""){
	// 	document.getElementById("instructionsInput").value=""
	// 	return false
	// 	// message="..."
	// 	// jauge = jauge + 450
	// }


		Meteor.call('newInstruction',{_author, message})
	// }
	// message = ""
	// mmh relou cette histoire de truc que j'ai pas compris là
	document.getElementById("instructionsInput").value=""
}


shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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