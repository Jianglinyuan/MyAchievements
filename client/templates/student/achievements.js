Template.achievements.onRendered(function(){
    $(function () { 
        // scoreShow
        var userId = Meteor.userId();
        var myachievements = Reviews.find({reviewed: userId, isFinal: true}, {sort: {count: 1}}).fetch();
        var categories = [];
        var score1 = [];
        for (var i = 0 ; i < myachievements.length; i++){
            var hwId = myachievements[i].homeworkId;
            var homework = Homeworks.findOne(hwId);
            var count = homework.count;
            categories[i] = "HW"+count;
            score1[i] = parseFloat(myachievements[i].score);
        };
        $('#myscore').highcharts({
             colors: ['#0d47a1'],
            chart: {
                type: 'line'
            },
            title: {
                text: 'My Score'
            },
            xAxis: {
                categories : categories
            },
            yAxis: {
                max:100,
                min:0,
                title: {
                    text: 'score'
                }
            },
            credits:{
                enabled: false
            },
            series: [{
                name : 'score',
                data :score1
            }]
        });

        var group = Meteor.user().profile.group;
        var classnum = Meteor.user().profile.classNum;

        //和当前用户同班同组的人数
        var classCount = Meteor.users.find({'profile.root': 'student', 'profile.classNum': classnum}).count();
        
        //和当前用户的同班同组成员包括自己
        var allSameGroup = Meteor.users.find({'profile.group' : group,'profile.classNum' : classnum}).fetch();
        
        //所有同班同组的成员ID
        var allSameGroupStudentID = [];
        for(var x=0;x<allSameGroup.length;x++){
            allSameGroupStudentID.push(allSameGroup[x]._id);
        };

        var userId = Meteor.userId();

        // 该用户的每个被review的作业按作业号排序
        var myachievements = Reviews.find({reviewed: userId, isFinal: true}, {sort: {count: 1}}).fetch();
        var categories2 = []; 
        var classRank =[];
        var groupRank = [];

        
        // 该用户的每个被review的作业循环
        for (var i = 0 ; i < myachievements.length; i++){
            //classRank的初始参数
            var hwId = myachievements[i].homeworkId;
            var thisScore = parseFloat(myachievements[i].score);
            classRank[i] = getOneClassRank(hwId,thisScore,classnum);
            groupRank[i] = getOneGroupRank(hwId,thisScore,allSameGroupStudentID,classnum);
            var count = Homeworks.findOne(hwId).count;
            categories2[i] = "HW"+count; 
        };     


        $('#myrank').highcharts({
            colors: ['#0d47a1'],
            chart: {
                type: 'line'
            },
            title: {
                text: 'My Rank'
            },
            xAxis: {
                categories: categories2 
            },
            yAxis: [{
                max:classCount,
                min:0,
                reversed: true,
                allowDecimals: false,
                title: {
                    text: 'Class rank'
                }
            },{
                max:allSameGroup.length,
                min:0,//最小值没用
                reversed: true,
                opposite:true,
                gridLineDashStyle: 'dot',
                allowDecimals: false,
                title: {
                    text:'Group rank'
                },
            }],
            credits:{
                enabled: false
            },
            series: [{
                yAxis:0,
                name: 'class rank',
                data: classRank,
                color: '#ef6c00'
            }, {
                yAxis:1,
                name: 'group rank',
                data: groupRank,
                color: '#0d47a1'
            }]
        });
    });
});
