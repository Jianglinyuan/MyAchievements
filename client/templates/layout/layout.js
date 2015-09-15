Template.layout.helpers({
    loggingln: function(){
        if(Meteor.user())
            return true;
        else
            return false;
    }
})
Template.header.helpers({
    isTeacher: function(){
        if(Meteor.user().profile.root === "teacher"){
            return true;
        }else{
            return false;
        }
    },
    isnotadmin: function(){
         if(Meteor.user().profile.root === "admin")
            return false;
          else
            return true;
    },
    username: function(){
        return Meteor.user().profile.name;
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
  },
  'mouseover .menu': function(){
    $("ul#dropdown1").show();
  },
  'mouseleave .menu': function(){
    $("ul#dropdown1").hide();
  },
});
Template.header.onRendered(function(){
    $(".button-collapse").sideNav();
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
