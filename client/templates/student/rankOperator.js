getOneClassRank = function(hwId,thisScore){
	var thisClassRank = 1;
	var allThisHomeWorkScore = [];
	var allReviewedHomeWorkByHWId = Review.find({homeworkId : hwId, isFinal: true}).fetch();
	for(var j = 0 ; j < allReviewedHomeWorkByHWId.length ; j++){
                allThisHomeWorkScore.push(parseFloat(allReviewedHomeWorkByHWId[j].score));
        };
    for(var k = 0 ; k < allThisHomeWorkScore.length ; k++){
            if(allThisHomeWorkScore[k]>thisScore){
                thisClassRank++;
            }
        };
    return thisClassRank;
};

getOneGroupRank = function(hwId,thisScore,allSameGroupStudentID){
	var thisGroupRank = 1;
	var sameGroupHWScore = [];
	var allReviewedHomeWorkByHWId = Review.find({homeworkId : hwId, isFinal: true}).fetch();
    for(var n = 0 ; n < allReviewedHomeWorkByHWId.length ; n++){
            var id = allReviewedHomeWorkByHWId[n].beReviewed;
            if(allSameGroupStudentID.indexOf(id)!=-1){
                sameGroupHWScore.push(parseFloat(allReviewedHomeWorkByHWId[n].score));
            }
    };
    console.log(sameGroupHWScore);
    for(var l = 0 ; l < sameGroupHWScore.length ; l++){
        if(sameGroupHWScore[l] > thisScore){
            thisGroupRank++;
        }
    };
    return thisGroupRank;
} 