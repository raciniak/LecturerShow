var pokazane = false;
function pokaz_panel()
{	
	var panel = document.getElementById("panel_logowania");
	var loguj_button = document.getElementById("logowanie_link");
		if(pokazane == false)
		{
			panel.style.visibility = "visible";
			loguj_button.value = "Ukryj";
			pokazane = true;
		}
		else
		{
			panel.style.visibility = "hidden";
			loguj_button.value = "Logowanie";
			pokazane = false;
		}
}
function pokaz_alert()
{
	alert('no co tam ? ');	
}