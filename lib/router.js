Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.route('/login',{
    name: 'login'
});
Router.route('/register',{
    name: 'register',
});
Router.route('/findPassword',{
    name: 'findPassword',
});
Router.route('/changePassword',{
    name: 'changePassword',
});
Router.route('/userProfile',{
    name: 'userProfile',
});


Router.route('/',{
    name: 'index',
    waitOn: function(){
        return [Meteor.subscribe("homeworks"),Meteor.subscribe('HomeworkList')];
    }
});
Router.route('/newhomework',{
    name :'newhomework',
    waitOn : function(){
        return [Meteor.subscribe('HomeworkList'), Meteor.subscribe('userdata')];
    }
});

Router.route('/allhomework',{
    name : 'allhomework',
    waitOn : function(){
        return Meteor.subscribe('HomeworkList');
    },
});
Router.route('/allhomework/:_id/edit',{
    name : 'homeworkedit',
    waitOn : function(){
        return Meteor.subscribe('singlehomeworklist',this.params._id);
    },
    data : function(){
        return HomeworkList.findOne(this.params._id);
    },
});

var requireLogin = function() {
  if (! Meteor.user()) {
      Router.go('login');
  } else {
    this.next();
  }
}
var login = function() {
  if (Meteor.user()) {
    if(Meteor.user().profile.root === "admin")
      Router.go('register');
    else
      Router.go('index');
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin,{except: 'login'});
Router.onBeforeAction(login,{only: 'login'});
