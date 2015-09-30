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
