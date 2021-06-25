import { Meteor } from 'meteor/meteor';

Meteor.methods({

	deleteFromChosenBits : function(){
		TheChosenBits.remove({})
		TheSongs.remove({})
	},

	changeCardTime : function(obj){
		console.log("CHANGE CARD TIME !", obj)	

			who = CardTime.findOne
			CardTime.update(who._id, {$set:{activated:obj}})
	},

	newMessage : function(obj){
		//console.log("merci de loger tout ça ", obj.message, obj.who)
		// if (obj.message=="eraseAll\n" || obj.message=="eraseAll" && obj.who=="ADMIN") {
		// 	// donc la dans l'idéal je vais chercher ce string dans --meteor-settings
		// 	TheDiscussion.remove({})
		// }else{
			console.log("inserting the shit out of the db", obj)
			TheDiscussion.insert({content:obj.message, author:obj.who, timestamp:new Date()})
			return(obj)
		// }
	},	

	newInstruction : function(obj){
		//console.log("merci de loger tout ça ", obj.message, obj.who)
		// if (obj.message=="eraseAll\n" || obj.message=="eraseAll" && obj.who=="ADMIN") {
		// 	// donc la dans l'idéal je vais chercher ce string dans --meteor-settings
		// 	TheDiscussion.remove({})
		// }else{

			TheInstructions.update(TheInstructions.find({}).fetch()[0]._id, {$set:{"author":obj._author, "content":obj.message}})

			console.log("new instruction, ", obj.message)
			return(obj)
		// }
	},

	eraseAll : function(){
		TheDiscussion.remove({})
		CardTime.remove({})
	},

	scrollDiv : function(){
		if (Meteor.isClient) {
			var objDiv = document.getElementById("chat") || document.getElementById("content");
			// this is probably pretty vicious
			// i'm using the same chat component
			// in the radio website and in petit milieu.
			// so the scrollDiv event scrolls both at the same time
			// (the two divs containers rendering the component
			// are called "chat" and "content".)
			objDiv.scrollTop = objDiv.scrollHeight;	
		}
	}
})

