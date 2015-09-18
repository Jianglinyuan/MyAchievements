Homeworkfiles = new FS.Collection("homeworkfiles", {
    stores: [new FS.Store.GridFS("homeworkfiles")],
    filter: {
        allow: {
            extensions: ["rar", "zip", "jpg", "png", "jpeg", "gif", "pdf", "doc"]
        }
    }
});
Homeworkfiles.allow({
    update: function(userId, homrwork) {
        return ownsHomeWork(userId, homrwork);
    },
    remove: function(userId, homrwork) {
        return ownsHomeWork(userId, homrwork);
    },
    insert:function(){
        return true;
    },
    download: function(){
        return true;
    }
});
