Meteor.publish("userData",function(){
    return Meteor.users.find();
});
Meteor.publish("homeworklist",function(){
    return HomeworkList.find();
});
Meteor.publish("singleHomeworklist",function(id){
    return HomeworkList.find(id)
});
Meteor.publish("homeworks",function(){
    return Homeworks.find();
});
Meteor.publish("homeworkfiles",function(){
    return Homeworkfiles.find();
});
Meteor.publish("myhomeworks",function(userId){
    return Homeworks.find({userId: this.userId});
});
Meteor.publish("myhomeworkfiles",function(){
    return Homeworkfiles.find({'metadata.userId': this.userId});
});
Meteor.publish("myGroupUserData",function(){
    var user = Meteor.users.findOne(this.userId);
    return Meteor.users.find({'profile.group': user.profile.group});
});
Meteor.publish("myGroupHomeworkfiles",function(group){
    return Homeworkfiles.find({'metadata.team': group});
});
Meteor.publish("Homeworkfiles",function(group,homeworkId){
    var homeworklistId = Homeworks.findOne(homeworkId).homeworklistId;
    return Homeworkfiles.find({'metadata.team': group, 'metadata.homeworklistId': homeworklistId});

})
