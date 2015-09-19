Template.newhomework.onRendered(function(){
$(function(){
        $('.datepicker').pickadate();
        $('.timepicker').pickatime();
    });
});
Template.newhomework.helpers({
    count: function(){
        var count = HomeworkList.find().count();
        return count+1;
    }
});
Template.newhomework.events({
   
    'submit form':function(e){
        e.preventDefault();
        // 从页面获取的raw数据
        var count = HomeworkList.find().count()+1;
        var title = $(e.target).find('[id=title]').val();                       
        var url = $(e.target).find('[id=url]').val();

        // 开始时间的相关数据
        var startDate = $(e.target).find('[id=startdate]').val();
        var startTime = $(e.target).find('[id=starttime]').val();

        var showStartTime = convertDeadline(startDate,startTime);
        var convertStartTime = convertDeadtime(startDate,startTime);

        // 截止时间的相关数据
        var deadDate = $(e.target).find('[id=enddate]').val();
        var deadTime = $(e.target).find('[id=endtime]').val();

        var showDeadLine = convertDeadline(deadDate,deadTime);
        var convertToHour = convertDeadtime(deadDate,deadTime);


        //取到所有学生用户
        var users = Meteor.users.find({'profile.root': "student"}).fetch();
        console.log(typeof(users));
        //数据封装
        var homework = {
            count : count,
            title : title,
            url : url,
            startDate : startDate,
            startTime : startTime,
            showStartTime : showStartTime,
            convertStartTime : convertStartTime,
            deadDate : deadDate,
            deadTime : deadTime,
            showDeadLine : showDeadLine,
            convertToHour : convertToHour,
            state : 'future',
        }

        Meteor.call('HomeworkListInsert',homework,users,function(error,result){
            if(error)
                Materialize.toast(error.reason,3000,'rounded');
            else{
                if(result.inputError){
                    Materialize.toast('输入未完成！',3000,'rounded');
                }else if(result.endDateError){
                    Materialize.toast('截止日期小于当前时间！',3000,'rounded');
                }else if(result.startDateError){
                    Materialize.toast('开始日期小于当前时间！',3000,'rounded');
                }else if(result.spaceTimeError){
                    Materialize.toast('开始时间大于等于截止时间！',3000,'rounded');
                }else{
                Materialize.toast('作业新建成功',3000,'rounded');

                // 清空输入历史
                $(e.target).find('[id=title]').val('');                       
                $(e.target).find('[id=url]').val('');

                $(e.target).find('[id=startdate]').val('');
                $(e.target).find('[id=starttime]').val('');

                $(e.target).find('[id=enddate]').val('');
                $(e.target).find('[id=endtime]').val('');

                $(document).ready(function(){
                    $('ul.tabs').tabs('select_tab', 'allHomeworkList');
                });
                }
            }
        });


    },

    'click .datepicker' : function(){  
        $('.datepicker').pickadate();
    },
    'click .timepicker' : function(){
    }
    
});
