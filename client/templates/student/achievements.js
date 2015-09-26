Template.myscore.onRendered(function(){
    $(document).ready(function(){
        var userId = Meteor.userId();
        var myachievements = Review.find({beReviewed: userId, isFinal: true}, {sort: {date: 1}}).fetch();
        console.log(myachievements);
        var categories = [];
        var score1 = [];
        for (var i = 0 ; i < myachievements.length; i++){
            var hwId = myachievements[i].homeworkId;
            var homework = Homeworks.findOne(hwId);
            var count = homework.count;
            categories[i] = "HW"+count;
            score1[i] = parseInt(myachievements[i].score);
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
        $('#myrank').highcharts({
            chart: {
                type: 'line'
            },
            title: {
                text: 'My Rank'
            },
            xAxis: {
                categories: ['HW1', 'HW2', 'HW3']
            },
            yAxis: [{
                max:80,
                min:1,
                reversed: true,
                allowDecimals: false,
                title: {
                    text: 'Class rank'
                }
            },{
                max:10,
                min:1,//最小值没用
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
                data: [1, 5, 14],
                color: '#ef6c00'
            }, {
                yAxis:1,
                name: 'group rank',
                data: [1, 2, 4],
                color: '#0d47a1'
            }]
        });
    })
});
