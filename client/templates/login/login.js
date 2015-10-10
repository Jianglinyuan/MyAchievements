Template.loginForm.onCreated(function(){
    Session.set("loginError",{});
});

Template.loginForm.helpers({
    errorMessage: function(filed){
        return Session.get('loginError')[filed];
    },
    errorClass: function(filed){
        return Session.get('loginError')[filed] ? 'has-error' : '';
    }
});
Template.loginForm.helpers({
    username: function(){
            return localStorage.username;
    },
    password: function(){
            return localStorage.password;
    },
    check: function(){
            return localStorage.check;
    }
});
Template.loginForm.events({
    'submit form': function(e){
        e.preventDefault();
        var username = $(e.target).find('[name=username]').val();
        var password = $(e.target).find('[name=password]').val();
        var remember = $(e.target).find('[name=remember]');

        var userAttributes = {
            username: username,
            password: password
        };

        var errors = validateUser(userAttributes);
        if (errors.username || errors.password){
            return Session.set('loginError',errors);
        }

        Meteor.loginWithPassword(username,password,function(error){
            if(error){
                Session.set("loginError",{
                    password: "用户名密码错误"});
            }else{
                var user = Meteor.user();
                if (user.profile.root === "admin"){
                    Router.go("admin");
                }else if(user.profile.root === "teacher" || user.profile.root === "assistant"){
                    Router.go("teacher");
                }else if(user.profile.root === "student"){
                    Router.go("student");
                }
                if(remember.is(":checked")){//记住密码
                    localStorage.username=username;
                    localStorage.password=password;
                    localStorage.check=true;
                }else{
                    localStorage.username="";
                    localStorage.password="";
                    localStorage.check=false;
                }
            }
        });
    }
});
Template.findPassword.events({
    'click .email-submit': function(e){
        var email = $("input#email").val();
        if ( !email ){
            alert("请输入邮箱");
        }else {
            var options = {
                email: email,
            };
            Accounts.forgotPassword(options, function(error){
                if (error)
                    alert(error.reason);
                else
                    alert("已发送邮箱，请查收");
            });
        }
    }  
});

validateUser = function(user){
    var errors ={};
    if (!user.username)
        errors.username = "请填写用户名";
    if (!user.password)
        errors.password = "请填写密码"
    return errors;
}
