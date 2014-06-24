var currentPath="/";
function submitFieUploadForm(oFormElement)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == this.DONE) {
			alert ("file upload finished");
			oFormElement.reset();
		}
	};
	xhr.open (oFormElement.method, oFormElement.action, true);
	xhr.send (new FormData (oFormElement));
	return false;
}
function navigateTo(navPath){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == this.DONE) {
			displayDirectory(this.responseText);
			
		}
	};
	var requestUrl="getDirectory?path="+encodeURIComponent(navPath);
	xhr.open("GET",requestUrl,true);
	xhr.send();

}

function displayDirectory(data){
	var callbackData=JSON.parse(data);
	alert(data);
}