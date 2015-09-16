Template.showHomeworks.helpers({
    homeworks: function(){
        var user = Meteor.user();
        return Homeworks.find({userId: user._id});
    }
});
Template.review.helpers({

    title: function(){
        var homeworklist = HomeworkList.findOne({_id: this.homeworklistId});
        return homeworklist.title;
    },
    url: function(){
        var homeworklist = HomeworkList.findOne({_id: this.homeworklistId});
        return homeworklist.url;
    },
    count: function(){
        var homeworklist = HomeworkList.findOne({_id: this.homeworklistId});
        return homeworklist.count;
    }

});
Template.submit.helpers({

    title: function(){
        var homeworklist = HomeworkList.findOne({_id: this.homeworklistId});
        return homeworklist.title;
    },
    url: function(){
        var homeworklist = HomeworkList.findOne({_id: this.homeworklistId});
        return homeworklist.url;
    },
    count: function(){
        var homeworklist = HomeworkList.findOne({_id: this.homeworklistId});
        return homeworklist.count;
    },
    showDeadline: function(){
        var homeworklist = HomeworkList.findOne({_id: this.homeworklistId});
        return homeworklist.showDeadLine;
    }

});
