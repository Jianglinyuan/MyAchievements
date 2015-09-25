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
            Router.go('teachersHomeworkList');
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
        return [Meteor.subscribe("homeworks"),Meteor.subscribe("userData")];
    },
    onBeforeAction: function(){
        if (Meteor.user().profile.root === 'teacher' || Meteor.user().profile.root === 'assistant'){
            this.next();
        }else{
            this.render('accessDeny');
        }
    }

});
Router.route('/reviewlist/:_id',{
    
    name: 'reviewList',
    layoutTemplate: 'layout',
    data: function(){
        //return Homeworks.findOne(this.params._id);
        return {id: this.params._id};
    },
    waitOn: function(){
        return [Meteor.subscribe('userData'), Meteor.subscribe('homeworkfiles'),Meteor.subscribe('singleHomeworks',this.params._id), Meteor.subscribe('thisReview',this.params._id)];
    }
});

Router.route('/reviewlist/:homeworkId/:userId',{

    name: 'reviewDetail',
    layoutTemplate: 'layout',
    data: function(){
        return {
            homeworkId: this.params.homeworkId,
            userId: this.params.userId
        }; 
    },
    waitOn: function(){
        return [Meteor.subscribe('thisReview',this.params.homeworkId), Meteor.subscribe('singleHomeworks',this.params.homeworkId), Meteor.subscribe("userData")];
    }

});

Router.route('/homework/edit/:_id',{

    name: 'homeworkedit',
    layoutTemplate: 'layout',
    waitOn: function(){
        return Meteor.subscribe('homeworks',this.params._id);
    },
    data: function(){
        return Homeworks.findOne(this.params._id);
    }

});
Router.route('/student',{

    name: 'student',
    layoutTemplate: 'layout',
    waitOn: function(){
        var userId = Meteor.userId();
        return [Meteor.subscribe("homeworks"),Meteor.subscribe("userData"),Meteor.subscribe("homeworkfiles")];
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
        var homeworkId = this.params._id;
        return [Meteor.subscribe("homeworks"),Meteor.subscribe("userData"),Meteor.subscribe("homeworkfiles"), Meteor.subscribe("thisReview",this.params._id),Meteor.subscribe("relationship",this.params._id)]
    },
    onBeforeAction: function(){
        if (Meteor.user().profile.root !== 'student'){
            this.render('accessDeny');
        }else{
            this.next();
        }
    }

});
