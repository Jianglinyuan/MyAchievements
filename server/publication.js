Meteor.publish("userData",function(){
    return Meteor.users.find();
});
Meteor.publish("homeworks",function(){
    return Homeworks.find();
});
Meteor.publish("singleHomeworks",function(id){
    return Homeworks.find(id);
});
Meteor.publish("homeworkfiles",function(){
    return Homeworkfiles.find();
});
Meteor.publish('thisHomeworkfiles',function(homeworkId){
    return Homeworkfiles.find({'metadata.homeworkId': homeworkId});
});
Meteor.publish("myhomeworkfiles",function(){
    return Homeworkfiles.find({'metadata.userId': this.userId});
});
Meteor.publish("reviews", function() {
    return Review.find();
});
Meteor.publish("relationship",function(id){
    return Relationship.find({homeworkId:id});
});
