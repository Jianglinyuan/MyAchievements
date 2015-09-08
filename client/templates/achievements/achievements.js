Template.index.onRendered(function(){
    $(function () {
        //取到Achievements数组
        var achievements = Achievements.find({userId: Meteor.userId()}).fetch();
        var categories = [];
        //动态显示在图表上的作业次数
        for(var i = 0;i < achievements.length;i++){
            categories[i] = 'HW'+ (i+1);
        };
        var series1 = {
            name: 'score',
            data: []
        };
        //动态显示在图表上的每次作业分数
        for(var j = 0;j < achievements.length; j++){
            series1.data[j] = achievements[j].score;
        }
        var series2 = {
            color: '#ffc107',
            name: 'class rank',
            data: []
        };
        //动态显示在图表上的每次班级作业排名
        for (var k = 0; k < achievements.length; k++){
            series2.data[k] = achievements[k].class_rank;
        }
        var series3 = {
            name: 'group rank',
            data: []
        }
        for (var t = 0; t < achievements.length; t++){
            series3.data[t] = achievements[t].group_rank;
        } 
        $('#myScore').highcharts({
            colors: ["#ffffff"],
            chart: {
                backgroundColor: '#2196f3',
                type: 'line'
                
            },
            title: {
                style: {
                    color: '#ffffff',
                    font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                },
                useHTML:true,
    
                text: '<h4>My Score</h4>'
            },
            xAxis: {
                title: {
                    style: {
                        color: '#ffffff'
                    }
                },
                labels: {
                    style: {
                        color: '#ffffff'
                    }
                },
                categories:['hw1','hw2']
            },
            yAxis: {
                max:100,
                min:0,
                gridLineColor: '#1976d2',
                title: {
                    text: null
                    
                },
                labels: {
                    style: {
                        color: '#ffffff'
                    }
                },
            },
            credits: {
                style: {
                    color: '#2196f3'
                }
            },
            series: [series1] 
        });

        $('#myRank').highcharts({
            colors: ["#ffffff"],
            chart: {
                backgroundColor: '#00acc1',
                type: 'line'
            },
            title: {
                style: {
                    color: '#ffffff',
                    font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
                },
                useHTML:true,

                text: '<h4>My Rank</h4>'
            },
            xAxis: {
                title: {
                    style: {
                        color: '#ffffff'
                    }
                },
                labels: {
                    style: {
                        color: '#ffffff'
                    }
                },
                categories:[categories]
            },
            yAxis: [{
                max:100,
                min:1,
                reversed: true,
                gridLineColor: '#00838f',
                gridLineDashStyle: 'dot',
                allowDecimals:false,
                title: {
                    text: 'class rank',
                },
                labels: {
                    style: {
                        color: '#ffffff'
                    }
                }
            },{
                allowDecimals:false,
                max:10,
                min:1,
                title: {
                    text: 'group rank'
                },
                reversed:true,
                opposite: true
            }],
            credits: {
                style: {
                    color: '#00acc1'
                }
            },
            series: [series2,series3]
        });
    });
});

