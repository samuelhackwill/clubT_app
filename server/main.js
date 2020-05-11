import { Meteor } from 'meteor/meteor';
import '/imports/methods';

if (Meteor.isServer) {
  
  Meteor.publish('TheDiscussion', function() {

    return TheDiscussion.find();

  });

  Meteor.publish('TheIds', function() {
   return TheIds.find();

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
    }
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