var dis_password = false;
var dis_email = false;	

$(document).ready(function()
{
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
		if( dis_password == true && dis_email == true )
		{
			rejestruj_button.disabled = false;
		}
		
    });
	
});