Meteor.publish("achievements",function(){
    return Achievements.find();
});
Meteor.publish("homeworks",function(){
    return Homeworks.find();
});
Meteor.publish("singlehomework",function(homeworkId){
    return Homeworks.find(homeworkId);
});

Meteor.publish('HomeworkList',function(){
	return HomeworkList.find();
});
Meteor.publish('singlehomeworklist',function(homeworklistId){
	return HomeworkList.find(homeworklistId);
})

Meteor.publish('tmp',function(){
	return Tmp.find();
});
Meteor.publish('images',function(options){
	return Images.find();
});
Meteor.publish("subhomeworks",function(){
	return subHomeworks.find({});
});
