HomeworkFiles = new FS.Collection("homeworkfiles", {
    stores: [new FS.Store.GridFS("homeworkfiles")],
    filter: {
        allow: {
            extensions: ["rar", "zip", "jpg", "png", "jpeg", "gif", "pdf", "doc"]
        }
    }
});
HomeworkFiles.allow({
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    insert: function(){
        return true;
    },
    download: function(){
        return true;
    }
});
