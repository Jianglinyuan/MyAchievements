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
    },
    firstOne: function(){
        var userId = this[0]._id;
        var classNum = this[0].profile.classNum;
        var allusers = Meteor.users.find({"profile.classNum": classNum},{sort:{
            "profile.group": 1,
            username: 1
        }}).fetch();
        if ( allusers[0]._id === userId ) return true;
        return false;
    },
    lastOne: function(){
        var userId = this[0]._id;
        var classNum = this[0].profile.classNum;
        var allusers = Meteor.users.find({"profile.classNum": classNum},{sort:{
            "profile.group": 1,
            username: 1
        }}).fetch();
        var last = allusers.length - 1;
        if ( allusers[last]._id === userId ) return true;
        return false;
    },
    zip: function(){
        var studentId = this[0]._id;
        var homeworkId = this[1]._id;
        var homeworkfiles = HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': {$ne: 1}
        });
        return homeworkfiles;
    },
    haveGithubUrl: function(){
        var studentId = this[0]._id;
        var homeworkId = this[1]._id;
        var homeworkfiles = HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': {$ne: 1}
        });
        if ( homeworkfiles && homeworkfiles.metadata.githubUrl ) return true;
        else return false;
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
        var validate = true;
        var foo = parseFloat(score);
        if ( isNaN(score) ){
            validate = false;
        }else{
            if ( score < 0 || score > 100 )
                validate = false;
        };
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
        if ( validate ){
            Reviews.insert(data);
            alert("提交成功");
        }else{
            alert("评分输入错误");
        }
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
        var validate = true;
        var foo = parseFloat(score);
        if ( isNaN(score) ){
            validate = false;
        }else{
            if ( score < 0 || score > 100 )
                validate = false;
        };
        if ( validate ){
            Reviews.update(reviewId,{
                $set:{
                    score: score
                }
            });
            alert("更新成功");
        }else{
            alert("评分输入错误");
        }
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

    },
    'click .gotoNext': function(e){
        e.preventDefault();
        var homeworkId = this[1]._id;
        var userId = this[0]._id;
        var user = Meteor.users.findOne(userId);
        console.log(user);
        var classNum = user && user.profile.classNum;
        var allusers = Meteor.users.find({"profile.classNum": classNum},{sort:{
            "profile.group": 1,
            username: 1
        }}).fetch();
        var nextOneIndex;
        for ( var i = 0 ; i < allusers.length; i ++ ){
            if ( allusers[i]._id === user._id ){
                nextOneIndex = i+1;
                break;
            }
        };
        var nextOneId = allusers[nextOneIndex]._id;
        Router.go("teacherReviewDetail",{
            "homeworkId": homeworkId,
            "studentId": nextOneId
        });
    },
    'click .gotoPre': function(e){
        e.preventDefault();
        var homeworkId = this[1]._id;
        var userId = this[0]._id;
        var user = Meteor.users.findOne(userId);
        console.log(user);
        var classNum = user && user.profile.classNum;
        var allusers = Meteor.users.find({"profile.classNum": classNum},{sort:{
            "profile.group": 1,
            username: 1
        }}).fetch();
        var preOneIndex;
        for ( var i = 0 ; i < allusers.length; i ++ ){
            if ( allusers[i]._id === user._id ){
                preOneIndex = i-1;
                break;
            }
        };
        var preOneId = allusers[preOneIndex]._id;
        Router.go("teacherReviewDetail",{
            "homeworkId": homeworkId,
            "studentId": preOneId
        });
    },
    'click .downloadSource': function(e){
        e.preventDefault();
        var url=$(e.currentTarget).attr("href");
        window.open(url);
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


