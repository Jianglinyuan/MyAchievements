Template.homeworkList.helpers({
    homeworks: function(){
        return Homeworks.find();
    },
    checkStatus: function(obj){
        this.obj = obj;
        var user = Meteor.user();
        var classNum = user && user.profile && user.profile.classNum;
        var classItem ;
        if ( classNum === 1 )
            classItem = this.classes[0];
        else
            classItem = this.classes[1];
        if ( classItem.status === obj ) return true;
        else return false;
    }
});
Template.present.helpers({
    image: function(){
        var studentId = Meteor.userId();
        var homeworkId = this._id;
        return HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': 1
        });
    },
    haveImage: function(){
        var studentId = Meteor.userId();
        var homeworkId = this._id;
        var image = HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': 1
        });
        if ( image ) return true;
        else return false;
    },
    preHwItem: function(){
        var user = Meteor.user();
        var classNum = user && user.profile && user.profile.classNum;
        var homeworkItem ;
        if ( classNum === 1 ) homeworkItem = this.classes[0];
        else homeworkItem = this.classes[1];
        return homeworkItem;
    } 
});
Template.future.helpers({
    futHwItem: function(){
        var user = Meteor.user();
        var classNum = user && user.profile && user.profile.classNum;
        var homeworkItem ;
        if ( classNum === 1 ) homeworkItem = this.classes[0];
        else homeworkItem = this.classes[1];
        return homeworkItem;
    }  
});
Template.previous.helpers({
    file: function(){
        var studentId = Meteor.userId();
        var homeworkId = this._id;
        return HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': {$ne: 1}
        });
    },
    fileImage: function(){
        var studentId = Meteor.userId();
        var homeworkId = this._id;
        return HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': 1
        });
    },
    score : function(){
        var homeworkId = this._id;
        var userId = Meteor.userId();
        var review = Reviews.findOne({homeworkId : homeworkId,reviewed : userId,isFinal: true});
        console.log(review);
        return review.score;
    },
    classRank : function(){
        var homeworkId = this._id;
        var userId = Meteor.userId();
        var classnum = Meteor.user().profile.classNum;
        var score = parseFloat(Reviews.findOne({homeworkId : homeworkId,reviewed : userId ,isFinal:true}).score);
        return getOneClassRank(homeworkId,score,classnum);
    },
    groupRank : function(){
        var homeworkId = this._id;
        var userId = Meteor.userId();
        var classnum = Meteor.user().profile.classNum;
        var score = parseFloat(Reviews.findOne({homeworkId : homeworkId,reviewed : userId, isFinal:true}).score);
        var group = Meteor.user().profile.group;
        var allSameGroup = Meteor.users.find({'profile.group' : group}).fetch();
        var allSameGroupStudentID = [];
        for(var x=0;x<allSameGroup.length;x++){
            allSameGroupStudentID.push(allSameGroup[x]._id);
        };
        console.log(score);
        return getOneGroupRank(homeworkId,score,allSameGroupStudentID,classnum);
    },
});

Template.previous.events({
    'click .pre-download': function(event){
        event.preventDefault();
        var url=$(event.currentTarget).attr("href");
        window.open(url);
    }  
});
