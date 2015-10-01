Template.adminItem.helpers({
    admins: function(){
        return Meteor.users.find({'profile.root': 'admin'});
    },
    email: function(){
        return this.emails[0].address;
    }
});

Template.teacherItem.helpers({
    teachers: function(){
        return Meteor.users.find({'profile.root': 'teacher'});
    },
    email: function(){
        return this.emails[0].address;
    }
});

Template.assistantItem.helpers({
    assistants: function(){
        return Meteor.users.find({'profile.root': 'assistant'});
    },
    email: function(){
        return this.emails[0].address;
    }
});

Template.studentItem.onRendered(function(){
    var classValue = parseInt($("#classValue").val());
    return Session.set("classValue", classValue);
});
Template.studentItem.events({
    'change .classValue': function(){
        var classValue = parseInt($("#classValue").val());
        return Session.set("classValue", classValue);
    },
    'click .deleteUser': function(){
        if ( confirm("确认删除该用户?") ){
            var allHomeworkFiles = HomeworkFiles.find({'metadata.studentId': this._id}).fetch();
            console.log(allHomeworkFiles);
            var deleteArr = [];
            for( var i = 0 ; i < allHomeworkFiles.length; i++ ){
                deleteArr[i] = allHomeworkFiles[i]._id;
            };
            for ( var j = 0 ; j < deleteArr.length ; j++){
                HomeworkFiles.remove(deleteArr[j]);
            };
            Meteor.users.remove(this._id);        
        }
    }
});
Template.studentItem.helpers({
    students: function(){
        //如何取到classValue !!!
        var classValue = Session.get("classValue");
        return Meteor.users.find({
            'profile.root': 'student',
            'profile.classNum': classValue 
        },{sort: {'profile.group': 1}});
    },
    email: function(){
        return this.emails[0].address;
    }
});
