Template.newhomework.onRendered(function(){
$(function(){
        $('.datepicker').pickadate();
        $('.timepicker').pickatime();
    });
});
Template.newhomework.helpers({
    // count: function(){
    //     var count = HomeworkList.find().count();
    //     return count+1;
    // }
});
Template.newhomework.events({
   
    'submit form':function(e){
        e.preventDefault();
        // 从页面获取的raw数据
        var count = HomeworkList.find().count()+1;
        var title = $(e.target).find('[id=title]').val();                       
        var url = $(e.target).find('[id=url]').val();
        var deaddate = $(e.target).find('[id=enddate]').val();
        var deadtime = $(e.target).find('[id=endtime]').val();

        var showdeadline = convertDeadline(deaddate,deadtime);
        var convertTohour = convertDeadtime(deaddate,deadtime);
        // test
        // console.log('截止日期是 : '+showdeadline+"  "+convertTohour);
        
        //数据封装
        var homework = {
            count : count,
            title : title,
            url : url,
            deaddate : deaddate,
            deadtime : deadtime,
            showdeadline : showdeadline,
            convertTohour : convertTohour,
            state : 'present',
        }
        
        Meteor.call('HomeworkListInsert',homework,function(error,result){
            if(error)
                Materialize.toast(error.reason,3000,'rounded');
            else{
                if(result.dateError){
                    Materialize.toast('截止日期小于当前时间！',3000,'rounded');
                }else if(result.inputError){
                    Materialize.toast('输入未完成！',3000,'rounded');
                }
                else{
                Materialize.toast('作业新建成功',3000,'rounded');
                Router.go('allHomeWork');
                }
            }
        });
    },
    // ???????
    'click .datepicker' : function(){  
        $('.datepicker').pickadate();
    },
    'click .timepicker' : function(){
        $('.timepicker').pickatime();
    }
});
