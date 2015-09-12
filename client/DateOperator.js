        //月份转换
        getMonth = function(month){
            switch(month){
                case 'January' : return '01';
                case 'February' : return '02';
                case 'March' : return '03';
                case 'April' : return '04';
                case 'May' : return '05';
                case 'June' : return '06';
                case 'July' : return '07';
                case 'August' : return '08';
                case 'September' : return '09';
                case 'October' : return '10';
                case 'November' : return '11';
                case 'December' : return '12';

            }
        }
        //处理（年月日）
        convertDeadline= function(deadline,deadtime){
        var year='';
        var month='';
        var day='';
        if(deadline){
            day = deadline.split(' ')[0];
            month = getMonth(deadline.split(' ')[1].split(',')[0]);
            year = deadline.split(',')[1];
        }
        return year+" 年 "+month+" 月 "+day+" 日 "+deadtime;
        }
        //处理（获取到小时和分钟）
        convertDeadtime = function(deadline,deadtime){
        var hour = 0;
        var minute = 0;
        var apm = '';
        // var now = new Date();
        if(deadtime!=''){
             hour = parseInt(deadtime.split(':')[0]);
             minute = parseInt(deadtime.split(':')[1].split(' ')[0]);
             apm = deadtime.split(':')[1].split(' ')[1];
            if(apm=='PM'&&hour<12)
                hour = hour + 12;
        }
        return Date.parse(deadline)/3600000+hour+minute/60;
        }