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

  if(TheIds.findOne()===undefined){
    console.log("TheIds IS EMPTY, INSERTING NOW")
    for (var i = 999 - 1; i >= 0; i--) {
        TheIds.insert({"theid":i})
      }
  }

  if(TheInstructions.findOne()===undefined){
    console.log("TheInstructions is empty")
    TheInstructions.insert({"author":"Test", "content":"Test", "timestamp":new Date()})
  }

  if(GlobalVars.findOne()===undefined){
    console.log("GlobalVars is empty")
    GlobalVars.insert({"name":"RDV", "value":"15",})
  }

  if(CardTime.findOne()===undefined){
    console.log("CardTime is empty")
    TheInstructions.insert({"activated":"Test"})
  }


});

if (Meteor.isServer) {
  
  Meteor.publish('allTheCards', function() {
    return TheCards.find();
  });

  Meteor.publish('TheDiscussion', function() {
    return TheDiscussion.find();
  });

  Meteor.publish('ViewSwitcher', function() {
    return ViewSwitcher.find();
  });

  Meteor.publish('TheIds', function() {
   return TheIds.find();
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
    scrollDivServer : function(){
      Meteor.call('scrollDiv')
    },

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

TheIds.allow({
  insert:function(){
    return true
  },
  remove:function(){
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