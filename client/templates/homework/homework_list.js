Template.future.onRendered(function(){
   this.$('#modal1').openModal();
   this.$('#modal1').closeModal();
   this.$('.modal-trigger').leanModal({
       dismissible: true,
       opacity: 0.5,
       out_duration:300
   });
});
Template.homeworklist.helpers({
    homeworks: function(){
        return Homeworks.find({userId:Meteor.userId()});
    }
});
Template.future.helpers({
    title: function(){
        var homeworklist = HomeworkList.findOne(this.homeworklistId);
        return homeworklist.title;
    },
    url: function(){
        var homeworklist = HomeworkList.findOne(this.homeworklistId);
        return homeworklist.url;
    }
});
