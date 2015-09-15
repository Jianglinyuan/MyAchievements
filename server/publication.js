Meteor.publish("userData",function(){
    return Meteor.users.find();
});
Meteor.publish("homeworklist",function(){
    return HomeworkList.find();
});
