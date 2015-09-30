Meteor.publish("userData", function(){
    return Meteor.users.find();
});
Meteor.publish("homeworks", function(){
    return Homeworks.find();
});
Meteor.publish("homeworkfiles", function(){
    return HomeworkFiles.find();
});
Meteor.publish("relationship", function(){
    return Relationship.find();
});
Meteor.publish("myHomeworkFile", function(){
    return HomeworkFiles.find({'metadata.studentId': this.userId});
});
