Meteor.subscribe('subhomeworks');
Template.submithomework.events({
    "change .workfile":function(event,template){
        event.preventDefault();
        console.log(this.urlid);
        var studentid=Meteor.userId();
        var userName = Meteor.user().username;
        var homeworkid=$(event.currentTarget).attr("name");
        console.log(homeworkid);
        var count=subHomeworks.findOne({"metadata.homework":homeworkid,"metadata.student":studentid});
        console.log(count);
        var files=$(".workfile")[0].files[0];
        var newfile=new FS.File(files);
        // var team = $("select[name=teamselector]").val();//获取学生选择的小组
        if (files==undefined) {}else{
            var filename=files.name;//获取文件名
            var size = ((files.size)/1024).toFixed(2);
        }

        var myDate = new Date();//获取当前时间
        var   time=myDate.toLocaleString( ); //获取日期与时间
        console.log(filename);
        newfile.metadata = {
            student:studentid,//这里对应学生的userid
            // team:team,//这里放小组
            homework:homeworkid,//这里对应哪一次作业
            filename:filename, //这里对应文件名
            time:time,
            size:size,
            studentName:userName
        };
        //开始判断是否选择作业与是否选择小组
        if (files==undefined) {
            if(files==undefined ){        console.log("Fuck you");
                Materialize.toast('请选择文件！', 1000, 'rounded',function(){
                });
            }
            else{
            }
        }else
        {
            if (count==undefined){
                subHomeworks.insert(newfile, function (err, fileObj) {
                    if (err) {
                        Materialize.toast('提交失败，格式不正确！', 1000,'',function(){
                        })
                    }else{
                        Materialize.toast('提交成功！', 1000,'',function(){
                        })
                    }
                    ;
                });
            }else{
                subHomeworks.remove({_id:count._id});
                subHomeworks.insert(newfile, function (err, fileObj) {
                    if (err) {
                        Materialize.toast('提交失败，格式不正确！', 1000,'',function(){
                        })
                    }else{
                        Materialize.toast('提交成功！', 1000,'',function(){
                        })
                    }
                    ;
                });
            }
        }
    },
});

Template.submithomework.helpers({
    workId: function () {
        return this.workid;
    }
});
Template.sourcefile.helpers({
    workfile: function () {
        return subHomeworks.find({'metadata.homework': this.workid});
    }
});
