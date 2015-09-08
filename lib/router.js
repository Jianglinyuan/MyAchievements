Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/login',{
    name: 'login'
});
Router.route('/register',{
    name: 'register',
    waitOn: function(){
        return [Meteor.subscribe('tmp'),Meteor.subscribe('images')];
    }
});
Router.route('/findPassword',{
    name: 'findPassword',
});
Router.route('/changePassword',{
    name: 'changePassword',
});


Router.route('/',{
    name: 'index',
    waitOn: function(){
        return [Meteor.subscribe("achievements"), Meteor.subscribe("homeworks")];
    }
});
Router.route('/newhomework',{
    name:'newhomework',
    waitOn: function(){
        return Meteor.subscribe('homeworks');
    }
});
Router.route('/soucefile/:_id',{
    name: 'sourcefile',
    data: function(){
        return Homeworks.findOne({_id: this.params._id});
    },
});
Router.route('/review/:_id',{
    name: 'review',
    data: function(){
        return Homeworks.findOne({_id: this.params._id});
    },
    waitOn: function(){
        return [Meteor.subscribe('singlehomework',this.params._id),Meteor.subscribe('subhomeworks')];
    }
});


var requireLogin = function() {
  if (! Meteor.user()) {
      Router.go('login');
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'index'});
