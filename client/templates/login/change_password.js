Template.changePassword.events({
  'submit form': function(e){
    e.preventDefault();
    var oldPassword = $(e.target).find('[name=oldPassword]').val();
    var newPassword = $(e.target).find('[name=newPassword]').val();
    var newPassword2 = $(e.target).find('[name=newPassword2]').val();
    if(newPassword != newPassword2){
          $('div#error-message').html("The two password do not match!");
          $('input#password2').val("");
    }else{
         Accounts.changePassword(oldPassword,newPassword,function(error){
          if(error)
            $("div#error-message").html(error.reason);
          else
            $("div#error-message").html("密码修改成功，您的新密码是："+newPassword);
         });
    }
  }
});