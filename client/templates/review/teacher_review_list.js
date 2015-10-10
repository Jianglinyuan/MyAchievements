Template.teacherReviewList.helpers({
    classGroups: function(num){
        var classNum = parseInt(num);
        var groups = new Array();
        var users = Meteor.users.find({
            'profile.root': 'student',
            'profile.classNum': classNum
        }).fetch();
        var usersArr = [];
        for (var i = 0; i < users.length; i++){
            usersArr[i] = users[i].profile.group;
        };
        function onlyUnique(value,index,self){
            return self.indexOf(value) === index;
        };
        var uniUsers = usersArr.filter(onlyUnique);
        function cmb(a,b){
            return a - b;
        };
        uniUsers.sort(cmb);
        for (var j = 0 ; j < uniUsers.length; j++){
            var value = {
                number: uniUsers[j],
                classNum: classNum
            };
            groups.push(value);
        };
        return groups;
    },
});

Template.teacherReviewList.onRendered(function(){
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    var classNumShow = Session.get("classNumShow");
    if ( classNumShow === 1 ) $('#myTabs a[href=#class1]').tab('show');
    else if( classNumShow === 2 ) $('#myTabs a[href=#class2]').tab('show');
    var bodyHeight = Session.get("bodyHeight");
    document.body.scrollTop = bodyHeight;
});

Template.showMembers.helpers({
    members: function(){
        var group = this.number;
        var classNum = this.classNum;
        return Meteor.users.find({
            'profile.group': group,
            'profile.classNum': classNum},
            {
                sort: {
                    username: 1
                }
        });
    }
});

Template.membersContent.helpers({
    zip: function(){
        var studentId = this._id;
        var homework = Homeworks.find().fetch();
        var homeworkId = homework[0]._id;
        var homeworkfiles = HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': {$ne: 1}
        });
        console.log(homeworkfiles);
        return homeworkfiles;
    },
    haveMessage: function(){
        var studentId = this._id;
        var homework = Homeworks.find().fetch();
        var homeworkId = homework[0]._id;
        var homeworkfiles = HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': {$ne: 1}
        });
        if ( homeworkfiles.metadata.message !== "" ) return true;
        else return false;
    },
    haveUrl: function(){
        var studentId = this._id;
        var homework = Homeworks.find().fetch();
        var homeworkId = homework[0]._id;
        var homeworkfiles = HomeworkFiles.findOne({
            'metadata.studentId': studentId,
            'metadata.homeworkId': homeworkId,
            'metadata.fileImage': {$ne: 1}
        });
        if ( homeworkfiles.metadata.githubUrl !== "" ) return true;
        else return false;
    },
    finalScore: function(){
        var homework = Homeworks.find().fetch();
        var homeworkId = homework[0]._id;
        var reviewed = this._id;
        var review = Reviews.findOne({
            homeworkId: homeworkId,
            reviewed: reviewed,
            isFinal: true
        });
        if ( review && review.score ){
            return review.score;
        }else{
            return "未评分";
        }
    }
});
Template.membersContent.events({
    'click .downloadfile': function(event) {
        event.preventDefault();
        var url=$(event.currentTarget).attr("href");
        window.open(url);
    },
    'click .gotoReview': function(e,template){
        e.preventDefault();
        var homeworks = Homeworks.find().fetch();
        var homeworkId = homeworks[0]._id;
        console.log(template.data._id);
        var scrHeight = document.body.scrollTop;
        console.log(scrHeight);
        Session.set("bodyHeight",scrHeight);
        Router.go('teacherReviewDetail',
                {
                    'homeworkId': homeworkId,
                    'studentId': this._id
                });
    }
});

