
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
Template.homeworkItem.helpers({
    ownHomeWork : function(){
        return this.userId === Meteor.userId();
    },
    hwstate: function(){
        if (this.state === 'present'){
            return "blue darken-4";
        }else if (this.state === "future"){
            return "teal darken-2";
        }else if (this.state === "previous"){
            return "blue-grey";
        }
    }
     
});

