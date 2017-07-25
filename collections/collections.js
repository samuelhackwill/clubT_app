import { SimpleSchema } from 'meteor/aldeed:simple-schema';

Blahblah = new Meteor.Collection('Blahblah');

var Schemas = {};

Schemas.Blahblah = new SimpleSchema({

	"content" : {
		type : String,
		label : "content",
		max : 200,
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

Blahblah.attachSchema(Schemas.Blahblah);

SimpleSchema.messages({
	// for custom error messages
  maxString: "L'année dernière, grégoire et jacob ont pourri le site en copiant/collant des articles sur le général de gaulle issus de wikipedia. Cette année, la taille maximum d'un post est limitée.",
	})
