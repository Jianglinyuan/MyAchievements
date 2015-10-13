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
        var userId = Meteor.userId();
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
            'metadata.studentId': {$ne: userId},
            'metadata.fileImage': {$ne: 1}
        });
    }
});

Template.reviewItem.helpers({
    haveGithubUrl: function(){
        if (this.metadata.githubUrl) return true;
        else return false;
    },
    img: function(){
        var studentId = this.metadata.studentId;
        var classNum = this.metadata.classNum;
        var homeworkId = this.metadata.homeworkId;
        var reviewedGroup = this.metadata.group;

        return HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.classNum': classNum,
            'metadata.group': reviewedGroup,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': 1
        });
    },
    review: function(){
        var classNum = this.metadata.classNum;
        var homeworkId = this.metadata.homeworkId;
        var reviewer = Meteor.userId();
        var reviewed = this.metadata.studentId;
        return Reviews.findOne({
            classNum: classNum,
            homeworkId: homeworkId,
            reviewer: reviewer,
            reviewed: reviewed
        });
    },
    detail: function(){
        var classNum = this.metadata.classNum;
        var homeworkId = this.metadata.homeworkId;
        var reviewer = Meteor.userId();
        var reviewed = this.metadata.studentId;
        var review = Reviews.findOne({
            classNum: classNum,
            homeworkId: homeworkId,
            reviewer: reviewer,
            reviewed: reviewed
        });

        var detail = {};
        if ( review && review.comment && review.score ){
            detail.panel = "panel-primary";
            detail.signcolor = "review-sign-primary";
            detail.type = "更新";
            detail.btncolor = "btn-primary";
            detail.bgcolor = "score-btn";
        }else{
            detail.panel = "panel-unsubmit";
            detail.signcolor = "review-sign-unsubmit";
            detail.type = "提交";
            detail.btncolor = "btn-unsubmit";
            detail.bgcolor = "score-btn-unsubmit";
        };
        return detail;
    }
});
Template.reviewItem.events({
    'submit form': function(e,template){
        e.preventDefault();
        //get data...
        var comment = $("textarea[name=comment"+template.data.metadata.studentId+"]").val();
        var score = $("input[name=score"+template.data.metadata.studentId+"]").val();

        var validate = true;
        if ( isNaN(score) ){
            validate = false;
        }
        else {
            if ( score > 100 || score < 0 )
                validate = false;
        }
        var classNum = this.metadata.classNum;
        var reviewer = Meteor.userId();
        var reviewed = this.metadata.studentId;
        var homeworkId = this.metadata.homeworkId;
        var newReview = {
            reviewer: reviewer,
            reviewed: reviewed,
            classNum: classNum,
            homeworkId: homeworkId,
            comment: comment,
            score: score,
            isFinal: false,
            isTa: false
        }

        var oldReview = Reviews.findOne({
            reviewer: reviewer,
            reviewed: reviewed,
            classNum: classNum,
            homeworkId: homeworkId
        });
        if ( validate ){
            
            if ( oldReview ){
                Reviews.update(oldReview._id,{
                    $set: {
                        comment: comment,
                        score: score
                    } 
                });
            } else {
                Reviews.insert(newReview);
            }
        }else{
            alert("评分输入错误");
        }
    },
    'click .download-file': function(event) {
        event.preventDefault();
        var url=$(event.currentTarget).attr("href");
        window.open(url);
    },
});
