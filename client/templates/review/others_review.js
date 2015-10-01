Template.othersReview.helpers({
    group2: function(){
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
    }
});
