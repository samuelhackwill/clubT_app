Router.onBeforeAction(function () {
	console.log("ONBEFORE ACTIONNNNNN")
	document.body.style.opacity=0
	this.next()
});

Router.route('/', function () {
  this.wait(Meteor.subscribe('ViewSwitcher'));
  console.log("landing page")

  if (this.ready()) {

  	console.log("routing ",ViewSwitcher.find({"activated":true}).fetch()[0])

    if (ViewSwitcher.find({"activated":true}).fetch()[0].name==="show") {
	this.render("vueParticipant")
	}
    if (ViewSwitcher.find({"activated":true}).fetch()[0].name==="aftershow") {
	this.render("aftershow")
	}
    if (ViewSwitcher.find({"activated":true}).fetch()[0].name==="waiting") {
	this.render("waiting")
	}
  } else {
  	console.log("loading")
  }
});

Router.route('/show', function () {
  this.wait(Meteor.subscribe('allTheCards'), Meteor.subscribe('CardTime'), Meteor.subscribe('TheDiscussion'));
  if (this.ready()) {
    this.render('vueParticipant')
  }
});

Router.route('/cards', function () {
   this.render('thecards')
});

Router.route('/compose', function () {
   this.render('chosenBits')
});

Router.route('/waiting', function () {
   this.render('waiting')
});

Router.route('/aftershow', function () {
   this.render('aftershow')
});

Router.route('/v2', function () {
   this.render('vueParticipantV2')
});

Router.route('/admin/:_name', function () {
  this.render('vueAdmin', {
  	data:function(){
  		Session.set("localId", this.params._name)
  	}
  });
});