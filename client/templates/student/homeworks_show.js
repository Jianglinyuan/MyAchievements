Template.showHomeworks.helpers({
    homeworks: function(){
        var user = Meteor.user();
        return Homeworks.find({userId: user._id});
    }
});
Template.pre_review.helpers({

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
    },
    img: function(){
        var homeworkId = this._id;
        var userId = Meteor.userId();
        return Homeworkfiles.findOne({
            'metadata.userId': userId,
            'metadata.homework': homeworkId,
            'metadata.fileImage': 1
        });
    }
});
Template.pre_submit.helpers({

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
Template.pre_submit.onRendered(function(){
    this.$('#modal1').openModal();
    this.$('#modal1').closeModal();
    this.$('.modal-trigger').leanModal({
        dismissible: true,
        opacity: 0.5,
        out_duration:300
    });
});
