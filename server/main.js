import { Meteor } from 'meteor/meteor';
import '/imports/methods';

Meteor.methods({
    scrollDivServer : function(){
      console.log("le serveur suce tout seul")
      Meteor.call('scrollDiv')
    }
})

Blahblah.deny({
  insert: function (){
	  throw new Meteor.Error(403, "Access denied")
	  return true
  },

  update: function(){
 	  throw new Meteor.Error(403, "Access denied")
	  return true
  },

  remove:function(){
  	// là faudrait lire le cookie ou la variable locale qui stipule le nom d'usager
  	// mais argh c'est craignos tu vois parce que c'est du code visible sur le client ça
  	// du coup tout le monde peut voir le nom d'usager qui va bien
  	// peut être le mieux c'est de garder ce string sur le serveur et l'appeller depuis ici

  //   if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['admin'])) {
  //     throw new Meteor.Error(403, "Access denied")
  //   }
  //   return true; 
  // },
	  throw new Meteor.Error(403, "Access denied")
	  return true
  }
});
