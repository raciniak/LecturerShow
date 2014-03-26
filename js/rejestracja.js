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

          if(login.length > 1)
          {
			  
               $.ajax({
                    type: "POST",
                    url: "check_username.php",
                    data: "login=" + login,
                    success : function(msg){
						
                              if(msg == 'OK')
                              {
                              		logarea.style.boxShadow= "0 0 3px 3px #0F3";
									dis_login = true;
							  }
                              else
							  {								
                               		logarea.style.boxShadow= "0 0 3px 3px #F00";
                              }
						
               		},
					error: function(err) {
        console.log(err)
    }
				}); 
			}
     		else
     		{
          		$("#login").addClass("red");
          		$("#status").html('<font color="#cc0000">Za mało znaków</font>');
				logarea.style.boxShadow= "0 0 3px 3px #F00";
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
	 	}
		if(haslo1.length == 0 && haslo2.length == 0) {}
		else
		{
	 		haslo1area.style.boxShadow= "0 0 3px 3px #F00";
			haslo2area.style.boxShadow= "0 0 3px 3px #F00";
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
			
	 	}
		if(haslo1.length == 0 && haslo2.length == 0) {}
		if(haslo1 != haslo2)
		{
	 		haslo1area.style.boxShadow= "0 0 3px 3px #F00";
			haslo2area.style.boxShadow= "0 0 3px 3px #F00";
			
		}
		return false;
	});
	
	/*
	$("#email1").change(function()
     {
          var email1 = $("#email1").val();
		  var msgbox = $("#status");
		  var emailarea = document.getElementById("email1");
		  
          if(email1.length > 1)
          {
               
               $.ajax({
                    type: "POST",
                    url: "check_email.php",
                    data: "email1="+ email1,
                    success: function(msg){
                         $("#status").ajaxComplete(function(event, request){
                              if(msg == 'OK_EMAIL')
                              {
                              		emailarea.style.boxShadow= "0 0 3px 3px #0F3";
                              }
                              else
                              {
                               		emailarea.style.boxShadow= "0 0 3px 3px #F00";
                              }
                    	});
               		}
         	 });

     	}
     else
     {
          $("#email1").addClass("red");
          $("#status").html('<font color="#cc0000">Za mało znaków</font>');
     }
		return false;
     });
	 */
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
			dis_email = true;
	 	}
		if(email1.length == 0 && email2.length == 0) {}
		if(email1 != email2)
		{
	 		email1area.style.boxShadow= "0 0 3px 3px #F00";
			email2area.style.boxShadow= "0 0 3px 3px #F00";
			
		}
		return false;
	});
	  $(document).click(function() 
	  {
        var rejestruj_button = document.getElementById("rejestruj_button")
		if( dis_login == true && dis_password == true && dis_email == true )
		{
			rejestruj_button.disabled = false;
		}
		
    });
	
});