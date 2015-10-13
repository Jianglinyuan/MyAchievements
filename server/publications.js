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

Meteor.publish("reviews", function(){
    return Reviews.find();
});

//取到当前学生的所有作业
Meteor.publish("myHomeworkFile", function(){
    return HomeworkFiles.find({'metadata.studentId': this.userId});
});
//取到当前作业
Meteor.publish("singleHomework", function(homeworkId){
    return Homeworks.find(homeworkId);
});

Meteor.publish("myHwHomeworkFile", function(homeworkId,studentId){
    this.studentId = studentId;
    this.homeworkId = homeworkId;
    return HomeworkFiles.find({
        "metadata.studentId": studentId,
        "metadata.homeworkId": homeworkId
    });
});

//取到当前作业，当前班级的所有HomeworkFiles
Meteor.publish("hwHomeworkFiles", function(homeworkId){
    var student = Meteor.users.findOne(this.userId);
    var classNum = student && student.profile && student.profile.classNum;
    return HomeworkFiles.find({
        'metadata.homeworkId': homeworkId,
        'metadata.classNum': classNum
    });
});

//取到当前作业下所有源文件的作业(不分班级)
Meteor.publish("singleHomeworkFiles", function(homeworkId){
    return HomeworkFiles.find({
        'metadata.homeworkId': homeworkId,
        'metadata.fileImage': {$ne: 1}
    });
});

//取到当前作业，当前班级的所有Relationship
Meteor.publish("hwRelationship", function(homeworkId){
    this.homeworkId = homeworkId;
    var student = Meteor.users.findOne(this.userId);
    var classNum = student && student.profile && student.profile.classNum;
    return Relationship.find({
        classNum: classNum,
        homeworkId: homeworkId
    });
});

//取到当前作业、当前班级的所有Reviews
Meteor.publish("hwReviews", function(homeworkId){
    this.homeworkId = homeworkId;
    var student = Meteor.users.findOne(this.userId);
    var classNum = student && student.profile && student.profile.classNum;
    return Reviews.find({
        classNum: classNum,
        homeworkId: homeworkId
    });
});

Meteor.publish("myHwReviews", function(homeworkId){
    this.homeworkId = homeworkId;
    var student = Meteor.users.findOne(this.userId);
    var classNum = student && student.profile && student.profile.classNum;
    return Reviews.find({
        classNum: classNum,
        homeworkId: homeworkId,
        reviewed: this.userId
    });
});
//取到当前作业下所有最终评分的Reviews
Meteor.publish("thisHwReviews", function(homeworkId){
    this.homeworkId = homeworkId;
    return Reviews.find({
        homeworkId: homeworkId,
        isFinal: true
    });
});

Meteor.publish("myReviews", function(homeworkId,studentId){
    this.homeworkId = homeworkId;
    this.studentId = studentId;
    return Reviews.find({
        homeworkId: homeworkId,
        reviewed: studentId
    });
});
