import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import '/imports/methods';
import './chosenBits.html';

Template.chosenBits.onCreated(function() {
	console.log("chosenBits")
    Meteor.subscribe('TheChosenBits');
    Meteor.subscribe('TheSongs');
    Meteor.subscribe('TheArchive');
})

Template.chosenBits.onRendered(function(){
	document.body.style.opacity="1"
})

Template.chosenBits.helpers({
	chosenBits:function(){
		return TheChosenBits.find({})
	},

	TheSongs:function(){
		return TheSongs.find({}, {sort:{timestamp:-1}})
	}
})

Template.chosenBits.events({

	"click #archive" : function(){

		_now = new Date()

		for (var i = TheChosenBits.find({}).fetch().length - 1; i >= 0; i--){
			obj = TheChosenBits.find({}).fetch()[i]
			obj.timestamp = _now
			TheArchive.insert({obj})
			TheChosenBits.remove({_id:obj._id})
		}

	},

	"click #delete" : function(){
		Meteor.call("deleteFromChosenBits")
	},

	"click #sendPoesie" : function(){

		// get the lines
		now = new Date()
		nowD = now.getDate()
		nowM = now.getMonth()
		nowY = now.getFullYear()

		_date = nowD+"/"+nowM+"/"+nowY

		_title = document.getElementById("composeTitle").value
		document.getElementById("composeTitle").value = ""
		linesArray = []
		for (var i = 0; i < document.getElementsByClassName("composeLine").length-1; i++) {
			linesArray.push(document.getElementsByClassName("composeLine")[i].value)
			document.getElementsByClassName("composeLine")[i].value=""
		}

		// sanitize unwanted empty lines at the end
		for (var i = linesArray.length - 1; i >= 0; i--) {
			if (linesArray[i]=="") {
				linesArray.pop()
			}else{
		//push to DB
				console.log(" here is what i'm going to push ", linesArray)
				TheSongs.insert({title:_title, text:linesArray, date:_date, timestamp:now})

				return
			}

		}


	}

})