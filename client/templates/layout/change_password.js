Template.changePassword.onRendered(function(){
    Session.set("changePasswordError",{});
});
Template.changePassword.helpers({
    errorClass: function(obj){
        return Session.get("changePasswordError")[obj] ? "has-error" : "";
    },
    errorMessage: function(obj){
        return Session.get("changePasswordError")[obj];
    }
});
Template.changePassword.events({
    'submit form': function(e){
        e.preventDefault();
        var oldpassword = $(e.target).find("[name=oldpassword]").val();
        var newpassword = $(e.target).find("[name=newpassword]").val();
        var newpassword_ag = $(e.target).find("[name=newpassword-ag]").val();
        var errors = {};
        if (newpassword !== newpassword_ag){
            errors.newpassword_ag = "两次密码不相同，请重新输入";
            return Session.set("changePasswordError",errors);
        }
        Accounts.changePassword(oldpassword, newpassword,function(error){
            if (error){
                errors.oldpassword = "密码错误";
                return Session.set("changePasswordError",errors);
            }
            else
                alert("密码修改成功!");
        });
    }
});

