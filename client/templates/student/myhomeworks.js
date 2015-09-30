Template.homeworkList.helpers({
    homeworks: function(){
        return Homeworks.find();
    },
    isPresent: function(){
        var user = Meteor.user();
        var classNum = user && user.profile && user.profile.classNum;
        var classItem ;
        if ( classNum === 1 )
            classItem = this.classes[0];
        else
            classItem = this.classes[1];
        if ( classItem.status === "present" ) return true;
        else return false;
    },
    isFuture: function(){
        var user = Meteor.user();
        var classNum = user && user.profile && user.profile.classNum;
        var classItem ;
        if ( classNum === 1 )
            classItem = this.classes[0];
        else
            classItem = this.classes[1];
        if ( classItem.status === "future" ) return true;
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
