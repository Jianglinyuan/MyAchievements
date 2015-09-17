Meteor.publish("userData",function(){
    return Meteor.users.find();
});
Meteor.publish("homeworklist",function(){
    return HomeworkList.find();
});
Meteor.publish("homeworks",function(){
    return Homeworks.find();
});
Meteor.publish("homeworkfiles",function(){
    return Homeworkfiles.find();
});
