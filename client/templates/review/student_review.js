Template.studentReview.helpers({
    group: function(){
        var user = Meteor.user();
        var homeworkId = this._id;
        var group = user && user.profile && user.profile.group;
        var relationship = Relationship.findOne({homeworkId: homeworkId, reviewerGroup: group});
        return relationship.bereviewedGroup;
    }
});
Template.reviewOthers.helpers({
    others: function(){
        var userId = Meteor.userId();
        var homeworkId = this._id;
        var group = Meteor.user().profile.group;
        var value;
        var beReviewedGroup = Relationship.findOne({
            homeworkId: homeworkId,
            reviewerGroup: group,
        }).bereviewedGroup;
        value = beReviewedGroup;
        console.value;
        //根据已经提交了的作业进行review
        return Homeworkfiles.find({
            'metadata.homeworkId': homeworkId,
            'metadata.team': value,
            'metadata.fileImage': {$ne: 1},
            'metadata.userId':{$ne: userId} 
        });
    },
});

//找到所有的有关自己的review
Template.othersReview.helpers({
    othersreview: function(){
        var userId = Meteor.userId();
        var homeworkId = this._id;
        return Review.find({
            homeworkId: homeworkId,
            beReviewed: userId,
            isFinal:false
        });
    }  
});
Template.showOthers.helpers({
    img: function(){
        var homeworkfiles = Homeworkfiles.findOne(this._id);
        return Homeworkfiles.findOne({
            'metadata.homeworkId' : homeworkfiles.metadata.homeworkId,
            'metadata.userId': homeworkfiles.metadata.userId,
            'metadata.fileImage': 1
        });
    },
    github: function(){
        if (this.metadata.githubUrl !== "") return true;
        else return false;
    },
    review: function() {
        var homeworkId = this.metadata.homeworkId;
        var reviewer = Meteor.userId();
        var beReviewed = this.metadata.userId;
        var review =  Review.findOne({
            homeworkId: homeworkId,
            reviewer: reviewer,
            beReviewed: beReviewed
        });
        return review;
    },
    detial: function(){
        var homeworkId = this.metadata.homeworkId;
        var reviewer = Meteor.userId();
        var beReviewed = this.metadata.userId;
        var review =  Review.findOne({
            homeworkId: homeworkId,
            reviewer: reviewer,
            beReviewed: beReviewed
        });
        var detial = {};
        if (review && review.content && review.score){
            detial.signcolor = "teal";
            detial.type = "update";
            detial.btncolor = "teal";
        }else{
            detial.signcolor = "orange darken-3";
            detial.type = "submit";
            detial.btncolor = "orange darken-3"
        }
        return detial;
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
            reviewer: Meteor.userId(), 
            beReviewed: that.metadata.userId,
            homeworkId: that.metadata.homeworkId,
            isFinal: false,
            time: new Date(),
            content: $(e.target).parent().parent().prev().find(".review_content").val(),
            score: $(e.target).parent().prev().find('[name=score]').val()
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

Template.studentReview.onRendered(function(){
    this.$(document).ready(function(){
        $('ul.tabs').tabs();
    });
    this.$(document).ready(function() {
        $('select').material_select();
    });
});
