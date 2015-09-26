Homeworks = new Mongo.Collection('homeworks');
Relationship = new Mongo.Collection('relationship');

Relationship.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

Homeworks.allow({
    update : function(){
        return true;
    },
    remove : function(userId,homework){
        return ownsHomeWork(userId,homework);
    }
});

Meteor.methods({
    HomeworkInsert : function(homework){
        check(Meteor.userId(),String);
        check(homework,Object);
        var now = new Date();
        if(homework.convertToHour < Date.parse(now)/3600000)
            return {
                dateError : true,
            }
        if(homework.title==""||homework.url==""||homework.deadDate==""||homework.deadTime==""||homework.startDate==""||homework.startTime==""){
            return {
                inputError : true,
            }
        }
        if(homework.convertToHour <= homework.convertStartTime)
            return {
                spaceError : true,
            }
        var user = Meteor.user();
        var HW = _.extend(homework,{
            userId : user._id,
            author : user.username,
            createDate : new Date(),
            lastModify : new Date(),
        });
        var homeworkId = Homeworks.insert(HW);
        //插入关系表
        var users = Meteor.users.find({'profile.root': 'student'}).fetch();
        var usergroup = [];
        for (var i = 0 ; i < users.length; i++){
            usergroup[i] = users[i].profile.group;
        };
        function onlyUnique(value,index,self){
            return self.indexOf(value) === index;
        };
        var uniUserGroup = usergroup.filter(onlyUnique);//去掉重复值
        var len = uniUserGroup.length;
        var newArr = [];
        //乱序数组
        for (var k = 0 ; k < len ; k++){
            var index = Math.floor(Math.random()*uniUserGroup.length);
            newArr[k] = uniUserGroup[index];
            uniUserGroup.splice(index,1);
        }
        for (var j = 0 ;j < newArr.length; j++){

            if (j === newArr.length-1){

                Relationship.insert({
                    marked: false,
                    homeworkId: homeworkId,
                    reviewerGroup: newArr[j],
                    bereviewedGroup: newArr[0]
                });
            }else{
                
                Relationship.insert({
                    marked: false,
                    homeworkId: homeworkId,
                    reviewerGroup: newArr[j],
                    bereviewedGroup: newArr[j+1],
                });
            }
        };
        console.log(Relationship.find().fetch());
        return {
            _id : homeworkId
        };
    },
});
