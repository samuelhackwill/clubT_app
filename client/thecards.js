import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import '/imports/methods';
import './thecards.html';

Template.thecards.onCreated(function() {

  //subscribe à la collection contenus écran
    Meteor.subscribe('allTheCards');
});

Template.thecards.onRendered(function(){
	document.body.style.opacity=1
})

Template.thecards.helpers({
	listCards : function(){
		return TheCards.find({},{sort: {deck:1,index:1}});
	},

	editing: function(){
		return Session.equals('editItemId', this._id);
	},
	quickRemoveButtonOnError: function () {
		return function (error) { alert("card NOT deleted ", error); console.log(error); };
	},
	quickRemoveButtonOnSuccess: function () {
		return function (result) { alert("card succefuly deleted!"); console.log(result); };
	},
	quickRemoveButtonBeforeRemove: function () {
		return function (collection, id) {
		  var doc = collection.findOne(id);
		  if (confirm('Really delete card "' + doc.text + '"?')) {
		    this.remove();
		  }
		};
	}
});

Template.thecards.events({
    'click #addCard': function(event) {
      console.log('add Card!');
      event.preventDefault();
      var cardDeck = $('#TheCardDeck').val();
      var cardText = $('#TheCardText').val();
      var cardLogo = $('#TheCardLogo').val();
      var cardIndex = $('#TheCardIndex').val();
      if(cardDeck!=""&&cardText!=""&&cardIndex!=""&&cardLogo!=""){
        // var contenuData = $('#json-result').val();
        var args = {
          deck: cardDeck,
          text: cardText,
          logo: cardLogo,
          index: cardIndex,
        };
        console.log('Card : ', args);
        Meteor.call('newCard', args);
      } else {
        alert("il y a un champ non renseigné.");
      }
    },


    // 'click .deleteItem': function(){
    //   Items.remove(this._id);
    // },
    'click .editItem': function(){
      Session.set('editItemId', this._id);
    },
    'click .cancelItem': function(){
      Session.set('editItemId', null);
    },
    'click .saveItem': function(){
      saveItem();
    },
    'keypress input': function(e){
      if(e.keyCode === 13){
        saveItem();
      }
      else if(e.keyCode === 27){
        Session.set('editItemId', null);
      }
    }
})


var saveItem = function(){
  var editItem = {
    deck: $("#editItemDeck").val(),
    text: $("#editItemText").val(),
    logo: $("#editItemLogo").val(),
    index: $("#editItemIndex").val(),
  }
  var args = {
    _id: Session.get('editItemId'),
    obj: editItem
  }
  Meteor.call('editCard', args);
  // Items.update(Session.get('editItemId'), {$set: editItem});
  Session.set('editItemId', null);
}
