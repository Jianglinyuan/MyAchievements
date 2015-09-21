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
        }else if(Meteor.user().profile.root === 'teacher' || Meteor.user().profile.root === 'assistant'){
            Router.go('teacher');
        }else if(Meteor.user().profile.root === 'student'){
            Router.go('student');
        }
    }else{
        this.next();
    }

};

Router.onBeforeAction(requireLogin,{except: 'login'});
Router.onBeforeAction(loginDefault,{only: 'index'});

Router.configure({
    loadingTemplate:'loading'
});

Router.route('/',{
    name: 'index',
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
    waitOn: function(){
        return Meteor.subscribe("userData");
    }

});

Router.route('/changepassword',{
    
    name:'changePassword',
    layoutTemplate:'layout'

});

Router.route('/admin',{

    name: 'admin',
    layoutTemplate: 'layout',
    waitOn: function(){
        return Meteor.subscribe("userData");
    },
    onBeforeAction: function(){
        if (Meteor.user().profile.root === 'admin'){
            this.next();
        }else{

            this.render('accessDeny');
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
        if (Meteor.user().profile.root === 'teacher' || Meteor.user().profile.root === 'assistant'){
            this.next();
        }else{
            this.render('accessDeny');
        }
    }

});

Router.route('/teacher/review/:_id',{
    name:'teacherReview',
    layoutTemplate: 'layout',
    data: function(){
        return HomeworkList.findOne(this.params._id);
    },
    waitOn: function(){
        return [Meteor.subscribe('thisHomeworkfiles',this.params._id),Meteor.subscribe('singleHomeworklist',this.params._id)];
    }
});
Router.route('/homework/edit/:_id',{
    name: 'homeworkedit',
    layoutTemplate: 'layout',
    waitOn: function(){
        return Meteor.subscribe('singleHomeworklist',this.params._id);
    },
    data: function(){
        return HomeworkList.findOne(this.params._id);
    }
});
Router.route('/student',{

    name: 'student',
    layoutTemplate: 'layout',
    waitOn: function(){
        var userId = Meteor.userId();
        return [Meteor.subscribe("myhomeworks"),Meteor.subscribe("homeworklist"),Meteor.subscribe("userData"),Meteor.subscribe("homeworkfiles")];
    },
    onBeforeAction: function(){
        if (Meteor.user().profile.root === 'student'){
            this.next();
        }else{
            this.render('accessDeny');
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
        var userId = Meteor.userId();
        var group = Meteor.user().profile.group;
        var homeworkId = this.params._id;
        return [Meteor.subscribe("myhomeworks"),Meteor.subscribe("homeworklist"),Meteor.subscribe("userData"),Meteor.subscribe("Homeworkfiles",group,homeworkId), Meteor.subscribe("reviews")]
    },
    onBeforeAction: function(){
        if (Meteor.user().profile.root !== 'student'){
            this.render('accessDeny');
        }else{
            this.next();
        }
    }

});
