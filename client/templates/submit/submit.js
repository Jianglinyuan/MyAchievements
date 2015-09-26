Template.present.events({
    'click .submit': function(event, template) {
        event.preventDefault();
        var studentId = Meteor.userId();
        var studentname = Meteor.user().profile.name;
        var studentNumber = Meteor.user().username;
        var homeworkId = $(event.currentTarget).attr("name");
        var file = $("input[name="+homeworkId+"]")[0].files[0];
        var image = $("input[name=image"+homeworkId+"]")[0].files[0];
        var chosedTeam = Meteor.user().profile.group;
        var count = Homeworkfiles.find({
            "metadata.homeworkId": homeworkId,
            "metadata.userId": studentId
        });
        var countnumber = count.count();
        var alertwindow = $(".alertstudent");
        var alertinfo = $("a.alert");
        var homeworkfile = new FS.File(file);
        var imagefile = new FS.File(image);
        var myDate = new Date(); //获取当前时
        var uploadtime = myDate.toLocaleString();
        var githubUrl = $("input[class=githuburl]").val();
        var comments = $("textarea[id=textarea1]").val();
        homeworkfile.metadata = {
            userId: studentId,
            userName: studentname,
            studentNumber: studentNumber,
            team: chosedTeam,
            homeworkId: homeworkId,
            fileName: file.name,
            uploadTime: uploadtime,
            fileSize: filesize,
            githubUrl: githubUrl,
            comments: comments
        };
        imagefile.metadata = {
            userId: studentId,
            homeworkId: homeworkId,
            team: chosedTeam,
            fileImage:1
        };
        if (file == undefined) {} else {
            var filename = file.name; //获取文件名
            var filesize = ((file.size) / 1024).toFixed(2);
        }
        if (chosedTeam == undefined || file == undefined || image == undefined || !(count == undefined)) {
            if (chosedTeam == undefined) {
                alertinfo.html("Please chose the team");
                alertwindow.removeClass('hide');
            } else {
                if (file == undefined) {
                    alertinfo.html("请提交作业原文件");
                    alertwindow.removeClass('hide');
                } else {
                    if (image == undefined) {
                        alertinfo.html("请上传预览图");
                        alertwindow.removeClass('hide');
                    } else {
                        while (countnumber > 0) {
                            Homeworkfiles.remove({
                                _id: count.fetch()[countnumber - 1]._id
                            })
                            countnumber--;
                        }
                        Homeworkfiles.insert(homeworkfile, function(err, fileObj) {
                            if (err) {
                                alertinfo.html("文件类型错误");
                                alertwindow.removeClass('hide');
                            } else {
                                $('#'+homeworkId).closeModal(); //
                                Homeworkfiles.insert(imagefile);
                                Materialize.toast('提交成功！', 1000, '', function() {});
                                
                            };
                        });
                    }
                }
            }
        } else {
            Homeworkfiles.insert(homeworkfile, function(err, fileObj) {
                if (err) {
                    alertinfo.html("文件类型错误");
                    alertwindow.removeClass('hide');
                } else {
                    $('#modal1').closeModal(); //
                    Materialize.toast('提交成功！', 1000, '', function() {})
                };
            });
        }
    }
});
Template.submit.events({
    'change .workfile': function(e,template) {
        var file = $("input[name="+template.data._id+"]")[0].files[0];
        var filename = file.name;
        $("input[name=upload"+template.data._id+"]").val(filename);
    },
    "change .imagefile": function(e,template) {
        var file = $("input[name=image"+template.data._id+"]")[0].files[0];
        var filename = file.name;
        $("input[name=imageupload"+template.data._id+"]").val(filename);
    },
    "click .alertstudent": function() {
        var alertwindow = $(".alertstudent");
        alertwindow.addClass('hide');
    }
});
