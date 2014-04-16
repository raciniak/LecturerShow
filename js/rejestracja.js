var dis_login = false;
var dis_password = false;
var dis_email = false;	

$(document).ready(function()
{
     $("#login").change(function()
     {
          var login = $("#login").val();
		  var msgbox = $("#status");
		  var logarea = document.getElementById("login");
		 
          if(login.length > 5)
          {
			  
               $.ajax({
                    type: "POST",
                    url: "php/check_username.php",
                    data: "login=" + login,
                    success : function(msg){
                              if(msg == 'OK')
                              {
                              		logarea.style.boxShadow= "0 0 3px 3px #0F3";
                              		document.getElementById("login_error").innerHTML = "";
									dis_login = true;
							  }
                              else
							  {								
                               		logarea.style.boxShadow= "0 0 3px 3px #F00";
                               		document.getElementById("login_error").innerHTML = "Podany login jest już zajęty!";
                              }
						
               		},
					error: function(err) {
        				console.log(err);
    				}
				}); 
			}
     		else
     		{
				logarea.style.boxShadow= "0 0 3px 3px #F00";
				document.getElementById("login_error").innerHTML = "Podany login jest za krótki!";
				
     		}
		return false;
     });
	
	$("#haslo1").change(function()
	{
		 
		var haslo1 = $("#haslo1").val();
		
		var haslo1area = document.getElementById("haslo1");
		
		if(haslo1.length > 5)
	 	{
			haslo1area.style.boxShadow= "0 0 3px 3px #0F3";
		 	haslo2area.style.boxShadow= "0 0 3px 3px #0F3";
		 	document.getElementById("password_error").innerHTML = "";
	 	}
	 	if(haslo1.length < 6 && haslo1.length > 0)
	 	{
	 		document.getElementById("password_error").innerHTML = "Hasło jest za krótkie!";
	 	}
		if(haslo1.length == 0 && haslo2.length == 0) {}
		else
		{
	 		haslo1area.style.boxShadow= "0 0 3px 3px #F00";
			haslo2area.style.boxShadow= "0 0 3px 3px #F00";
			document.getElementById("password_error").innerHTML = "Hasło jest za krótkie!";
		}
		return false;
	});
	
	$("#haslo2").change(function()
	{
		var haslo1 = $("#haslo1").val();
		var haslo2 = $("#haslo2").val();
		var haslo1area = document.getElementById("haslo1");
		var haslo2area = document.getElementById("haslo2");	
		if(haslo1 == haslo2)
	 	{
			haslo1area.style.boxShadow= "0 0 3px 3px #0F3";
		 	haslo2area.style.boxShadow= "0 0 3px 3px #0F3";
			dis_password = true;
			document.getElementById("password_error").innerHTML = "";
	 	}
		if(haslo1.length == 0 && haslo2.length == 0) {}
		if(haslo1 != haslo2)
		{
	 		haslo1area.style.boxShadow= "0 0 3px 3px #F00";
			haslo2area.style.boxShadow= "0 0 3px 3px #F00";
			document.getElementById("password_error").innerHTML = "Hasła są różne!";
		}
		return false;
	});

	$("#email1").change(function()
	{
		
		var email1 = $("#email1").val();
		var email2 = $("#email2").val();
		var email1area = document.getElementById("email1");
		var email2area = document.getElementById("email2");
		var rejestruj_button = document.getElementById("rejestruj_button");
		
		var test_email = /^([A-Za-z0-9\-]*\w)+@+([A-Za-z0-9\-]*\w)+(\.[A-Za-z]*\w)+$/;
		var wynik = email1.match(test_email);
		if(wynik == null)
		{
			document.getElementById("email_error").innerHTML = "To nie jest format adresu e-mail!";
		}
		else {
		$.ajax({
                    type: "POST",
                    url: "php/check_email.php",
                    data: "email1=" + email1,
                    success : function(msg){
								
                              if(msg == 'OK')
                              {
                              	
                              		email1area.style.boxShadow= "0 0 3px 3px #0F3";
                              		document.getElementById("email_error").innerHTML = "";
									dis_email = true;
							  }
                              if(msg == 'ZAJETY')
							  {				
							  				
                               		email1area.style.boxShadow= "0 0 3px 3px #F00";
                               		document.getElementById("email_error").innerHTML = "Podany e-mail jest już używany!";
                              }
						
               		},
					error: function(err) {
        				console.log(err);
    				}
				});
		if(email1 == email2)
	 	{
			email1area.style.boxShadow= "0 0 3px 3px #0F3";
		 	email2area.style.boxShadow= "0 0 3px 3px #0F3";
		 	document.getElementById("email_error").innerHTML = "";
			dis_email = true;
	 	}
		if(email1.length == 0 && email2.length == 0) {}
		
		return false;
		}
	});
	 $("#email2").change(function()
	{
		var email1 = $("#email1").val();
		var email2 = $("#email2").val();
		var email1area = document.getElementById("email1");
		var email2area = document.getElementById("email2");
		var rejestruj_button = document.getElementById("rejestruj_button");
		
		if(email1 == email2)
	 	{
			email1area.style.boxShadow= "0 0 3px 3px #0F3";
		 	email2area.style.boxShadow= "0 0 3px 3px #0F3";
		 	document.getElementById("email_error").innerHTML = "";
			dis_email = true;
	 	}
		if(email1.length == 0 && email2.length == 0) {}
		if(email1 != email2)
		{
	 		email1area.style.boxShadow= "0 0 3px 3px #F00";
			email2area.style.boxShadow= "0 0 3px 3px #F00";
			document.getElementById("email_error").innerHTML = "Adresy e-mail są różne!";
			
		}
		return false;
	});
	  $(document).click(function() 
	  {
        var rejestruj_button = document.getElementById("rejestruj_button");
		if(dis_login == true && dis_password == true && dis_email == true )
		{
			rejestruj_button.disabled = false;
		}
		
    });
	
});
