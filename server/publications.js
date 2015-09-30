Meteor.publish("userData", function(){
    return Meteor.users.find();
});
Meteor.publish("homeworks", function(){
    return Homeworks.find();
});
