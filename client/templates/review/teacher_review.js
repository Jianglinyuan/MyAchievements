Template.teacherReview.helpers({
    groups: function(){
        //关键在于value怎么写
        return  Homeworkfiles.find();
    }
});
