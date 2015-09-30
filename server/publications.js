Meteor.publish("userData", function(){
    return Meteor.users.find();
});
Meteor.publish("homeworks", function(){
    return Homeworks.find();
});
Meteor.publish("myHomeworkFile", function(){
    return HomeworkFiles.find({'metadata.studentId': this.userId});
});
