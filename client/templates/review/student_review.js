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
    },
    others: function(){
        var homeworklistId = Homeworks.findOne(this._id).homeworklistId;
        var group = Meteor.user().profile.group;
        return Homeworkfiles.find({
            'metadata.homeworklistId': homeworklistId,
            'metadata.team': group,
            'metadata.fileImage': {$ne: 1},
            'metadata.userId':{$ne:Meteor.userId()} 
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
    }
});
Template.showOthers.onRendered(function(){
    $(document).ready(function(){
        $('.materialbox').materialbox();
    });
});
