Router.route('/login',{

    name:'login',
    waitOn: function(){
        return Meteor.subscribe("userData");
    }

});
Router.route('/admin',{

    name: 'admin',
    layoutTemplate: 'layout',
    waitOn: function(){
        return Meteor.subscribe("userData");
    }

});
var requireLogin = function(){

    if (! Meteor.user()){
        Router.go('login');
    }else{
        this.next();
    }

};
var loginDefault = function(){

    if (Meteor.user()){
        if (Meteor.user().profile.root === 'admin'){
            Router.go('admin');
        }else if(Meteor.user().profile.root === 'teacher' || Meteor.user().profile.root === 'assistan'){
            Router.go('teacher');
        }else if(Meteor.user().profile.root === 'student'){
            Router.go('student');
        }
    }else{
        this.next();
    }

};
Router.onBeforeAction(requireLogin,{except: 'login'});
Router.onBeforeAction(loginDefault,{only: 'login'});
