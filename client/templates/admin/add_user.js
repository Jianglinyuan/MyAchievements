Template.addUser.onCreated(function(){
    Session.set("addUserErrors",{});
});
Template.addUser.helpers({
    errorMessage: function(filed){
        return Session.get("addUserErrors")[filed];
    },
    errorClass: function(filed){
        return Session.get("addUserErrors")[filed] ? "has-error" : "";
    }
});
Template.addUser.events({
    'click .which': function(){
        var checked = $("input:checked").val();
        if ( checked === "student" )
            $("div#student-info").show();
        else
            $("div#student-info").hide();
    },

    'click .submit': function(){
        var root = $("input:checked").val();
        var username = $("input#username").val();
        var password = $("input#password").val();
        var name = $("input#name").val();
        var email = $("input#email").val();
        if ( root === "student" ){
            var classNum = parseInt($("#classNum").val());
            var group = parseInt($("input#group").val());
            var data = {
                username: username,
                password: password,
                email: email,
                profile: {
                    name: name,
                    root: root,
                    classNum: classNum,
                    group: group
                }
            };
        }else{
            var data = {
                username: username,
                password: password,
                email: email,
                profile: {
                    name: name,
                    root: root,
                }
            };
        }

        var errors = validateAddUser(data);
        if ( errors.username || errors.password || errors.email || errors.name ){
            return Session.set("addUserErrors", errors);
        }

        Accounts.createUser(data,function(error){
            if ( error ){
                //...
            }else{
                alert("用户插入成功");
                //跳转到所有用户界面
                $('#myTabs a[href="#alluser"]').tab('show');
            }
        });
        Meteor.loginWithPassword("admin","admin");
    },

    'click .excel-submit': function(){
        var file = $("input[name=upfile]")[0].files[0];
        var k,s;
        var reader = new FileReader();
        var name = file.name;
        var classValue = parseInt($("#classValue").val());
        console.log(classValue);
        reader.readAsBinaryString(file);
        reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {type: 'binary'});

            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];

            var id,data,address_of_cell;
            var cell = 2;
            while(worksheet["A"+cell+""].v != null){
                var studentId = worksheet["A"+cell+""].v;
                var name = worksheet["B"+cell+""].v;
                var email = worksheet["C"+cell+""].v;
                var group = worksheet["D"+cell+""].v;                        
                if(studentId){
                    var  data = {
                        username: ""+studentId,
                        password: ""+studentId,
                        email: email,
                        profile: {
                            name: ""+name,
                            root: "student",
                            group: group,
                            classNum: classValue
                        },
                    };
                    Accounts.createUser(data);
                    Meteor.loginWithPassword("admin","admin");
                    cell++;
                };
            };
        };
        alert("用户导入成功");
        $('#myTabs a[href="#alluser"]').tab('show');
    }
});

alreadyExist = function(user){
    this.username = user.username;
    if ( Meteor.users.findOne({username: username}) )
        return true;
    else 
        return false;
};
validateAddUser = function(user){
    var errors = {}
    if ( !user.username )
        errors.username = "请输入用户名";
    else if ( alreadyExist(user) )
        errors.username = "用户已存在";
    if ( !user.password )
        errors.password = "请输入密码";
    if ( !user.email )
        errors.email = "请输入邮箱";
    if ( !user.profile.name )
        errors.name = "请输入姓名";
    return errors;
};
