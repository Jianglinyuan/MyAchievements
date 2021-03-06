Template.submit.onRendered(function(){
    Session.set("homeworkFilesError",{});
    Session.set("fileId","");
    Session.set("imageFileId","");
});
Template.submit.helpers({
    errorMessage: function(filed){
        return Session.get("homeworkFilesError")[filed];
    },
    errorClass: function(filed){
        return Session.get("homeworkFilesError")[filed] ? "has-error" : "";
    },
    isUploading: function(){
        return Session.get("fileId");
    },
    isImageUploading: function(){
        return Session.get("imageFileId");
    }
});
Template.present.events({
    'click .file-submit': function(e,template){
        e.preventDefault();
        var user = Meteor.user();
        //get student data...
        var studentId = Meteor.userId();
        var studentName = user && user.profile && user.profile.name;
        var studentNumber = user && user.username;
        var classNum = user && user.profile && user.profile.classNum;
        var group = user && user.profile && user.profile.group;

        //get homework data
        var homeworkId = $(e.currentTarget).attr("name");
        var githubUrl = $("input#githubUrl").val();
        var message = $("textarea#message").val();
        var file = $("input[name=" + homeworkId + "]")[0].files[0];
        var image = $("input[name=image" + homeworkId + "]")[0].files[0];

        var errors = validateHomeworkFiles(file,image);
        if (errors.file || errors.image){
            return Session.set("homeworkFilesError",errors);
        };

        var storedFiles = HomeworkFiles.find({
            "metadata.homeworkId": homeworkId,
            "metadata.studentId": studentId
        });
        var count = storedFiles && storedFiles.count();

        var homeworkfile = new FS.File(file);
        homeworkfile.metadata = {
            studentId: studentId,
            studentName: studentName,
            studentNumber: studentNumber,
            classNum: classNum,
            group: group,
            homeworkId: homeworkId,
            fileName: file.name,
            githubUrl: githubUrl,
            message: message
        };

        var imagefile = new FS.File(image);
        imagefile.metadata = {
            studentId: studentId,
            homeworkId: homeworkId,
            classNum: classNum,
            group: group,
            imageName: image.name,
            fileImage: 1
        };

        while( count > 0 ){
            var fileId = storedFiles.fetch()[count - 1]._id;
            HomeworkFiles.remove({_id: fileId});
            count--;
        }
        HomeworkFiles.insert(homeworkfile, function(error,fileObj){
            if ( error ){
                errors.file = "文件类型错误";
            }else{
                console.log(homeworkfile instanceof FS.File);
                HomeworkFiles.insert(imagefile,function(error,fileObj){
                    if ( error ){
                        //...
                    }else{
                        Session.set("imageFileId",fileObj._id);
                        //$('#' + homeworkId).modal('hide');
                        Session.set("fileId",fileObj._id);
                    }
                });
                Session.set("homeworkFilesError",{});

            }
        });
    },
    'click .file-close': function(e){
        e.preventDefault();
        var homeworkId = $(e.currentTarget).attr("name");
        Session.set("homeworkFilesError",{});
        $('#' + homeworkId).modal('hide');
    }
});

validateHomeworkFiles = function(file,image){
    var errors = {};
    if ( !file )
        errors.file = "请提交作业源文件";
    if ( !image )
        errors.image = "请上传作业预览图";
    return errors;
}
