Template.loginForm.events({
    'submit form': function(e){
        e.preventDefault();
        var username = $(e.target).find('[name=username]').val();
        var password = $(e.target).find('[name=password]').val();
        var remember = $(e.target).find('[name=remember]');
        console.log(remember);
        if (username === "" || password === ""){
            $('div#error-message').html("用户名密码不能为空");
            Meteor.setTimeout(function(){
                $('div#error-message').html("");
            },3000);
        }else{

            Meteor.loginWithPassword(username,password,function(error){
                if(error){
                    $('div#error-message').html("请检查用户名和密码是否正确");
                }else{
                    var user = Meteor.users.findOne({username: username});
                    if (user.profile.root === "admin"){
                        Router.go('admin');
                    }else if(user.profile.root === "teacher" || user.profile.root === "assistan"){
                        Router.go('teacher');
                    }else if(user.profile.root === "student"){
                        Router.go('student');
                    }
                }
            });

            if(remember.is(":checked")){
                //这里处理记住密码操作
            };

        }
    }
});
