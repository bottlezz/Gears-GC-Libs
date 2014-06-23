var currentPath="%2f";
function submitForm(oFormElement)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == this.DONE) {
			alert ("Doen");
			oFormElement.reset();
		}
	}
	xhr.open (oFormElement.method, oFormElement.action, true);
	xhr.send (new FormData (oFormElement));
	return false;
}