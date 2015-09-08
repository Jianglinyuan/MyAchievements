if (Homeworks.find().count() === 0){
    Homeworks.insert({
        title: "工作流原理",
        url: "http://my.ss.sysu.edu.cn/wiki/display/SPSP/SE-386+Software+Process+Improvement+Home",
        state: "present",
        count: 1
    });
    Homeworks.insert({
        title: "数据库管理",
        url: "http://my.ss.sysu.edu.cn/wiki/display/SPSP/SE-386+Software+Process+Improvement+Home",
        state: "previous",
        count: 2
    });
    Homeworks.insert({
        title: "高级数据库管理",
        url: "http://my.ss.sysu.edu.cn/wiki/display/SPSP/SE-386+Software+Process+Improvement+Home",
        state: "future",
        count: 3
    });
}
