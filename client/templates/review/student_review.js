Template.studentReview.helpers({

    group: function(){
        return Meteor.user().profile.group;
    },
    count: function(){
        var homework = Homeworks.findOne({_id: this._id});
        var homeworklist = HomeworkList.findOne(homework.homeworklistId);
        return homeworklist.count;
    },
    title: function(){
        var homework = Homeworks.findOne({_id: this._id});
        var homeworklist = HomeworkList.findOne(homework.homeworklistId);
        return homeworklist.title;
    }
});
Template.reviewOthers.helpers({
    others: function(){
        var userId = Meteor.userId();
        var homeworklistId = Homeworks.findOne(this._id).homeworklistId;
        var group = Meteor.user().profile.group;
        return Homeworkfiles.find({
            'metadata.homeworklistId': homeworklistId,
            'metadata.team': group,
            'metadata.fileImage': {$ne: 1},
            'metadata.userId':{$ne: userId} 
        });
    } 
});
Template.showOthers.helpers({
    img: function(){
        var homeworkfiles = Homeworkfiles.findOne(this._id);
        return Homeworkfiles.findOne({
            'metadata.homeworklistId' : homeworkfiles.metadata.homeworklistId,
            'metadata.userId': homeworkfiles.metadata.userId,
            'metadata.fileImage': 1
        });
    },
    github: function(){
        if (this.metadata.githubUrl) return true;
        else return false;
    },
    review: function() {
        var homeworkId = this.metadata.homeworklistId;
        var reviewer = Meteor.userId();
        var beReviewed = this.metadata.userId
        var review =  Review.findOne({
            homeworkId: homeworkId,
            reviewer: reviewer,
            beReviewed: beReviewed
        });
        return review;
    }
});
Template.showOthers.events({
    'click .downloadfile': function(event, template) {
        event.preventDefault();
        var url=$(event.currentTarget).attr("href");
        window.open(url);
    },
    'click .review_btn': function(e) {
        e.preventDefault();
        var that = this;
        var new_review = {
            reviewer: Meteor.userId(), //bad 
            beReviewed: that.metadata.userId,
            homeworkId: that.metadata.homeworklistId,
            time: new Date(),
            content: $(e.target).parent().prev().find(".review_content").val(),
            score: $(e.target).prev().val()
        };

        var review = Review.findOne({
            reviewer: new_review.reviewer,
            beReviewed: new_review.beReviewed,
            homeworkId: new_review.homeworkId
        });

        if (review) {
            Review.update(review._id, {
                $set: {
                    content: new_review.content,
                    score: new_review.score,
                    time: new_review.time
                }
            });
            Materialize.toast("更新成功！",3000);
        } else {
            Review.insert(new_review);
            Materialize.toast("提交成功！",3000);
        }
    }
});
Template.showOthers.onRendered(function(){
    $(document).ready(function(){
        $('.materialbox').materialbox();
    });
});
Template.studentReview.onRendered(function(){
    this.$(document).ready(function(){
        $('ul.tabs').tabs();
    });
    this.$(document).ready(function() {
        $('select').material_select();
    });
});
