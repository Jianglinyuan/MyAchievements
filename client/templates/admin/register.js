Template.findPassword.events({
    'submit form': function(e){
        e.preventDefault();
        var email = $(e.target).find('[name=email]').val();
        if(!email){
            $('div#error-message').html("Your Email ?");
            Meteor.setTimeout(function () {	
                $('div#error-message').html("");	    
            }, 4000);
        }else{
            Accounts.forgotPassword({email: email},function(error){
                if(error)
                    $('div#error-message').html(error.reason);
                else
                    Router.go('login');
            });
        };

    }
});
Template.register.events({
    'change .upfile': function(e){
        var files = e.target.files;
        var i,f,k,s;
        /* package of huaming:js-xlsx , a wrap package for js-xlsx, which can parse excel like files in the browser.*/
        for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            reader.readAsBinaryString(f);
            reader.onload = function(e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {type: 'binary'});

                /* DO SOMETHING WITH workbook HERE */
                var first_sheet_name = workbook.SheetNames[0];
                /* Get worksheet */
                var worksheet = workbook.Sheets[first_sheet_name];

                var id,data,address_of_cell;
                //console.log(worksheet['!range'].e.r);
                for(k= 2;k<worksheet['!range'].e.r;k++){
                             address_of_cell = "D"+k+"";
                        var studentId = worksheet["A"+k+""].v;
                        var name = worksheet["B"+k+""].v;
                        var email = worksheet["C"+k+""].v;
                        var group = worksheet["D"+k+""].v;                        
                        if(studentId){
                            data = {
                                username: ""+studentId,
                                password: ""+studentId,
                                email: email,
                                profile: {
                                    name: ""+name,
                                    root: "student",
                                    email: email,
                                    group: group,
                                },
                            };
                            Accounts.createUser(data,function(error){
                                if(error)
                                    Materialize.toast("One of the users already exists,Please check it", 3000);
                                else
                                    Materialize.toast("Data insert successfully", 3000);
                            });
                            Meteor.loginWithPassword("123456","admin");
                    };

                };

            };
        }
    },
    'click .adduser': function(){
        var newusercount = $("input#adduser").val();
        var oldcount = $("input.s5").length;
        for(var i=0;i<newusercount;i++){
            var newcount = oldcount+i;
            $("div#userinput").append("<input class='col s5 offset-s1' type='number' id='user"+newcount+"'>");
        };
    },
    'click .submit': function(){
        var choose = $(":selected").val();
        var count = $("input.s5").length;
        var id="",data="";
        for(var i=0;i<count;i++){
            id = $("input#user"+i+"").val();
            data = {
                username: id,//学号
                password: id,//初始密码是学号
                email: "",
                profile: {
                    name: id,
                    root: choose,
                    group: "",
                },
            };
            Accounts.createUser(data,function(error){
                if(error)
                    Materialize.toast("One of the users already exists,Please check it", 3000);
                else
                    Materialize.toast("Data insert successfully", 3000);
            });
            Meteor.loginWithPassword("123456","admin");
        };        	
    }
});

