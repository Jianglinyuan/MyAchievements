Template.homeworkList.helpers({
    homeworks: function(){
        return Homeworks.find();
    }
});
Template.present.helpers({
    image: function(){
        var studentId = Meteor.userId();
        var homeworkId = this._id;
        return HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': 1
        });
    }
});
