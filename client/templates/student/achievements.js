Template.myscore.onRendered(function(){
    $(document).ready(function(){
        var userId = Meteor.userId();
        var myachievements = Review.find({beReviewed: userId, isFinal: true}, {sort: {date: 1}}).fetch();
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
        var myachievements = Review.find({beReviewed: userId, isFinal: true}, {sort: {date: 1}}).fetch();
        var categories = []; 
        var classRank =[];
        var groupRank = [];
        //classRank
        // 该用户的每个被review的作业循环
        for (var i = 0 ; i < myachievements.length; i++){

            var hwId = myachievements[i].homeworkId;
            var thisScore = parseFloat(myachievements[i].score);
            //找出所有作业
            var allReviewedHomeWorkByHWId = Review.find({homeworkId : hwId, isFinal: true}).fetch();
            var allThisHomeWorkScore = [];
            var sameGroupHWScore = [];
            var thisGroupRank = 1;
            for(var n = 0 ; n < allReviewedHomeWorkByHWId.length ; n++){
                var id = allReviewedHomeWorkByHWId[n].beReviewed;
                if(allSameGroupStudentID.indexOf(id)!=-1){
                    sameGroupHWScore.push(allReviewedHomeWorkByHWId[n].score);
                }
            };
            for(var l = 0 ; l < sameGroupHWScore.length ; l++){
                if(sameGroupHWScore[l]>thisScore){
                    thisGroupRank++;
                }
            };
            var thisClassRank = 1;

            //方案一
            for(var j = 0 ; j < allReviewedHomeWorkByHWId.length ; j++){
                allThisHomeWorkScore.push(parseFloat(allReviewedHomeWorkByHWId[j].score));
            };
            for(var k = 0 ; k < allThisHomeWorkScore.length ; k++){
                if(allThisHomeWorkScore[k]>thisScore){
                    thisClassRank++;
                }
            };
            // 方案二(有点bug)
            // for(var j = 0 ; j < allReviewedHomeWorkByHWId.length ; j++){
            //     allThisHomeWorkScore[j] = parseFloat(allReviewedHomeWorkByHWId[j].score);
            // };
            // thisClassRank = allThisHomeWorkScore.sort().reverse().indexOf(thisScore)+1;
            groupRank[i] = thisGroupRank;
            classRank[i] = thisClassRank;
            var homework = Homeworks.findOne(hwId);
            var count = homework.count;
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
