$(function() {

  /*$.validator.setDefaults({
    errorClass: 'help-block',
    highlight: function(element) {
      $(element)
        .closest('.form-group')
        .addClass('has-error');
    },
    unhighlight: function(element) {
      $(element)
        .closest('.form-group')
        .removeClass('has-error');
    },
    errorPlacement: function (error, element) {
      if (element.prop('type') === 'checkbox') {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
});*/

$.validator.addMethod('strongPassword', function(value, element) {
	return this.optional(element) 
	|| value.length >= 8
	&& /\d/.test(value)
	&& /[a-z]/i.test(value);
}, '8 characters long and contain at least one number and one char please\'.')

$.validator.addMethod("isUserExists", function(value, element ) {
	

	for (var i = 0; i < users.length; i++) {
			if (value != users[i][0]){
				return value;
			}
		}
		
			
		

	}, "username already exsists.");


	$("#regForm").validate({
		rules: {
			email: {
				required: true,
				email: true, 
			},
			password1: {
				required: true,
				strongPassword: true,
				
			},
			password2: {
				required: true,
				equalTo: '#passwordInput',
				
			},
			firstName: {
				required: true,
				
				lettersonly: true
			},
			lastName: {
				required: true,
				
				lettersonly: true
			}, 
			userName1:{
				required:true,
				isUserExists:true,
				
			},
			birthday:{
				required:true,
				date:true
			}

      
},
messages: {
	email: {
		required: 'Please enter an email address.',
		email: 'Please enter a <em>valid</em> email address.'

	},
	password1: {
		required: 'Please enter password.',
		strongPassword: '8 char, at least 1 # and 1 letter pls'
	},
	password2: {
		required: 'Please enter repeated password.',
		strongPassword: '8 char, at least 1 # and 1 letter pls',
		equalTo: 'unmatch password'

	},
	userName1: {
		required: 'Please enter userName.',
		isUserExists: 'user already exist'
	},
	firstName: {
		required: 'Please enter firstName.'
	},
	lastName: {
		required: 'Please enter lastName.'
	},
	birthday: {
		required: 'Please enter valid BOD.',		
	},

}


});

});
