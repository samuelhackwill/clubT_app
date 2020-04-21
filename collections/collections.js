import { SimpleSchema } from 'meteor/aldeed:simple-schema';

TheDiscussion = new Meteor.Collection('TheDiscussion');
TheIds = new Meteor.Collection("TheIds")
CardTime = new Meteor.Collection("CardTime")

var Schemas = {};

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

Schemas.TheIds = new SimpleSchema({

	"theid" : {
		type : Number,
		label : "theid",
		optional : false
	}

});


TheDiscussion.attachSchema(Schemas.TheDiscussion);
TheIds.attachSchema(Schemas.TheIds);
