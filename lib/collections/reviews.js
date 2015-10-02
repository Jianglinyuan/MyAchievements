Reviews = new Mongo.Collection("reviews");

Reviews.allow({
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
