Template.header.helpers({
    user: function(){
        var user = Meteor.user();
        var attribute = {};
        var userRoot = user && user.profile && user.profile.root;
        attribute.name = user && user.profile && user.profile.name;
        if ( userRoot === "admin" ){
            attribute.root = "管理员";
        }else if ( userRoot === "teacher" ){
            attribute.root = "教师";
        }else if ( userRoot === "assistant" ){
            attribute.root = "助教";
        }else {
            attribute.root = user && user.username;
        };
        attribute.group = user && user.profile.group;
        return attribute;
    }
});

Template.header.events({
    'click .logout': function(e){
        e.preventDefault();
        Meteor.logout();
        Router.go('index');
    }
});
