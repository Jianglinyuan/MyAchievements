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
