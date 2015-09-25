Template.teachersHomeworkList.onRendered(function(){
    this.$(document).ready(function(){
        $('ul.tabs').tabs();
    });
    this.$(document).ready(function(){
        $('select').material_select();
    });
});
Template.teachersHomeworkList.helpers({
    isTeacher: function(){
        var user = Meteor.user();
        var userRoot = user && user.profile && user.profile.root;
        if(userRoot === "teacher"){
            return true;
        }else{
            return false;
        }
    }
});
