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
        }else if ( Meteor.user().profile.root === "teacher" || Meteor.user().profile.root === "assistant" ){
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

Router.configure({
    waitOn: function(){
        return Meteor.subscribe("userData");
    }
});

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
    name: "login"
});

Router.route('/admin', {
    layoutTemplate: "layout",
    name: "admin",
    waitOn: function(){
        return [
            Meteor.subscribe("homeworkfiles")
        ];
    }
});

Router.route('/teacher', {
    layoutTemplate: "layout",
    name: "teacher",
    waitOn: function(){
        return [
            Meteor.subscribe("homeworks")
        ];
    }
});

Router.route('/editHomework/:_id', {
    layoutTemplate: "layout",
    name: "editHomework",
    data: function(){
        return Homeworks.findOne(this.params._id);
    },
    waitOn: function(){
        return Meteor.subscribe("singleHomework", this.params._id);
    }
});

Router.route('/teacherReviewList/:_id',{
    name: "teacherReviewList",
    layoutTemplate: "layout",
    data: function(){
        return Homeworks.findOne(this.params._id);
    },
    waitOn: function(){
        return [
            Meteor.subscribe("singleHomework", this.params._id),
            Meteor.subscribe("singleHomeworkFiles", this.params._id),
            Meteor.subscribe("thisHwReviews",this.params._id)
        ];
    }
});

Router.route('/teacherReviewDetail/:homeworkId/:studentId', {

    name: "teacherReviewDetail",
    layoutTemplate: "layout",
    data: function(){
        var homework = Homeworks.findOne(this.params.homeworkId);
        var user = Meteor.users.findOne(this.params.studentId);
        return [user,homework];
    },
    waitOn: function(){
        return [
            Meteor.subscribe("singleHomework", this.params.homeworkId),
            Meteor.subscribe("myReviews", this.params.homeworkId, this.params.studentId)
        ];
    }
});

Router.route('/student', {
    layoutTemplate: "layout",
    name: "student",
    waitOn: function(){
        return [
            Meteor.subscribe("homeworks"),
            Meteor.subscribe("myHomeworkFile"),
            Meteor.subscribe("reviews"),
        ];
    }
});

Router.route('/studentReview/:_id',{
    name: "studentReview",
    layoutTemplate: "layout",
    data: function(){
        return Homeworks.findOne(this.params._id);
    },
    waitOn: function(){
        return [
            Meteor.subscribe("homeworks"),
            Meteor.subscribe("hwHomeworkFiles",this.params._id),
            Meteor.subscribe("hwRelationship",this.params._id),
            Meteor.subscribe("hwReviews",this.params._id)
        ];
    }
});
Router.route('/changePassword',{
    name: "changePassword",
    layoutTemplate: "layout",
});
