import { Meteor } from 'meteor/meteor';
import '/imports/methods';

if (Meteor.isServer) {
  
  Meteor.publish('TheDiscussion', function tasksPublication() {

    return TheDiscussion.find();

  });

  Meteor.publish('TheInstructions', function tasksPublication() {

    return TheInstructions.find();

  });

  Meteor.publish('TheIds', function tasksPublication() {

    return TheIds.find();

  });

  Meteor.publish('CardTime', function tasksPublication() {

    return CardTime.find();

  });

}

Meteor.methods({
    scrollDivServer : function(){
      console.log("fuck")
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