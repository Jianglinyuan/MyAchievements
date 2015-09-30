Meteor.users.allow({
    remove: function(){
        var userRoot = Meteor.user() && Meteor.user().profile && Meteor.user().profile.root;
        if ( userRoot === "admin" )
            return true;
        else return false;
    }
});
