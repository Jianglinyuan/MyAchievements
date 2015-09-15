if(Meteor.users.find().count() === 0){
    var date = new Date().getTime();
    var data1 = {
        username: "admin",
        password: "admin123456",
        profile:{
            name: "admin",
            root: "admin",
            email: "sysulz19920512@163.com",
            date: date,
            group: ""
        }
    };
    var data2 = {
        username: "teacher",
        password: "teacher",
        profile: {
            name: "林桢",
            root: "assistan",
            email: "nima19920512@163.com",
            date: date,
            group: ""
        }
    };
    var data3 = {
        username: "student",
        password: "student",
        profile: {
            name: "林桢同学",
            root: "student",
            email: '234346353@qq.com',
            date: date,
            group: 1
        }
    };
    Accounts.createUser(data1);
    Accounts.createUser(data2);
    Accounts.createUser(data3);
}
