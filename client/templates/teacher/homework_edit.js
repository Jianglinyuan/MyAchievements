Template.editHomework.helpers({
    homeworkInfo: function(){
        var homeworkId = this._id;
        return Homeworks.findOne(homeworkId);
    },
    class1Item: function(){
        var homeworkId = this._id;
        var class1Item = Homeworks.findOne(homeworkId).classes[0];
        return class1Item;
    },
    class2Item: function(){
        var homeworkId = this._id;
        var class2Item = Homeworks.findOne(homeworkId).classes[1];
        return class2Item;
    },
    errorClass: function(obj){
        return Session.get("editHomeworkError")[obj] ? "has-error" : "";
    },
    errorMessage: function(obj){
        return Session.get("editHomeworkError")[obj];
    }
});

Template.editHomework.onRendered(function(){
    Session.set("editHomeworkError",{});
    $('.datepicker').datetimepicker();
});

Template.editHomework.events({
    'submit form': function(e){
        e.preventDefault();
        var homeworkId = this._id;

        var now = Date.parse(Date())/3600000;

        var title = $(e.target).find('[id=edit-title]').val();
        var url = $(e.target).find('[id=edit-url]').val();

        var startTime1 = $(e.target).find('[id=edit-startTime1]').val();
        var deadLine1 = $(e.target).find('[id=edit-deadLine1]').val();
        var status1;
        if ( now >= getRealTime(startTime1) && now < getRealTime(deadLine1) )
            status1 = "present";
        else if ( now < getRealTime(startTime1) )
            status1 = "future";
        else if ( now >= getRealTime(deadLine1) )
            status1 = "previous";

        var status2;
        var startTime2 = $(e.target).find('[id=edit-startTime2]').val();
        var deadLine2 = $(e.target).find('[id=edit-deadLine2]').val();

        if ( now >= getRealTime(startTime2) && now < getRealTime(deadLine2))
            status2 = "present";
        else if ( now < getRealTime(startTime2) )
            status2 = "future";
        else if ( now >= getRealTime(deadLine2) )
            status2 = "previous";

        var data = {
            title: title,
            url: url,
            classes:[ 
                {
                    classNum: 1,
                    startTime : startTime1,
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
            return Session.set("editHomeworkError",errors);
        };

        var timeError1 = validateHomeworkTime(1,startTime1,deadLine1);
        if ( timeError1 ){
            return alert(timeError1);
        };

        var timeError2 = validateHomeworkTime(2,startTime2,deadLine2);
        if ( timeError2 ){
            return alert(timeError2);
        };
        Homeworks.update(homeworkId,{$set: data},function(error){
            if ( error ) alert(error.reason);
            else alert("作业更新成功");
        });
    }
});
