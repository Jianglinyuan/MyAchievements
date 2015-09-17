ownsHomeWork = function(userId,doc){
	return doc && (doc.userId === userId || doc.metadata.userId === userId);
}
