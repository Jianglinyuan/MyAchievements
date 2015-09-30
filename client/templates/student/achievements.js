Template.myscore.onRendered(function(){
    $(document).ready(function(){
        var userId = Meteor.userId();
        var myachievements = Review.find({beReviewed: userId, isFinal: true}, {sort: {count: 1}}).fetch();
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
                categories: categories 
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
                name: 'score',
                data: score1 
            }]
        });
    })
});


Template.myrank.onRendered(function(){
    $(document).ready(function(){
        var classCount = Meteor.users.find({'profile.root': 'student'}).count();
        var group = Meteor.user().profile.group;
        var allSameGroup = Meteor.users.find({'profile.group' : group}).fetch();
        var allSameGroupStudentID = [];
        for(var x=0;x<allSameGroup.length;x++){
            allSameGroupStudentID.push(allSameGroup[x]._id);
        };

        var userId = Meteor.userId();
        // 该用户的每个被review的作业按作业号排序
        var myachievements = Review.find({beReviewed: userId, isFinal: true}, {sort: {count: 1}}).fetch();
        var categories = []; 
        var classRank =[];
        var groupRank = [];
        var cR = new ReactiveVar();
        var gR = new ReactiveVar();

        
        
        // Meteor.setInterval(function(){
        //     for (var i = 0 ; i < myachievements.length; i++){
        //     //classRank的初始参数
        //     var hwId = myachievements[i].homeworkId;
        //     var thisScore = parseFloat(myachievements[i].score);
        //     classRank[i] = getOneClassRank(hwId,thisScore);
        //     groupRank[i] = getOneGroupRank(hwId,thisScore,allSameGroupStudentID);
        //     var count = Homeworks.findOne(hwId).count;
        //     categories[i] = "HW"+count; 
        // };
        // cR.set(classRank);gR.set(groupRank);
        // console.log(classRank+" ++ "+groupRank+" + "+cR.get());
        // },5000);
        
        // 该用户的每个被review的作业循环
        for (var i = 0 ; i < myachievements.length; i++){
            //classRank的初始参数
            var hwId = myachievements[i].homeworkId;
            var thisScore = parseFloat(myachievements[i].score);
            classRank[i] = getOneClassRank(hwId,thisScore);
            groupRank[i] = getOneGroupRank(hwId,thisScore,allSameGroupStudentID);
            var count = Homeworks.findOne(hwId).count;
            categories[i] = "HW"+count; 
        };     

        $('#myrank').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'My Rank'
            },
            xAxis: {
                categories: categories
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
            credits: {
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
    })
});
