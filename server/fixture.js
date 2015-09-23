if(Meteor.users.find().count() === 0){
    var date = new Date().toDateString();
    var data1 = {
        username: "admin",
        password: "admin123456",
        email: "sysulz19920512@163.com",
        profile:{
            name: "admin",
            root: "admin",
            group: ""
        }
    };
    Accounts.createUser(data1);
}
