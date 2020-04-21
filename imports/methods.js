import { Meteor } from 'meteor/meteor';

Meteor.methods({

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

	addIds : function(){
		for(i=0;i<3000;i++){
			TheIds.insert({theid:i})
		}
	},

	eraseAll : function(){
		TheDiscussion.remove({})
		CardTime.remove({})
		TheIds.remove({})
	},

	scrollDiv : function(){
		if (Meteor.isClient) {
			//console.log("le client ET le serveur sucent")
			var objDiv = document.getElementById("content");
			objDiv.scrollTop = objDiv.scrollHeight;	
		}
	}

})

