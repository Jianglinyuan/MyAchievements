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
        if(Meteor.user().profile.root === "teacher"){
            return true;
        }else{
            return false;
        }
    }
});
