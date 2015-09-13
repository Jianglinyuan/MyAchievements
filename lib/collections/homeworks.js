Homeworks = new Mongo.Collection("homeworks");

Homeworks.allow({
	update : function(){
		return true;
	},
	insert : function(){
		return true;
	}
});

