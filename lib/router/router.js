var requireLogin = function(){
    if ( !Meteor.user() ){
        Router.go("login");
    }else{
        this.next();
    }
};

var loginDefault = function(){
    if ( Meteor.user() ){
        if ( Meteor.user().profile.root === "admin" ){
            Router.go("admin");
        }else if ( Meteor.user().profile.root === "teacher" ){
            Router.go("teacher");
        }else if ( Meteor.user().profile.root === "student" ){
            Router.go("student");
        }
    }else{
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {except: 'login'});
Router.onBeforeAction(loginDefault, {only: 'index'});

Router.route('/', {
    name: "index",
    action: function(){
        if (this.ready()){
            if ( !Meteor.user() ){
                Router.go("login");
            }else{
                loginDefault();
            }
        }
    }
});

Router.route('/login', {
    name: "login",
    waitOn: function(){
        return Meteor.subscribe("userData");
    }
});

Router.route('/admin', {
    layoutTemplate: "layout",
    name: "admin",
    waitOn: function(){
        return [Meteor.subscribe("userData") , Meteor.subscribe("homeworkfiles")];
    }
});

Router.route('/teacher', {
    layoutTemplate: "layout",
    name: "teacher",
    waitOn: function(){
        return [Meteor.subscribe("userData"), Meteor.subscribe("homeworks")];
    }
});

Router.route('/student', {
    layoutTemplate: "layout",
    name: "student",
    waitOn: function(){
        return [Meteor.subscribe("userData"), Meteor.subscribe("homeworks"), Meteor.subscribe("myHomeworkFile")];
    }
});

Router.route('/studentReview/:_id',{
    name: "studentReview",
    layoutTemplate: "layout",
    data: function(){
        return Homeworks.findOne(this.params._id);
    },
    waitOn: function(){
        return [Meteor.subscribe("userData"),Meteor.subscribe("homeworkfiles"), Meteor.subscribe("relationship"), Meteor.subscribe("homeworks"), Meteor.subscribe("reviews")];
    }
});

