Template.header.helpers({
    username: function(){
        var user = Meteor.user();
        var username = user && user.profile && user.profile.name;
        return username;
    }
});
Template.header.onRendered(function(){
    $( document ).ready(function(){
        $(".dropdown-button").dropdown({
            constrain_width:false,
            belowOrigin:true,
            alignment: 'left'
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
