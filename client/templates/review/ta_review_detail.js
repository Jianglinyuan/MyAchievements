Template.taReview.events({
    'click .tareview-submit': function(e){
        e.preventDefault();
        var user = this[0];
        var reviewed = user._id;
        var reviewer = Meteor.userId();
        var classNum = user && user.profile && user.profile.classNum;
        var homework = this[1];
        var homeworkId = homework._id;
        var homeworkCount = Homeworks.findOne(homeworkId).count;
        var comment = $("textarea#tacomment").val();
        var score = $("input#tascore").val();
        var validate = true;
        var foo = parseFloat(score);
        console.log(foo);
        if ( isNaN(foo) ){
            validate = false;
        }else{
            if ( score < 0 || score > 100 ){
                validate = false;
            }
        }
        //将count添加进去（）
        var newReview = {
            classNum: classNum,
            homeworkId: homeworkId,
            reviewer: reviewer,
            reviewed: reviewed,
            isTa: true,
            score: score,
            count: homeworkCount,
            comment: comment
        };

        var oldReview = Reviews.findOne({
            reviewer: reviewer,
            reviewed: reviewed,
            classNum: classNum,
            homeworkId: homeworkId,
            isTa: true
        });
        if ( validate ){
            if ( oldReview ){
                Reviews.update(oldReview._id,{
                    $set: {
                        comment: comment,
                        score: score
                    }
                });
                alert("更新成功");
            }else{
                Reviews.insert(newReview);
                alert("提交成功");
            }
        }else{
            alert("评分输入错误");
        }
    },
});

Template.taReview.helpers({
    taReviewInfo: function(){
        var user = this[0];
        var reviewed = user._id;
        var reviewer = Meteor.userId();
        var classNum = user && user.profile && user.profile.classNum;
        var homework = this[1];
        var homeworkId = homework._id;
        var homeworkCount = Homeworks.findOne(homeworkId).count;
        var reviewItem = Reviews.findOne({
            classNum: classNum,
            reviewed: reviewed,
            reviewer: reviewer,
            isTa: true
        });
        var data= {
            score: reviewItem.score,
            comment: reviewItem.comment
        };
        if ( reviewItem && reviewItem.comment && reviewItem.score ){
            data.type = "更新";
        } else {
            data.type = "提交";
        };
        return data;
    },
    Id: function(){
        return Meteor.userId();
    }
});
