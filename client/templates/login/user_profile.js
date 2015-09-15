Template.userProfile.helpers({
	user: function(){
		return Meteor.user();
	},
	email: function(){
		return Meteor.user().profile.email;
	}
});
Template.userProfile.events({
	'click .change': function(){
		var name = $("input#name").val();
		var group = $("input#group").val();
		var email = $("input#email").val();
		var data ={
			'profile.name':name,
			'profile.group':group,
			'profile.email':email,
		};
		Meteor.users.update(Meteor.user()._id,{$set:data},function(error){
			if(error)
				Materialize.toast(error.reason, 3000);
			else
				Materialize.toast("profile has been changed!", 3000);
		});
	}
});