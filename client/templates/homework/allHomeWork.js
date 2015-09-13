Template.allHomeWork.helpers({
	homeworks : function(){
		return HomeworkList.find({},{sort : {count : 1}});
	},
	ownHomeWork : function(){
		return this.userId === Meteor.userId();
	},
	// autostate : function(){ return setInterval(function(){
	// 		if(this.convertTohour > Date.parse(new Date())){
	// 			console.log('时间差 ：'+this.convertTohour+" - "+Date.parse(new Date()));
	// 			// Homeworks.update(this._id,{$set : {state : 'present'}});
	// 			return 'present'+new Date();
	// 			}
	// 		else
	// 			return 'privious'+new Date();
	// 	},2000);
	// }
});

Template.allHomeWork.events({
	'click #delete' : function(e){
		e.preventDefault();
		if(confirm('确定删除这条作业吗？')){
			var currentId = this._id;
			HomeworkList.remove(currentId);
			Materialize.toast('作业被删除！',3000,'rounded');

		}
	},
});