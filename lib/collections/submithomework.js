subHomeworks = new FS.Collection("subhomeworks", {
  stores: [new FS.Store.GridFS("subhomeworks", {path: "~/uploads"})],
  filter:{
  	allow:{
  		extensions:["rar","zip"]
  	}
  }
});
