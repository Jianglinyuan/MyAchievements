if(Meteor.users.find().count() === 0){
    var date = new Date().toDateString();
    var data1 = {
        username: "admin",
        password: "admin123456",
        email: "sysulz19920512@163.com",
        profile:{
            name: "admin",
            root: "admin",
            group: ""
        }
    };
    Accounts.createUser(data1);
}

Meteor.methods({
    serverTime : function(){
        return new Date();
    }
});

var changeState = function(object,time){
    if(object.convertStartTime > Date.parse(time.get())/3600000&&object.state != 'future'){
            Homeworks.update(object._id,{$set: {state: 'future'}});
            console.log(object._id+" change1 "+object.state+"  "+object.convertStartTime);
        }else if(object.convertStartTime <= Date.parse(time.get())/3600000&&Date.parse(time.get())/3600000 < object.convertToHour&&object.state != 'present'){
            Homeworks.update(object._id,{$set: {state: 'present'}});
            console.log(object._id+" change2 "+object.state);
        }else if(Date.parse(time.get())/3600000 >= object.convertToHour&&object.state != 'previous'){
            Homeworks.update(object._id,{$set: {state: 'previous'}});
            console.log(object._id+" change3 "+object.state);
        }
}

if(Meteor.isServer){
    Meteor.startup(function(){

        var time = new ReactiveVar();

        Meteor.setInterval(function(){

        time.set(Meteor.call('serverTime'));

        var homeworks = Homeworks.find().fetch();
        
        for(var i=0;i<homeworks.length;i++){

        object = homeworks[i];
        changeState(object,time)

        }
        },1*1000);

    });
}