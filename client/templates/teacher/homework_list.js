Template.allHomeworks.helpers({
    homeworks: function(){
        return Homeworks.find({},{sort:{count: -1}});
    }
});
Template.homeworkItem.helpers({
    classItem1: function(){
        return this.classes[0];
    },
    classItem2: function(){
        return this.classes[1];
    },
    class1Status: function(){
        var classItem = this.classes[0];
        var status = classItem.status;
        if ( status === "present" ){
            return "label-success";
        }else if ( status = "future" ){
            return "label-warning";
        }else{
            return "label-default";
        }
    },
    class2Status: function(){
        var classItem = this.classes[1];
        var status = classItem.status;
        if ( status === "present" ){
            return "label-success";
        }else if ( status = "future" ){
            return "label-warning";
        }else{
            return "label-default";
        }
    },
    isTeacher: function(){
        var user = Meteor.user();
        if ( user.profile.root === "teacher" ) return true;
        else return false;
    }

});
