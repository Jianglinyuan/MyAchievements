Template.showHomeworks.helpers({
    homeworks: function(){
        return Homeworks.find({userId: Meteor.userId()});
    },
    isPrevious: function(){
        var homeworklist = HomeworkList.findOne(this.homeworklistId);
        if (homeworklist.state === "previous"){
            return true;
        }else{
            return false;
        }
    },
    isPresent: function(){
        var homeworklist = HomeworkList.findOne(this.homeworklistId);
        if (homeworklist.state === "present"){
            return true;
        }else{
            return false;
        }
    },
    isFuture: function(){
        var homeworklist = HomeworkList.findOne(this.homeworklistId);
        if (homeworklist.state === "future"){
            return true;
        }else{
            return false;
        }
    }
});
Template.future.helpers({
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
    showStartTime: function(){
        var homeworklist = HomeworkList.findOne({_id: this.homeworklistId});
        return homeworklist.showStartTime;
    },
});

Template.present.helpers({

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
    haveSubmited:function(){
        var homeworklistId = Homeworks.findOne(this._id).homeworklistId;
        var userId = Meteor.userId();
        return Homeworkfiles.findOne({
            'metadata.userId': userId,
            'metadata.homeworklistId': homeworklistId
        });
    },
    img: function(){
        var homeworklistId = Homeworks.findOne(this._id).homeworklistId;
        var userId = Meteor.userId();
        return Homeworkfiles.findOne({
            'metadata.userId': userId,
            'metadata.homeworklistId': homeworklistId,
            'metadata.fileImage': 1
        });
    }
});

Template.previous.helpers({

    title: function(){
        var homeworklist = HomeworkList.findOne({_id: this.homeworklistId});
        return homeworklist.title;
    },
    count: function(){
        var homeworklist = HomeworkList.findOne({_id: this.homeworklistId});
        return homeworklist.count;
    },
    img: function(){
        var homeworklistId = Homeworks.findOne(this._id).homeworklistId;
        var userId = Meteor.userId();
        return Homeworkfiles.findOne({
            'metadata.userId': userId,
            'metadata.homeworklistId': homeworklistId,
            'metadata.fileImage': 1
        });
    },
    file: function(){
        var homeworklistId = Homeworks.findOne(this._id).homeworklistId;
        var userId = Meteor.userId();
        return Homeworkfiles.findOne({
            'metadata.userId': userId,
            'metadata.homeworklistId': homeworklistId,
            'metadata.fileImage': {$ne: 1}
        });
    }
});
Template.previous.events({
    'click  .downloadfile': function(e,template){
        e.preventDefault();
        var url = $(e.currentTarget).attr("href");
        window.open(url);
    }
});

Template.present.onRendered(function(){
    this.$('.modal-trigger').leanModal({
        dismissible: true,
        opacity: 0.5,
        out_duration:300
    });
}); 
