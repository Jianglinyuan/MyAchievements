Template.addHomework.onRendered(function(){
    $('.datepicker').datetimepicker();
    Session.set("homeworkError",{});
});

Template.addHomework.helpers({
    errorMessage: function(filed){
        return Session.get("homeworkError")[filed];
    },
    errorClass: function(filed){
        return Session.get("homeworkError")[filed] ? "has-error" : "";
    },
    count: function(){
        return Homeworks.find().count()+1;
    }
});

Template.addHomework.events({
    'submit form': function(e){
        e.preventDefault();
        //data ..
        var userId = Meteor.userId();
        var title = $(e.target).find('[id=title]').val();
        var url = $(e.target).find('[id=url]').val();
        var count = Homeworks.find().count()+1;

        var now = Date.parse(Date())/3600000;

        //class1 data
        var startTime1 = $(e.target).find('[id=startTime1]').val();
        var status1;
        if ( now >= getRealTime(startTime1) )
            status1 = "present";
        else 
            status1 = "future";
        var deadLine1 = $(e.target).find('[id=deadLine1]').val();

        //class2 data
        var startTime2 = $(e.target).find('[id=startTime2]').val();
        var status2;
        if ( now >= getRealTime(startTime2) )
            status2 = "present";
        else
            status2 = "future";
        var deadLine2 = $(e.target).find('[id=deadLine2]').val();

        var data ={
            userId: userId,
            title: title,
            url: url,
            count: count,
            classes: [
                { 
                    classNum: 1, 
                    startTime: startTime1, 
                    deadLine: deadLine1,
                    status: status1
                },
                { 
                    classNum: 2, 
                    startTime: startTime2,
                    deadLine: deadLine2,
                    status: status2
                }
            ]
        };

        var errors = validateHomework(data);
        if ( errors.title || errors.url ){
            return Session.set("homeworkError",errors);
        };

        var timeError1 = validateHomeworkTime(1,startTime1,deadLine1);
        if ( timeError1 ){
            return alert(timeError1);
        };

        var timeError2 = validateHomeworkTime(2,startTime2,deadLine2);
        if ( timeError2 ){
            return alert(timeError2);
        };

        Meteor.call("HomeworkInsert", data, function(error){
            if ( error ) {
                alert(error.reason); 
                //...
            }else{
                
                alert("新建作业成功!");
                $('#myTabs a[href="#allHomeworks"]').tab('show');

                // 清空输入历史
                $(e.target).find('[id=title]').val('');                       
                $(e.target).find('[id=url]').val('');
                $(e.target).find('[id=startdate]').val('');
                $(e.target).find('[id=starttime]').val('');
                $(e.target).find('[id=enddate]').val('');
                $(e.target).find('[id=endtime]').val('');
            }
        });
    },
});

getRealTime = function(time){
    if (time){
        var date = time.split(' ')[0];
        var hour_min = time.split(' ')[1];
        var apm = time.split(' ')[2];
        var hour = parseInt(hour_min.split(':')[0]);
        var min = parseInt(hour_min.split(':')[1].split(' ')[0]);
        if ( apm === 'PM' && hour < 12 )
            hour = hour + 12;
        return Date.parse(date)/3600000 + hour + min/60;
    }
};

validateHomework = function(homeworks){
    var errors = {};
    if ( !homeworks.title ){
        errors.title = "请输入作业标题";
    }
    if ( !homeworks.url ){
        errors.url = "请输入作业链接";
    }
    return errors;
};

validateHomeworkTime = function(classNum,startTime,deadLine){
    var error;
    var now = Date.parse(Date())/3600000;
    if ( startTime >= deadLine ){
        error = "班级"+ classNum + "的作业截止时间小于开始时间";
    }
    else if ( now >= deadLine ){
        error = "班级"+ classNum + " 的作业截止时间小于当前时间";
    }
    return error;
};
