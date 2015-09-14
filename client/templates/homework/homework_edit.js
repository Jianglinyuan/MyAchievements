Template.homeworkedit.onRendered(function(){
        $('.datepicker').pickadate({
        });
        $('.timepicker').pickatime({
        });
});
Template.homeworkedit.events({
	'submit form':function(e){
        e.preventDefault();
        // 从页面获取的raw数据
        var title = $(e.target).find('[id=title]').val();                       
        var url = $(e.target).find('[id=url]').val();
        var deadDate = $(e.target).find('[id=enddate]').val();
        var deadTime = $(e.target).find('[id=endtime]').val();

        var showDeadLine = convertDeadline(deadDate,deadTime);
        var convertToHour = convertDeadtime(deadDate,deadTime);
        // test
        // console.log('截止日期是 : '+showdeadline+"  "+convertTohour);
        
        //数据封装
        var homework = {
            title : title,
            url : url,
            deadDate : deadDate,
            deadTime : deadTime,
            showDeadLine : showDeadLine,
            convertToHour : convertToHour,
            lastModify : new Date(),
        };
       /* Meteor.call(<][>'HomeworkListUpdate',this._id,homework,function(error,result){*/
            //if(error){
                //Materialize.toast(error.reason,3000,'rounded');
            //}else{
                //if(result.dateError){
                    //Materialize.toast('截至日期小于当前时间!',3000,'rounded');
                //}else if(result.inputError){
                    //Materialize.toast('输入未完成!',3000,'rounded');
                //}else{
                    //Materialize.toast('作业更新成功!',3000,'rounded');
                    //Router.go('index');
                //}
            //}
        //[>}<]);
        if(homework.convertToHour < Date.parse(new Date())/3600000){
            Materialize.toast('截止日期小于当前时间！',3000,'rounded');
        }else if(homework.title==""||homework.url==""||homework.deadDate==""||homework.deadTime==""){
            Materialize.toast('输入未完成！',3000,'rounded');
        }else{
            HomeworkList.update(this._id,{$set : homework},function(error){
                if(error)
                    Materialize.toast(error.reason,3000,'rounded');
                else{
                    Materialize.toast("更新成功",3000,'rounded');
                    Router.go('index');
                }
            });
        }
    },
});


