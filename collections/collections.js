import { SimpleSchema } from 'meteor/aldeed:simple-schema';

TheCards = new Meteor.Collection('TheCards');
TheSongs = new Meteor.Collection('TheSongs');
TheChosenBits = new Meteor.Collection('TheChosenBits');
TheArchive = new Meteor.Collection('TheArchive');

TheDiscussion = new Meteor.Collection('TheDiscussion');
TheInstructions = new Meteor.Collection('TheInstructions');

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

	"deck":{
		type:Number,
		optional:false
	},

	"index":{
		type:Number,
		optional:false
	},
})

Schemas.TheSongs = new SimpleSchema({
	"timestamp":{
		type:Date
	},
	
	"title":{
		type:String
	},

	"text":{
		type:[String],
		trim:false
	},

	"date":{
		type:String
	}

})

Schemas.TheChosenBits = new SimpleSchema({
	"text":{
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

	"author" : {
	type : String,
	label : "author",
	},

	"content" : {
		type : String,
		label : "content",
		optional : true
	}

});

TheCards.attachSchema(Schemas.TheCards);
TheSongs.attachSchema(Schemas.TheSongs);
TheChosenBits.attachSchema(Schemas.TheChosenBits);
TheDiscussion.attachSchema(Schemas.TheDiscussion);
TheInstructions.attachSchema(Schemas.TheInstructions);
ViewSwitcher.attachSchema(Schemas.ViewSwitcher);


TheCards.allow({
  insert: function (){
    return true; 
  },
  update: function () { 
    return true; 
  },
  remove: function () {
    return true; 
  }
})


TheChosenBits.allow({
  insert: function (){
    return true; 
  },
  update: function () { 
    return true; 
  },
  remove: function () {
    return true; 
  }
})


TheArchive.allow({
  insert: function (){
    return true; 
  },
  update: function () { 
    return true; 
  },
  remove: function () {
    return true; 
  }
})

TheSongs.allow({
  insert: function (){
    return true; 
  },
  update: function () { 
    return true; 
  },
  remove: function () {
    return true; 
  }
})
