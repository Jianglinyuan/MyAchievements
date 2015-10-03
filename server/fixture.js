if (Meteor.users.find().count() === 0){
    var admin = {
        username: "admin",
        password: "admin",
        email: "sysulz19920512@163.com",
        profile: {
            name: "admin",
            root: "admin"
        }
    };
    Accounts.createUser(admin);
}
Meteor.methods({
    serverTime : function(){
        return new Date();
    }
});


if(Meteor.isServer){
    Meteor.startup(function(){

        Meteor.setInterval(function(){

        time = Meteor.call('serverTime');
        var homeworks = Homeworks.find().fetch();
        for(var i=0;i<homeworks.length;i++){
            var allClass = homeworks[i].classes;
            var ifChange = false;
            for(var j=0 ; j<homeworks[i].classes.length ; j++){
                var classesInfo = homeworks[i].classes[j];
                if(getRealTime(classesInfo.startTime) > Date.parse(time)/3600000&&classesInfo.status != 'future'){
                    allClass[j].status = 'future';
                    ifChange = true;
                }else if(getRealTime(classesInfo.startTime) <= Date.parse(time)/3600000&&Date.parse(time)/3600000 <getRealTime(classesInfo.deadLine) &&classesInfo.status != 'present'){
                    allClass[j].status = 'present';
                    ifChange = true;
                }else if(Date.parse(time)/3600000 >= getRealTime(classesInfo.deadLine)&&classesInfo.status!='previous'){
                    allClass[j].status = 'previous';
                    ifChange = true;
                }
            }
            if(ifChange){
                Homeworks.update(homeworks[i]._id,{$set : {classes : allClass}});
            }
        }
        
        },1*1000);

    });
}