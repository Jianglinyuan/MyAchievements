Template.allhomework.helpers({
	ifhashomeworks : function(){
		return HomeworkList.find().count();
	},
	homeworks : function(){
		return HomeworkList.find({},{sort : {count : -1}});
	},
	ownHomeWork : function(){
		return this.userId === Meteor.userId();
	},
});

////Template.allhomework.events({
	////'click #delete' : function(e){
		////e.preventDefault();
		////if(confirm('确定删除这条作业吗？')){
			////var currentId = this._id;
			////HomeworkList.remove(currentId);
			////Materialize.toast('作业被删除！',3000,'rounded');
		//}
	//},
//});
