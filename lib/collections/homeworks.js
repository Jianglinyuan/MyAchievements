Homeworks = new Mongo.Collection("homeworks");
Relationship = new Mongo.Collection("relationship");

Homeworks.allow({
    insert: function(){
        if ( Meteor.user().profile.root === "teacher" )
            return true;
        else
            return false;
    },

    update: function(){
        if ( Meteor.user().profile.root === "teacher" )
            return true;
        else
            return false;
    },
    remove: function(){
        return true;
    }
});

Meteor.methods({

    HomeworkInsert: function(homework){
        check(homework, Object);

        var homeworkId = Homeworks.insert(homework);

        randomRelationship(1,homeworkId);
        randomRelationship(2,homeworkId);

        return {
            _id: homeworkId
        };
    }
});

randomRelationship = function(classNum,homeworkId){
    this.classNum = classNum;
    this.homeworkId = homeworkId;

    var classUsers = Meteor.users.find({
        'profile.root': 'student',
        'profile.classNum': classNum 
    }).fetch();

    //get unique user group
    var userGroup = [];
    for ( var i = 0 ; i < classUsers.length ; i++ ){
        userGroup[i] = classUsers[i].profile.group;
    };
    function onlyUnique(value,index,self){
        return self.indexOf(value) === index;
    };
    var uniqueUserGroup = userGroup.filter(onlyUnique);

    //get random array
    var len = uniqueUserGroup.length; 
    var randomArr = [];
    for ( var j = 0 ; j < len ; j++ ){
        var index = Math.floor(Math.random() * uniqueUserGroup.length);
        randomArr[j] = uniqueUserGroup[index];
        uniqueUserGroup.splice(index,1);
    };

    //get the relationship
    for ( var k = 0 ; k < randomArr.length ; k++ ){
        if ( k === randomArr.length-1 ){
            Relationship.insert({
                homeworkId: homeworkId,
                classNum: classNum,
                reviewerGroup: randomArr[k],
                reviewedGroup: randomArr[0]
            });
        }else{
            Relationship.insert({
                homeworkId: homeworkId,
                classNum: classNum,
                reviewerGroup: randomArr[k],
                reviewedGroup: randomArr[k+1]
            });
        }
    };
}

