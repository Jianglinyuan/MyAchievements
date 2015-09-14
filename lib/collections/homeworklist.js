HomeworkList = new Mongo.Collection('homeworklist');

HomeworkList.allow({
	update : function(userId,homrwork){
		return ownsHomeWork(userId,homrwork);
	},
	remove : function(userId,homrwork){
		return ownsHomeWork(userId,homrwork);
	}
});

Meteor.methods({
	HomeworkListInsert : function(homework,users){
		check(Meteor.userId(),String);
		check(homework,Object);
        //check(users,Object);
		var now = new Date();
		if(homework.convertToHour < Date.parse(now)/3600000)
			return {
				dateError : true,
			}
		if(homework.title==""||homework.url==""||homework.deadDate==""||homework.deadTime==""){
			return {
				inputError : true,
			}
		}
		var user = Meteor.user();
		var HW = _.extend(homework,{
			userId : user._id,
			author : user.username,
			createDate : new Date(),
			lastModify : new Date(),
		});
		var homeworklistId = HomeworkList.insert(HW);
        for(var i = 0 ; i < users.length ; i++){
            Homeworks.insert({
                homeworklistId:homeworklistId,
                userId: users[i]._id,
                state: 'submit'
            });
        }
		return {
			_id : homeworklistId
		};
	}
    //HomeworkListUpdate : function(homeworklistId,homework){
        //check(homeworklistId,String);
        //check(homework, Object);
        //var now = new Date();
        //if(homework.convertToHour < Date.parse(now)/3600000)
            //return {
                //dateError : true,
            //}
        //if(homework.title==""||homework.url==""||homework.deadDate==""||homework.deadTime==""){
            //return {
                //inputError : true,
            //}
        //}
        //HomeworkList.update(homeworklistId,{$set: homework});
    /*}*/
});
