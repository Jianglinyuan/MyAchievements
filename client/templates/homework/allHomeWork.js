Template.allHomeWork.helpers({
	homeworks : function(){
		return Homeworks.find({},{sort : {count : 1}});
	},
	ownHomeWork : function(){
		return this.userId === Meteor.userId();
	}
});

Template.allHomeWork.events({
	'click #delete' : function(e){
		e.preventDefault();
		if(confirm('确定删除这条作业吗？')){
			var currentId = this._id;
			Homeworks.remove(currentId);
			Materialize.toast('作业被删除！',3000,'rounded');

		}
	},
});