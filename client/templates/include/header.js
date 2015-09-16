Template.header.helpers({
    username: function(){
        return Meteor.user().username;
    },
    name: function(){
        return Meteor.user().profile.name;
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
    }
});
