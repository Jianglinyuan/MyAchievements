Template.header.helpers({
    isTeacher: function(){
        if(Meteor.user().profile.power === "teacher"){
            return true;
        }else{
            return false;
        }
    },
    headSculpture: function(){
       return Meteor.user().profile.headSculpture;
    },
    username: function(){
        return Meteor.user().username;
    },
    loggingln: function(){
        if(Meteor.user())
            return true;
        else
            return false;
    }
});
Template.header.events({
     'click .loginOut': function(){
    Meteor.logout(function(error){
      if(error)
        alert("login out fail");
      else
        Router.go('login');
    });
  }
});
Template.index.helpers({
    isTeacher: function(){
        if(Meteor.user().profile.power === "teacher"){
            return true;
        }else{
            return false;
        }
    },
    homeworks : function(){
        return HomeworkList.find({},{sort : {count : 1}});
    },
});
