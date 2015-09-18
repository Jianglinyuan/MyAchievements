if(Meteor.users.find().count() === 0){
    var date = new Date().toDateString();
    var data1 = {
        username: "admin",
        password: "admin123456",
        email: "sysulz19920512@163.com",
        profile:{
            name: "admin",
            root: "admin",
            date: date,
            email: "sysulz19920512@163.com",
            group: ""
        }
    };
    var data2 = {
        username: "teacher",
        password: "teacher",
        email: "nima19920512@163.com",
        profile: {
            name: "林桢",
            root: "assistan",
            date: date,
            email: "nima19920512@163.com",
            group: ""
        }
    };
    var data3 = {
        username: "student",
        password: "student",
        email: '234346353@qq.com',
        profile: {
            name: "林桢同学",
            root: "student",
            date: date,
            email: '234346353@qq.com',
            group: 1
        }
    };
    var data4 = {
        username: "student2",
        password: "student2",
        email: "test@test.com",
        profile: {
            name: "蒋林源",
            root: "student",
            date: date,
            email: "test@test.com",
            group: 1
        }
    };
    Accounts.createUser(data1);
    Accounts.createUser(data2);
    Accounts.createUser(data3);
    Accounts.createUser(data4);
}
