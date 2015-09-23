var time = new ReactiveVar();
Meteor.setInterval(function(){
    time.set(new Date());
},1*1000);

Template.homeworkItem.helpers({
    ownHomeWork : function(){
        return this.userId === Meteor.userId();
    },
    status : function(){
        if(this.convertStartTime > Date.parse(time.get())/3600000){
            Homeworks.update(this._id,{$set: {state: 'future'}});
        }else if(this.convertStartTime <= Date.parse(time.get())/3600000&&Date.parse(time.get())/3600000 < this.convertToHour){
            Homeworks.update(this._id,{$set: {state: 'present'}});
        }else if(Date.parse(time.get())/3600000 >= this.convertToHour){
            Homeworks.update(this._id,{$set: {state: 'previous'}});
        }
        return this.state;
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

Template.allhomework.helpers({
    ifhashomeworks : function(){
        return Homeworks.find().count();
    },
    homeworks : function(){
        return Homeworks.find({},{sort : {count : -1}});
    },
    
});


