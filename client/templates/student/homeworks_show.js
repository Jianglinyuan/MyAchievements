Template.showHomeworks.helpers({
    homeworks: function(){
        return Homeworks.find();
    },
    isPrevious: function(){
        if (this.state === "previous"){
            return true;
        }else{
            return false;
        }
    },
    isPresent: function(){
        if (this.state === "present"){
            return true;
        }else{
            return false;
        }
    },
    isFuture: function(){
        if (this.state === "future"){
            return true;
        }else{
            return false;
        }
    }
});
Template.present.helpers({

    haveSubmited:function(){
        var homeworkId = this._id;
        var userId = Meteor.userId();
        return Homeworkfiles.findOne({
            'metadata.userId': userId,
            'metadata.homeworkId': homeworkId
        });
    },
    img: function(){
        var homeworkId = this._id;
        var userId = Meteor.userId();
        return Homeworkfiles.findOne({
            'metadata.userId': userId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': 1
        });
    }
});

Template.previous.helpers({
    img: function(){
        var homeworkId = this._id; 
        var userId = Meteor.userId();
        return Homeworkfiles.findOne({
            'metadata.userId': userId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': 1
        });
    },
    file: function(){
        var homeworkId = this._id;
        var userId = Meteor.userId();
        return Homeworkfiles.findOne({
            'metadata.userId': userId,
            'metadata.homeworkId': homeworkId,
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
