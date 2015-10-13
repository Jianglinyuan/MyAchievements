Template.preReviewItem.helpers({
    otherReviews: function(){
        var reviewed = Meteor.userId();
        var user = Meteor.user();
        var classNum = user && user.profile && user.profile.classNum;
        var homeworkId = this._id;
        return Reviews.find({
            classNum: classNum,
            homeworkId: homeworkId,
            reviewed: reviewed,
            isFinal: {$ne: true},
            isTa: {$ne: true}
        });
    },
    taReview: function(){
        var reviewed = Meteor.userId();
        var user = Meteor.user();
        var classNum = user && user.profile && user.profile.classNum;
        var homeworkId = this._id;
        return Reviews.find({
            classNum: classNum,
            homeworkId: homeworkId,
            reviewed: reviewed,
            isTa: true
        });
    }
});
