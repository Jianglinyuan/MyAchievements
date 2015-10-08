Meteor.startup(function () {
    smtp = {
        username: 'myachievements2015@163.com',
        password: 'jiabyxpqrjxqjsdx', //授权密码
        server: 'smtp.163.com',
        port: 465
    };
    // process.env.MAIL_URL = 'smtp://MY_MANDRILL_EMAIL:MY_MANDRILL_API_KEY@smtp.mandrillapp.com:587/';
    process.env.MAIL_URL = 'smtp://'+encodeURIComponent(smtp.username)+':'+encodeURIComponent(smtp.password)+'@'+encodeURIComponent(smtp.server)+':'+smtp.port+'/';

    Accounts.emailTemplates.from = 'myachievements2015@163.com';
    Accounts.emailTemplates.resetPassword.subject = function(user){
        return "MyAchievements resetPassword";
    };
    Accounts.emailTemplates.resetPassword.text = function(user,url){
        var text = "，你好！\n\n请在新窗口打开下面链接重置密码：\n\n"+url+"\n\n谢谢使用MyAchievements！";
        return user.profile.name+text;
    };
});

