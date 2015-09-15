Homeworks = new Mongo.Collection("homeworks");

Homeworks.allow({
    update : function(userId,homrwork){
        return ownsHomeWork(userId,homrwork);
    },
    remove : function(userId,homrwork){
        return ownsHomeWork(userId,homrwork);
    }
});


