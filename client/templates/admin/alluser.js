Template.allUser.helpers({
    admins: function(){
        return Meteor.users.find({'profile.root':'admin'});
    },
    teachers: function(){
        return Meteor.users.find({'profile.root':'teacher'});
    },
    TAs: function(){
        return Meteor.users.find({'profile.root':'assistan'});
    },
    students: function(){
        return Meteor.users.find({'profile.root':'student'});
    }
});
