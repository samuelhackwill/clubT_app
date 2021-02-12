import { Meteor } from 'meteor/meteor';
import '/imports/methods';

Meteor.startup(function(){
  // fixtures
  if(ViewSwitcher.findOne()===undefined){
    console.log("VIEWSWITCHER IS EMPTY, INSERTING NOW")
    ViewSwitcher.insert({"name":"waiting", "activated":true})
    ViewSwitcher.insert({"name":"show", "activated":false})
    ViewSwitcher.insert({"name":"aftershow", "activated":false})
  }

  if(TheInstructions.findOne()===undefined){
    console.log("TheInstructions is empty")
    TheInstructions.insert({"author":"Test", "content":"Test", "timestamp":new Date()})
  }

  // just reboot everything when you deploy
  // GlobalVars.remove({})
  // console.log("reloading GlobalVars")
  // GlobalVars.insert({"name":"RDV", "value":"Vendredi 15/01/21 à 12H30.",})
  
  // heure de rdv
  GlobalVars.insert({"name":"phase", "value":1,})
  // affichage des commentaires de tous (2) ou de personne (1)
  GlobalVars.insert({"name":"clickable", "value":false,})
  // déclenche le cliquage-sur-les-phrases
  GlobalVars.insert({"name":"end", "value":1,})
  // déclenche le scroll final

  if(CardTime.findOne()===undefined){
    console.log("CardTime is empty")
    CardTime.insert({"activated":"none"})
  }


});

if (Meteor.isServer) {

  Meteor.publish("TheChosenBits", function(){
    return TheChosenBits.find();
  });
  
  Meteor.publish("TheArchive", function(){
    return TheArchive.find();
  });
  
  Meteor.publish("TheSongs", function(){
    return TheSongs.find();
  });
  
  Meteor.publish('allTheCards', function() {
    return TheCards.find();
  });

  Meteor.publish('TheDiscussion', function() {
    return TheDiscussion.find();
  });

  Meteor.publish('ViewSwitcher', function() {
    return ViewSwitcher.find();
  });

  Meteor.publish('GlobalVars', function() {
   return GlobalVars.find();
  });

  Meteor.publish('TheInstructions', function() {
    return TheInstructions.find();
  });

  Meteor.publish('CardTime', function() {
    return CardTime.find();
  });

}

Meteor.methods({
    removeAll : function(){
      TheDiscussion.remove({})
    },

    newCard: function (obj) {
      TheCards.insert(obj);
    },

    editCard: function (args) {
      console.log("args.obj ", args.obj)
      TheCards.update(args._id, { $set: args.obj });
    },
})

TheDiscussion.allow({
  insert:function(){
    return true
  },
    remove:function(){
    return true
  }
})

TheInstructions.allow({
  insert:function(){
    return true
  },
    remove:function(){
    return true
  }
})

CardTime.allow({
  insert:function(){
    return true
  },
  remove:function(){
    return true
  },
  update:function(){
    return true
  }
})

ViewSwitcher.allow({
  insert:function(){
    return true
  },
  remove:function(){
    return true
  },
  update:function(){
    return true
  }
})

GlobalVars.allow({
  insert:function(){
    return true
  },
  remove:function(){
    return true
  },
  update:function(){
    return true
  }
})