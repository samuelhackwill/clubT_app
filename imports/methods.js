import { Meteor } from 'meteor/meteor';

Meteor.methods({

	newMessage : function(obj){
		Blahblah.insert({content:obj.message, author:obj.who, timestamp:new Date()})
		return(obj)
	},

	eraseAll : function(){
		Blahblah.remove({})
	},

	scrollDiv : function(){
		if (Meteor.isClient) {
			console.log("le client ET le serveur sucent")
			var objDiv = document.getElementById("content");
			objDiv.scrollTop = objDiv.scrollHeight;	
		}
	}

})
