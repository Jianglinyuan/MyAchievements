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
        return [Meteor.subscribe("homeworks")];
    }
});
Router.route('/newhomework',{
    name :'newhomework',
    waitOn : function(){
        return Meteor.subscribe('HomeworkList');
    }
});

Router.route('/allHomeWork',{
    name : 'allHomeWork',
    waitOn : function(){
        return Meteor.subscribe('HomeworkList');
    },
    data : function(){
        return {count : HomeworkList.find().count()};
    }
});
Router.route('/allHomeWork/:_id/edit',{
    name : 'homeWorkEdit',
    waitOn : function(){
        return Meteor.subscribe('singlehomeworklist',this.params._id);
    },
    data : function(){
        return HomeworkList.findOne(this.params._id);
    },
});


