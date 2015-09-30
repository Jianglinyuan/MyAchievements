Template.achievements.onRendered(function(){
    $(function () { 
        $('#myscore').highcharts({
             colors: ['#0d47a1'],
            chart: {
                type: 'line'
            },
            title: {
                text: 'My Score'
            },
            xAxis: {
                categories: ['HW1','HW2','HW3'] 
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
                name: 'Jane',
                data: [100, 90, 94]
            }, {
                name: 'John',
                data: [85, 87, 83]
            }]
        });
        $('#myrank').highcharts({
            colors: ['#0d47a1'],
            chart: {
                type: 'line'
            },
            title: {
                text: 'My Rank'
            },
            xAxis: {
                categories: ['HW1','HW2','HW3'] 
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
                name: 'Jane',
                data: [100, 90, 94]
            }, {
                name: 'John',
                data: [85, 87, 83]
            }]
        });
    });
});
