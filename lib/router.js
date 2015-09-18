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
Router.configure({
    loadingTemplate:'loading'
});

Router.route('/',{

    action: function(){
        if (this.ready()){
            if (!Meteor.user()){
                Router.go('login');
            }else{
                loginDefault();
            }
        }
    } 

});
Router.route('/login',{

    name:'login',

});
Router.route('/changepassword',{
    
    name:'changePassword',
    layoutTemplate:'layout'

});
Router.route('/findpassword',{
    
    name:'findPassword',

});
Router.route('/admin',{

    name: 'admin',
    layoutTemplate: 'layout',
    waitOn: function(){
        return Meteor.subscribe("userData");
    },
    onBeforeAction: function(){
        if (Meteor.user().profile.root !== 'admin'){
            this.render('accessDeny');
        }else{
            this.next();
        }
    }

});
Router.route('/teacher',{

    name: 'teachersHomeworkList',
    layoutTemplate: 'layout',
    waitOn: function(){
        return [Meteor.subscribe("homeworklist"),Meteor.subscribe("userData")];
    },
    onBeforeAction: function(){
        if (Meteor.user().profile.root === 'teacher' || Meteor.user().profile.root === 'assistan'){
            this.next();
        }else{
            this.render('accessDeny');
        }
    }

});
Router.route('/student',{

    name: 'student',
    layoutTemplate: 'layout',
    waitOn: function(){
        return [Meteor.subscribe("homeworks"),Meteor.subscribe("homeworklist"),Meteor.subscribe("homeworkfiles")];
    },
    onBeforeAction: function(){
        if (Meteor.user().profile.root !== 'student'){
            this.render('accessDeny');
        }else{
            this.next();
        }
    }

});
Router.route('/student/review/:_id',{

    name: 'studentReview',
    layoutTemplate: 'layout',
    data: function(){
        return Homeworks.findOne({_id:this.params._id});
    },
    waitOn: function(){
        return [Meteor.subscribe("homeworks"),Meteor.subscribe("homeworklist")]
    },
    onBeforeAction: function(){
        if (Meteor.user().profile.root !== 'student'){
            this.render('accessDeny');
        }else{
            this.next();
        }
    }

});

