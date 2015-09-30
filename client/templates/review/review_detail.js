Template.reviewDetail.helpers({
    title: function(){
        var homework = Homeworks.findOne(this.homeworkId);
        return homework.title;
    },
    count: function(){
        var homework = Homeworks.findOne(this.homeworkId);
        return homework.count;
    },
    reviews: function(){
        return Review.find({
            homeworkId: this.homeworkId,
            beReviewed: this.userId,
            isFinal: {$ne: true},
            isTa: {$ne: true}
        });
    },
    review: function(){
        return Review.findOne({
            homeworkId: this.homeworkId,
            beReviewed: this.userId,
            isFinal: true
        });
    },
    item: function(){
        var homeworkId = this.homeworkId;
        var beReviewed = this.userId;
        var review = Review.findOne({
            homeworkId: homeworkId,
            beReviewed: beReviewed,
            isFinal: true
        });
        var item = {};
        if (review && review.score){
            item.color = "teal";
            item.value = "update";
        }else{
            item.color = "orange darken-3";
            item.value = "submit";
        }
        return item;
    },
    isTa: function(){
        var user = Meteor.user();
        var userRoot = user && user.profile && user.profile.root;
        if (userRoot === "assistant") return true;
        else return false;
    },
    TAname: function(){
        var user = Meteor.user();
        return user && user.profile && user.profile.name;
    },
    TAcontent: function(){
        var TaId = Meteor.userId();
        var beReviewed = this.userId;
        var homeworkId = this.homeworkId;
        return Review.findOne({reviewer: TaId,beReviewed: beReviewed, homeworkId: homeworkId});
    },
    TAreviews: function(){
        var beReviewed = this.userId;
        var homeworkId = this.homeworkId;
        return Review.find({
            beReviewed: beReviewed,
            homeworkId: homeworkId,
            isTa: true
        });
    }
});
Template.TAitem.helpers({
    TaName: function(){
        var userId = this.reviewer;
        var user = Meteor.users.findOne(userId);
        return user && user.profile && user.profile.name;
    }
});
Template.reviewDetail.events({
    'click .final_score': function(e,template){
        e.preventDefault();
        var value = $(e.target).parent().find('[name=finalscore]').val();
        var validate = true;
        if(value > 100 || value < 0){
            validate = false;
        }
        
        var homeworkId = template.data.homeworkId;
        var homeworkCount = Homeworks.findOne(homeworkId).count;
        var reviewerId = Meteor.userId();
        var beReviewed = template.data.userId;
        var new_review = {
            homeworkId: homeworkId,
            reviewer: reviewerId,
            beReviewed: beReviewed,
            score: value,
            count: homeworkCount,
            isFinal:true,
            date: new Date()
        };
        var review = Review.findOne({
            reviewer: reviewerId,
            beReviewed: beReviewed,
            homeworkId: homeworkId
        });

        if(validate){
        if (review){
            Review.update(review._id, {
                $set: {
                    score: value,
                    finalscore: value
                }
            });
            Materialize.toast("更新成功!", 2000);
        }else{
            Review.insert(new_review);
            Materialize.toast("提交成功!",2000);
        }
        }else{
            Materialize.toast("提交的分数必须在0~100之间!",2000);
        }
    },
    'click .tabtn': function(e,template){
        e.preventDefault();
        var value = $(e.target).parent().prev().find('[name=tascore]').val();
        var content = $(e.target).parent().parent().prev().find('[name=tacomment]').val();
        var validate = true;
        if(value > 100 || value < 0){
            validate = false;
        }
        var homeworkId = template.data.homeworkId;
        var reviewerId = Meteor.userId();
        var beReviewed = template.data.userId;
        var new_review = {
            homeworkId: homeworkId,
            reviewer: reviewerId,
            beReviewed: beReviewed,
            content: content,
            score: value,
            isFinal: false,
            isTa: true,
            date: new Date()
        };
        var review = Review.findOne({
            reviewer: reviewerId,
            beReviewed: beReviewed,
            homeworkId: homeworkId
        });

        if(validate){
            if (review){
                Review.update(review._id, {
                    $set: {
                        content: content,
                        score: value,
                        finalscore: value
                    }
                });
                Materialize.toast("更新成功!", 2000);
            }else{
                Review.insert(new_review);
                Materialize.toast("提交成功!",2000);
            }
        }else{
            Materialize.toast("提交的分数必须在0~100之间!",2000);
        }

    },
    'click .return': function(e,template){
        e.preventDefault();
        Router.go('reviewList',{'_id': template.data.homeworkId});

    }
});
Template.reviewItem.helpers({
    name: function(){
        var userId = this.reviewer;
        var user = Meteor.users.findOne(userId);
        var name = user && user.profile && user.profile.name;
        return name;
    },
    ID: function(){
        var userId = this.reviewer;
        var user = Meteor.users.findOne(userId);
        var ID = user && user.username;
        return ID;
    }
});
