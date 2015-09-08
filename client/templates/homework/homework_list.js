Template.homeworklist.helpers({
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
Template.previous.events({
    'click .test': function(e){
        var score = parseInt(Math.random()*100);
        var group_rank = parseInt(Math.random()*10);
        var class_rank = parseInt(Math.random()*100);
        Achievements.insert({
            userId: Meteor.userId(),
            homeworkId: this._id,
            score: score,
            group_rank: group_rank,
            class_rank: class_rank
        });
        location.reload(true);
    }
});
Template.previous.helpers({
    score: function(){
        var achievements = Achievements.find({userId: Meteor.userId(),homeworkId:this._id}).fetch()[0];
        return achievements.score;
    },
    groupRank: function(){
        var achievements = Achievements.find({userId: Meteor.userId(),homeworkId:this._id}).fetch()[0];
        return achievements.group_rank;
    },
    classRank: function(){
        var achievements = Achievements.find({userId: Meteor.userId(),homeworkId:this._id}).fetch()[0]; 
        return achievements.class_rank;
    }
});
