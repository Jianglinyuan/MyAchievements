if (Meteor.users.find().count() === 0){
    var admin = {
        username: "admin",
        password: "admin",
        email: "sysulz19920512@163.com",
        profile: {
            name: "admin",
            root: "admin"
        }
    };
    Accounts.createUser(admin);
}
