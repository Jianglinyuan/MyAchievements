getRealTime = function(time){
    if (time){
        var date = time.split(' ')[0];
        var hour_min = time.split(' ')[1];
        var apm = time.split(' ')[2];
        var hour = parseInt(hour_min.split(':')[0]);
        var min = parseInt(hour_min.split(':')[1].split(' ')[0]);
        if ( apm === 'PM' && hour < 12 )
            hour = hour + 12;
        return Date.parse(date)/3600000 + hour + min/60;
    }
};