
var time = new ReactiveVar();
Meteor.setInterval(function(){
    time.set(new Date());
},1*1000);


Template.allhomework.helpers({
    ifhashomeworks : function(){
        console.log(HomeworkList.find().count());
        return HomeworkList.find().count();
    },
    homeworks : function(){
        return HomeworkList.find({},{sort : {count : -1}});
    },
    ownHomeWork : function(){
        return this.userId === Meteor.userId();
    },
    status : function(){
        if(this.convertStartTime > Date.parse(time.get())/3600000)
            HomeworkList.update(this._id,{$set : {state : 'future'}});
        if(this.convertStartTime<Date.parse(time.get())/3600000&&Date.parse(time.get())/3600000<this.convertToHour)
            HomeworkList.update(this._id,{$set : {state : 'present'}});
        if(Date.parse(time.get())/3600000 > this.convertToHour)
            HomeworkList.update(this._id,{$set : {state : 'previous'}});
        return this.state;
    }
});

