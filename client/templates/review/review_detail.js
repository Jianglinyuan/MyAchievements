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
            isFinal: {$ne: true}
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
        var reviewerId = Meteor.userId();
        var beReviewed = template.data.userId;
        var new_review = {
            homeworkId: homeworkId,
            reviewer: reviewerId,
            beReviewed: beReviewed,
            score: value,
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
