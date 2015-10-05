Template.teacherReviewDetail.helpers({
    info: function(){
        var user = this[0];
        return user;
    },
    hwinfo: function(){
        var homework = this[1];
        return homework;
    },
    myReviews: function(){
        var user = this[0];
        var reviewed = user && user._id;
        var classNum = user && user.profile && user.profile.classNum;
        var homework = this[1];
        var homeworkId = homework && homework._id;
        return Reviews.find({
            reviewed: reviewed,
            classNum: classNum,
            homeworkId: homeworkId,
            isFinal: false,
            isTa: false
        });
    },
    taReviews: function(){
        var user = this[0];
        var reviewed = user && user._id;
        var classNum = user && user.profile && user.profile.classNum;
        var homework = this[1];
        var homeworkId = homework && homework._id;
        return Reviews.find({
            reviewed: reviewed,
            classNum: classNum,
            homeworkId: homeworkId,
            isTa: true
        });
    },
    isTa: function(){
        var user = Meteor.user();
        var userRoot = user && user.profile && user.profile.root;
        if ( userRoot === "assistant" ) return true;
        else return false;
    },
    isTeacher: function(){
        var user = Meteor.user();
        var userRoot = user && user.profile && user.profile.root;
        if ( userRoot === "teacher" ) return true;
        else return false;
    },
    haveFinal: function(){
        var user = this[0];
        var reviewed = user && user._id;
        var homework = this[1];
        var homeworkId = homework && homework._id;
        var review = Reviews.findOne({
            reviewed: reviewed,
            homeworkId: homeworkId,
            isFinal: true
        });
        var data = {};
        if ( review ){
            data.score = review.score;
            data.type = "更新";
            data.classType = "finalUpdate";
        }else{
            data.score = "";
            data.type = "提交";
            data.classType = "finalScore";
        }
        return data;
    }
});
Template.teacherReviewDetail.events({
    'click .finalScore': function(e){
        e.preventDefault();
        var user = this[0];
        var reviewed = user._id;
        var reviewer = Meteor.userId();
        var classNum = user && user.profile && user.profile.classNum;
        var homework = this[1];
        var homeworkId = homework._id;
        var homeworkCount = Homeworks.findOne(homeworkId).count;
        var score = $("input#finalScore").val();
        //将count添加进去（）
        var data = {
            classNum: classNum,
            homeworkId: homeworkId,
            reviewer: reviewer,
            reviewed: reviewed,
            isFinal: true,
            score: score,
            count: homeworkCount,
        };
        Reviews.insert(data);
        alert("提交成功");
    },
    'click .finalUpdate': function(e){
        e.preventDefault();
        var user = this[0];
        var reviewed = user && user._id;
        var homework = this[1];
        var homeworkId = homework && homework._id;
        var review = Reviews.findOne({
            reviewed: reviewed,
            homeworkId: homeworkId,
            isFinal: true
        });
        var reviewId = review._id;
        var score = $("input#finalUpdate").val();
        console.log(score);
        Reviews.update(reviewId,{
            $set:{
                score: score
            }
        });
        alert("更新成功");
    },
    'click .gotoReviewList': function(e){
        e.preventDefault();
        var homeworkId = this[1]._id;
        var userId = this[0]._id;
        var user = Meteor.users.findOne(userId);
        var userClass = user && user.profile && user.profile.classNum;
        if ( userClass === 1 ) Session.set("classNumShow", 1); 
        else Session.set("classNumShow", 2);
        Router.go("teacherReviewList", {"_id": homeworkId});

    }
});

Template.showMyReview.helpers({
    userInfo: function(){
        var userId = this.reviewer;
        return Meteor.users.findOne(userId); 
    }
});
Template.showTaReviews.helpers({
    taInfo: function(){
        var userId = this.reviewer;
        return Meteor.users.findOne(userId);
    }
});
