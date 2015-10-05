Template.teacher.helpers({
    isTeacher: function(){
        var user = Meteor.user();
        if ( user.profile.root === "teacher" ) return true;
        else return false;
    }
});
