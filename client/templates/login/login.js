Template.login.onRendered(function(){
	$("div.username input").focus(function(){
		$("div.username").css("opacity","1");
		$(this).css("border-bottom","1px solid white");
	});
	$("div.password input").focus(function(){
		$("div.password").css("opacity","1");
	$(this).css("border-bottom","1px solid white");
	});
	$("div.username input").blur(function(){
		$("div.username").css("opacity","0.4");
	$(this).css("border-bottom","1px solid white");
	});
	$("div.password input").blur(function(){
		$("div.password").css("opacity","0.4");
	$(this).css("border-bottom","1px solid white");
	})
});
Template.login.helpers({
	id: function(){
			return localStorage.userId;
	},
	password: function(){
			return localStorage.password;
	},
})
Template.login.events({
	'submit form': function(e){
		e.preventDefault();
		var id = $(e.target).find('[name=id]').val();
		var password = $(e.target).find('[name=password]').val();
		var remember = $(e.target).find('[name=remember]');
		if(id=="" || password==""){
			$('div#error-message').html("用户名或密码不能为空");
			Meteor.setTimeout(function () {	
			$('div#error-message').html("");	    
			  }, 3000);
		}else{
				Meteor.loginWithPassword(id,password,function(error){
					if(error)
						$('div#error-message').html("请检查用户名或密码是否正确");
					else{
						if(id === "123456")
							Router.go('register');
						else
							Router.go('index');
					}
				});
				if(remember.is(":checked")){//记住密码
					localStorage.userId=id;
					localStorage.password=password;
					};
		};
	},
});


Template.register.onRendered(function(){
	 $(document).ready(function(){
    $('ul.tabs').tabs();
  });
	  $(document).ready(function() {
    $('select').material_select();
  });
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

				var id,data,choose,address_of_cell;
				//console.log(worksheet['!range'].e.r);
				for(s= 0;s<3;s++){
							for(k= 1;k<=worksheet['!range'].e.r;k++){
								if(s==0){
										choose = "student";
										address_of_cell= "A"+k+"";
								};
								if(s==1){
									choose = "teacher";
										address_of_cell = "B"+k+"";
								};
								if(s==2){
									choose = "assistant";
										address_of_cell = "C"+k+"";
								};						
							var desired_cell = worksheet[address_of_cell];
							var desired_value = desired_cell.v;
							if(desired_value){
					        	data = {
					                username: ""+desired_value,
					                password: ""+desired_value,
					                email: "",
					                profile: {
					                    name: ""+desired_value,
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