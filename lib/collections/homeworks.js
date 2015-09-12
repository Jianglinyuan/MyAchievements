Homeworks = new Mongo.Collection("homeworks");

Homeworks.allow({
	update : function(userId,homrwork){
		return ownsHomeWork(userId,homrwork);
	},
	remove : function(userId,homrwork){
		return ownsHomeWork(userId,homrwork);
	}
});

Meteor.methods({

	homeWorksInsert : function(homework){
		check(Meteor.userId(),String);
		check(homework , Object);
		var now = new Date();
		// console.log("时间差是 ： "+homework.convertTohour+" - "+Date.parse(now)/3600000);
		if(homework.convertTohour < Date.parse(now)/3600000)
			return {
				dateError : true,
			}
		if(homework.title==""||homework.url==""||homework.deadline==""||homework.deadtime==""){
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

		var homeworkId = Homeworks.insert(HW);

		return {
			_id : homeworkId
		};
	},

});
