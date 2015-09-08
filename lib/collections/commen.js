Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images")]
});
Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  }
});