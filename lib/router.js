Router.route('/', function () {
  
   this.render('waiting')

  // le jour J!
  // this.render('vueParticipant');
});

Router.route('/spy', function () {
  
   this.render('vueParticipant')
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