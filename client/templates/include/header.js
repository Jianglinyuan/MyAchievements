Template.header.helpers({
    username: function(){
        var user = Meteor.user();
        var username = user && user.profile && user.profile.name;
        return username;
    },
    isStudent: function(){
        var user = Meteor.user();
        var userroot = user && user.profile && user.profile.root;
        if (userroot === 'student'){
            return true;
        }else{
            return false;
        }
    },
    userNumber: function(){
        return Meteor.user().username;
    }
});
Template.header.onRendered(function(){
    $( document ).ready(function(){
        $(".dropdown-button").dropdown({
            constrain_width:false,
            belowOrigin:true,
            alignment: 'left',
            hover: true
        });
    });
});
Template.header.events({
    'click .logout': function(e){
        e.preventDefault();
        Meteor.logout();
        Router.go('index');
    }
});
