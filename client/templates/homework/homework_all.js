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
    },
    isFuture: function(){
        if (this.state === 'future'){
            return true;
        }else{
            return false;
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


