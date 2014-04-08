function searchSuggest(){
var str = escape(document.getElementById('searchinput').value);
var myAjax = new Ajax.Request(
      'php/suggest.php',
      {
         method: 'get',
         parameters: "search="+str,
         onComplete: showResponse,
         onFailure: showAlert
      });
               
}
function showResponse(text){
       
        var search_suggest = document.getElementById("search_suggest");
        search_suggest.style.visibility = "visible";
        var ss = document.getElementById('search_suggest')
        ss.innerHTML = ' ';
        var str = text.responseText.split("\n");
        for(i=0; i < str.length - 1; i++)
        { 
        	var suggest = '<li onmouseover="javascript:suggestOver(this);" ';
                        suggest += 'onmouseout="javascript:suggestOut(this);" ';
                        suggest += 'onclick="javascript:setSearch(this.innerHTML);" ';
                        suggest += 'class="suggest_link">' + str[i] + '</li>';
                        ss.innerHTML += suggest;
                }
       
       
       
}
function showAlert(MyRequest) {
        alert("Operacja nie powiodła się");
}
function suggestOver(div_value) {
       
        div_value.className = 'suggest_link_over';
}
function suggestOut(div_value) {
       
        div_value.className = 'suggest_link';
}
function setSearch(value) {
        var search_suggest = document.getElementById("search_suggest");
        search_suggest.style.visibility = "hidden";
        document.getElementById('searchinput').value = value;
        document.getElementById('search_suggest').innerHTML = '';
}
