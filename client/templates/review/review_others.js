Template.reviewOthers.helpers({
    group: function(){
        var user = Meteor.user();
        var classNum = user && user.profile && user.profile.classNum;
        var homeworkId = this._id;
        var reviewerGroup = user && user.profile && user.profile.group;
        var relationship = Relationship.findOne({
            classNum: classNum,
            homeworkId: homeworkId,
            reviewerGroup: reviewerGroup
        });
        return relationship.reviewedGroup;
    },
    title: function(){
        var homework = Homeworks.findOne(this._id);
        return homework.title;
    },
    othersHomeworkFile: function(){
        var user = Meteor.user();
        var classNum = user && user.profile && user.profile.classNum;
        var homeworkId = this._id;
        var reviewerGroup = user && user.profile && user.profile.group;
        var reviewedGroup = Relationship.findOne({
            classNum: classNum,
            homeworkId: homeworkId,
            reviewerGroup: reviewerGroup
        }).reviewedGroup;
        return HomeworkFiles.find({
            'metadata.classNum': classNum,
            'metadata.group': reviewedGroup,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': {$ne: 1}
        });
    }
});

Template.reviewItem.helpers({
    haveGithubUrl: function(){
        console.log(this.metadata);
        if (this.metadata.githubUrl) return true;
        else return false;
    },
    img: function(){
        var classNum = this.metadata.classNum;
        var homeworkId = this.metadata.homeworkId;
        var reviewedGroup = this.metadata.group;
        return HomeworkFiles.findOne({
            'metadata.classNum': classNum,
            'metadata.group': reviewedGroup,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': 1
        });
    }
});
