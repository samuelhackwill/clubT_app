import { SimpleSchema } from 'meteor/aldeed:simple-schema';

TheCards = new Meteor.Collection('TheCards');
TheSongs = new Meteor.Collection('TheSongs');
TheChosenBits = new Meteor.Collection('TheChosenBits');

TheDiscussion = new Meteor.Collection('TheDiscussion');
TheInstructions = new Meteor.Collection('TheInstructions');
TheIds = new Meteor.Collection("TheIds")

CardTime = new Meteor.Collection("CardTime")
ViewSwitcher = new Meteor.Collection("ViewSwitcher")
GlobalVars = new Meteor.Collection("GlobalVars")

var Schemas = {};

Schemas.TheCards = new SimpleSchema({
	"text":{
		type:String
		// max : 800
		// max text for a card ?
	},

	"logo":{
		type:String,
	},

	"tas":{
		type:Number,
		optional:false
	},

	"index":{
		type:Number,
		optional:false
	},
})

Schemas.TheSongs = new SimpleSchema({
	"title":{
		type:String
	},

	"text":{
		type:String
	}
})

Schemas.TheChosenBits = new SimpleSchema({
	"text":{
		type:String
	}
})

Schemas.GlobalVars = new SimpleSchema({
	"name":{
		type:String
	},
	"value":{
		type:String
	}
})

Schemas.ViewSwitcher = new SimpleSchema({
	"name": {
		type : String
	},
	"activated":{
		type : Boolean
	}
});

Schemas.CardTime = new SimpleSchema({

	"activated" : {
		type : String
	}

});

Schemas.TheDiscussion = new SimpleSchema({

	"content" : {
		type : String,
		label : "content",
		max : 800,
		optional : true
	},
	"author" : {
		type : String,
		label : "author",
		max : 50
	},
	"timestamp": {
	  type: Date,
	  label: "timestamp",
	  autoValue: function() {
	    if ( this.isInsert ) {
	      return new Date;
	    } 
	  }
	}

});
Schemas.TheInstructions = new SimpleSchema({

	"content" : {
		type : String,
		label : "content",
		optional : true
	}

});

Schemas.TheIds = new SimpleSchema({

	"theid" : {
		type : Number,
		label : "theid",
		optional : false
	}

});

TheCards.attachSchema(Schemas.TheCards);
TheSongs.attachSchema(Schemas.TheSongs);
TheChosenBits.attachSchema(Schemas.TheChosenBits);
TheDiscussion.attachSchema(Schemas.TheDiscussion);
TheInstructions.attachSchema(Schemas.TheInstructions);
TheIds.attachSchema(Schemas.TheIds);
ViewSwitcher.attachSchema(Schemas.ViewSwitcher);
GlobalVars.attachSchema(Schemas.GlobalVars);
