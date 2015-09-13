Template.homeWorkEdit.onRendered(function(){
    // $(function(){
        $('.datepicker').pickadate({
        });
        $('.timepicker').pickatime({
        });
});
Template.homeWorkEdit.events({
	'submit form':function(e){
        e.preventDefault();
        // 从页面获取的raw数据
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
            title : title,
            url : url,
            deaddate : deaddate,
            deadtime : deadtime,
            showdeadline : showdeadline,
            convertTohour : convertTohour,
        };
        if(homework.convertTohour < Date.parse(new Date())/3600000){
            Materialize.toast('截止日期小于当前时间！',3000,'rounded');
        }else if(homework.title==""||homework.url==""||homework.deaddate==""||homework.deadtime==""){
            Materialize.toast('输入未完成！',3000,'rounded');
        }else{
        HomeworkList.update(this._id,{$set : homework},function(error){
        	if(error)
        		Materialize.toast(error.reason,3000,'rounded');
        	else{
        		Materialize.toast("更新成功",3000,'rounded');
        		Router.go('allHomeWork');
        	}
        });
        }
    },
});


