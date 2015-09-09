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


