Template.homeworkedit.onRendered(function(){
        $('.datepicker').pickadate({
            closeOnSelect: true,
        });
        $('.timepicker').pickatime({
        });
});
Template.homeworkedit.events({
    'submit form':function(e){
        e.preventDefault();

        // 从页面获取的raw数据
        var now = new Date();
        var title = $(e.target).find('[id=title]').val();                       
        var url = $(e.target).find('[id=url]').val();
        var deadDate = $(e.target).find('[id=enddate]').val();
        var deadTime = $(e.target).find('[id=endtime]').val();

        var startDate = $(e.target).find('[id=startdate]').val();
        var startTime = $(e.target).find('[id=starttime]').val();

        var showStartTime = convertDeadline(startDate,startTime);
        var convertStartTime = convertDeadtime(startDate,startTime);

        var showDeadLine = convertDeadline(deadDate,deadTime);
        var convertToHour = convertDeadtime(deadDate,deadTime);
        var state;
        if (convertStartTime <= Date.parse(now)/3600000){
            state = "present";
        }else{
            state = "future";
        }
        //数据封装
        var homework = {
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
            state: state,
            lastModify : new Date(),
        };

        if(homework.convertToHour < Date.parse(new Date())/3600000){
            Materialize.toast('截止日期小于当前时间！',3000,'rounded');
        }else if(homework.title==""||homework.url==""||homework.deadDate==""||homework.deadTime==""||homework.startDate==""||homework.startTime==""){
            Materialize.toast('输入未完成！',3000,'rounded');
        }else if(homework.convertStartTime >= homework.convertToHour){
            Materialize.toast('开始时间大于等于截止时间！',3000,'rounded');
        }else{
            Homeworks.update(this._id,{$set : homework},function(error){
                if(error)
                    Materialize.toast(error.reason,3000,'rounded');
                else{
                    Materialize.toast("更新成功",3000,'rounded');
                    Router.go('teachersHomeworkList');
                }
            });
        }
    },
});


