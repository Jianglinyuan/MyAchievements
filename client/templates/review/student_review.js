Template.reviewOthers.helpers({
    others: function(){
        var userId = Meteor.userId();
        var homeworkId = this._id;
        var group = Meteor.user().profile.group;
        var value;
        var bereviewedGroup = Relationship.findOne({reviewerGroup: group}).bereviewedGroup;
        var relationshipId = Relationship.findOne({reviewerGroup: group})._id;
        if (bereviewedGroup !== 0){
            value = bereviewedGroup;
        }else{
            //以下内容可以封装成函数
            var relationgroup = Relationship.find({marked: false}).fetch();
            var groupArr = [];
            for (var i = 0 ; i < relationgroup.length; i++){
                groupArr[i] = relationgroup[i].reviewerGroup;
            }
            function onlyUnique(value,index,self){
                return self.indexOf(value) === index;
            };
            var groups = groupArr.filter(onlyUnique); //去掉重复值
            var delIndex = groups.indexOf(group);
            var bereviewedValue;
            if (groups.length === 1){
                bereviewedValue = groups[0];
            }else{
                groups.splice(delIndex,1); //剔除掉自己组
                var index = Math.floor(Math.random()*groups.length);
                bereviewedValue = groups[index];
            }

            Relationship.update(relationshipId,{$set: {bereviewedGroup: bereviewedValue}});
            var beMarkedRelId = Relationship.findOne({reviewerGroup: bereviewedValue})._id;
            Relationship.update(beMarkedRelId,{$set: {marked: true}});
            value = bereviewedValue;
        }
        return Homeworkfiles.find({
            'metadata.homeworkId': homeworkId,
            'metadata.team': value,
            'metadata.fileImage': {$ne: 1},
            'metadata.userId':{$ne: userId} 
        });
    },
});
Template.othersReview.helpers({
    othersreview: function(){
        var userId = Meteor.userId();
        var homeworkId = this._id;
        return Review.find({homeworkId: homeworkId,beReviewed: userId});
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
            reviewer: Meteor.userId(), 
            beReviewed: that.metadata.userId,
            homeworkId: that.metadata.homeworkId,
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
