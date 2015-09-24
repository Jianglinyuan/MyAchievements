Template.addUser.events({
    'click .with-gap': function(){
        var checked = $(":checked").val();
        if(checked === "student")
            $("div#register-group").show();
        else
            $("div#register-group").hide();
    },
    'click .excel-submit': function(){
        var file = $("input[name=upfile]")[0].files[0];
        var k,s;
        /* package of huaming:js-xlsx , a wrap package for js-xlsx, which can parse excel like files in the browser.*/
            var reader = new FileReader();
            var name = file.name;
            reader.readAsBinaryString(file);
            reader.onload = function(e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {type: 'binary'});

                /* DO SOMETHING WITH workbook HERE */
                var first_sheet_name = workbook.SheetNames[0];
                /* Get worksheet */
                var worksheet = workbook.Sheets[first_sheet_name];

                var id,data,address_of_cell;
                console.log(workbook);
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
                            Meteor.loginWithPassword("admin","admin123456");
                            cell++;
                    };

                };

            };
    },
    'click .submit': function(){
        var root = $(":checked").val();
        var username = $("input#username").val();
        var name = $("input#name").val();
        var password = $('input#password').val();
        var email = $("input#email").val();
        var group;
        if(root === "student")
            group = parseInt($("input#group").val());
        else
            group = "";
        var data = {
            username: username,//学号
            password: password,
            email: email,
            profile: {
                name: name,
                root: root,
                group: group,
            },
        };
        Accounts.createUser(data,function(error){
            if(error)
                Materialize.toast(error.reason, 3000);
            else
                Materialize.toast("Data insert successfully", 3000);
        });
        Meteor.loginWithPassword("admin","admin123456");       	
    }
});
