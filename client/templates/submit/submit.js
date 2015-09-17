Meteor.subscribe('homeworkfiles');
Template.pre_submit.events({
    'click .submit': function(event, template) {
        event.preventDefault();
        var studentId = Meteor.userId();
        var homeworkId = $(event.currentTarget).attr("name");
        var file = $("input[class=workfile]")[0].files[0];
        var image = $("input[class=imagefile]")[0].files[0];
        var chosedTeam = $('input[name="group1"]:checked').val();
        var count = Homeworkfiles.find({
            "metadata.homework": homeworkId,
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
            team: chosedTeam,
            homework: homeworkId,
            fileName: filename,
            uploadTime: uploadtime,
            fileSize: filesize,
            githubUrl: githubUrl,
            comments: comments
        };
        imagefile.metadata = {
            userId: studentId,
            homework: homeworkId,
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
                    alertinfo.html("Please chose the homework file");
                    alertwindow.removeClass('hide');
                } else {
                    if (image == undefined) {
                        alertinfo.html("Please chose the imagefile");
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
                                alertinfo.html("The file type is not suitable");
                                alertwindow.removeClass('hide');
                            } else {
                                $('#modal1').closeModal(); //
                                Homeworkfiles.insert(imagefile);
                                Materialize.toast('提交成功！', 1000, '', function() {})
                            };
                        });
                    }
                }
            }
        } else {
            Homeworkfiles.insert(homeworkfile, function(err, fileObj) {
                if (err) {
                    alertinfo.html("The file type is not suitable");
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
    'change .workfile': function(e) {
        var file = $("input[class=workfile]")[0].files[0];
        var filename = file.name;
        $("input[name=uploadname]").val(filename);
    },
    "change .imagefile": function() {
        var file = $("input[class=imagefile]")[0].files[0];
        var filename = file.name;
        $("input[name=imagename]").val(filename);
    },
    "click .alertstudent": function() {
        var alertwindow = $(".alertstudent");
        alertwindow.addClass('hide');
    }
});
