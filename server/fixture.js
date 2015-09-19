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
    var data2 = {
        username: "teacher",
        password: "teacher",
        email: "nima19920512@163.com",
        profile: {
            name: "林桢",
            root: "assistan",
            group: ""
        }
    };
    var data3 = {
        username: "15214181",
        password: "15214181",
        email: '234346353@qq.com',
        profile: {
            name: "林桢",
            root: "student",
            group: "1"
        }
    };
    var data4 = {
        username: "15123456",
        password: "15123456",
        email: "test@test.com",
        profile: {
            name: "蒋林源",
            root: "student",
            group: "1"
        }
    };
    var data5 = {
        username: '15214182',
        password: '15214182',
        email: 'test1@test.com',
        profile: {
            name: '钟炎',
            root: 'student',
            group: "2"
        }
    };
    Accounts.createUser(data1);
    Accounts.createUser(data2);
    Accounts.createUser(data3);
    Accounts.createUser(data4);
    Accounts.createUser(data5);
}
