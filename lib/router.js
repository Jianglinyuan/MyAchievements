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


