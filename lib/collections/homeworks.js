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
    remove : function(userId,homrwork){
        return ownsHomeWork(userId,homrwork);
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
        for (var j = 0 ;j < uniUserGroup.length; j++){
            Relationship.insert({
                marked: false,
                homeworkId: homeworkId,
                reviewerGroup: uniUserGroup[j],
                bereviewedGroup: 0,
            });
        };
        return {
            _id : homeworkId
        };
    },
});
