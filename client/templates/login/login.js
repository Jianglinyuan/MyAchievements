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
			$('div#error-message').html("<i class='material-icons red-text'>volume_up</i>&nbsp;Every space needs to be filled!");
			Meteor.setTimeout(function () {	
			$('div#error-message').html("");	    
			  }, 3000);
		}else{
				Meteor.loginWithPassword(id,password,function(error){
				if(error)
					$('div#error-message').html("<i class='material-icons red-text'>volume_up</i>&nbsp;"+error.reason);
				else 
					Router.go('index');
				});
				if(remember.is(":checked")){//记住密码
					localStorage.userId=id;
					localStorage.password=password;
					};
		};
	},
});




Template.register.onRendered(function(){
			 while(Tmp.find().count()){
				var tmp = Tmp.findOne();
				Tmp.remove(tmp._id);
			};
});
Template.register.helpers({
	default: function(){
		var tmp = Tmp.findOne();
		if(tmp)
			return tmp.url;
		else
			return "./default.jpeg";
	}
});
Template.register.events({
	'click .camera': function(){
		/*点击照相机进行拍照，使用了camera package*/
		if(Tmp.find().count()){
			var tmp = Tmp.findOne();
			Tmp.remove(tmp._id);
		}
		var options={
			width: '100px',
			height: '100px',
			quality: '100',
		};
		MeteorCamera.getPicture([options],function(error,data){
			if(!data)
				data = "./default.jpeg";
				var url={
					url: data,
				};	
			Tmp.insert(url);
			$("img#tmpImg").attr("src",data).show();
		});
	},
	'change .myFileInput': function(event,template) {
		/*点击上传图片，使用了cfs package*/
				
	    var files = event.target.files;
	    for (var i = 0, ln = files.length; i < ln; i++) {
		    var img =  Images.insert(files[i], function (err, fileObj) {
		        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
		       	  // console.log(fileObj.url().uploading);	 
		      });
			
	   	 };
	   	  var url = "/cfs/files/images/"+img._id+"/"+img.name();
	   			if(!img)
					var data = "./default.jpeg";
				else
					var data = url;	
				
				Tmp.insert({url:data});
				$("div#alert").html("This Photo '<span class='red-text'>"+img.name()+"</span>' has been uploaded successfully!");
				Meteor.setTimeout(function () {	
					$('div#alert').html("");	    
					  }, 4000);
				 
 	 },
 	 'click .with-gap':function(){
 	 	var power = $("input[type=radio]:checked").val();
 	 	if(power == "teacher")
 	 		$("label.changeId")[0].innerHTML = "Teacher Id";
 	 	else
 	 		$("label.changeId")[0].innerHTML = "Student Id";
 	 },
	'blur .password2': function(){
		var value1 =$('input#password').val();
		var value2 =$('input#password2').val();
		if(value1 != value2){
					$('div#error-password2').html("<i class='material-icons red-text'>volume_up</i>&nbsp;The two password do not match!");
					$('input#password2').val("");
		}else
			$('div#error-password2').html("");
	},
	'submit form': function(e){
		e.preventDefault();

		var username = $(e.target).find('[name=username]').val();
		var password = $(e.target).find('[name=password]').val();
		var password2 = $(e.target).find('[name=password2]').val();
		var id = $(e.target).find('[name=id]').val();
		var email = $(e.target).find('[name=email]').val();
		if(username=="" || password=="" || id=="" || email==""){
			$('div#error-message').html("<i class='material-icons red-text'>volume_up</i>&nbsp;Every space needs to be filled！");
			Meteor.setTimeout(function () {	
			$('div#error-message').html("");	    
			  }, 4000);
		}else if(password != password2){
			$('div#error-password2').html("<i class='material-icons red-text'>volume_up</i>&nbsp;The two password do not match!");
					$('input#password2').val("");
		}else{
			var tmp = Tmp.findOne();
			if(tmp)
				var url = tmp.url;
			else
				var url = "./default.jpeg";
			var data = {
				username: username,
				password: password,
				email: email,
				profile: {
					id: id,
					power: $(e.target).find('[name=power]:checked').val(),
					headSculpture: url,
				}
			};

			Accounts.createUser(data,function(error){
				if(error){
					switch(error.reason){
						case "Email already exists.":{
									$('div#error-email').html("<i class='material-icons red-text'>volume_up</i> Email ' "+email+" ' already exists!");
									Meteor.setTimeout(function () {	
									$('div#error-email').html("");	    
									  }, 4000);
									break;
							}
						case "Username already exists.":{
									$('div#error-username').html("<i class='material-icons red-text'>volume_up</i> Username '"+username+"' already exists!");
									Meteor.setTimeout(function () {	
									$('div#error-username').html("");	    
									  }, 4000);
							}
					}
				}else{
										Router.go('index');}
			});
		};
	},
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