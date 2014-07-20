
var currentPathArray=["a","b","c","d"];
function refreshContent(){
	var path=getCurrentPath();
	console.log(path);

}
function getContent(path){
	$.ajax({
		url:"GcFileMan/GetContent?path="+encodeURI(path)
	}).done(function(data){

	});
}
function navigateTo(num){
	//display part
	var pathDiv=document.getElementById("pathDiv");
	for (var i = currentPathArray.length - 1; i >= num; i--) {
		pathDiv.removeChild(pathDiv.lastElementChild);
		currentPathArray.pop();
	};
	refreshContent();


}
function getCurrentPath(){
	var path="/";
	for (var i = 0;i<currentPathArray.length; i++) {
		path+=currentPathArray[i]+"/";
	};
	return path;
}
function submitFileUploadForm(oFormElement)
{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == this.DONE) {
			alert ("Done");
			oFormElement.reset();
		}
	}
	xhr.open (oFormElement.method, oFormElement.action, true);
	xhr.send (new FormData (oFormElement));
	return false;
}
function createDirButtonClick(){
	var content = document.getElementById("contentMain");
	var dirNameInputBox=document.getElementById("dirNameInput");
	content.setAttribute("hidden",true);
	dirNameInputBox.removeAttribute("hidden");

}
function createDirSubmit(){
	var content = document.getElementById("contentMain");
	var dirNameInput=document.getElementById("dirNameInput");
	var dirName = document.getElementById("dirNameInputBox").text;
	if(dirName==null||dirName.trim()==""){
		return createDirCancel();
	}
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(this.readyState == this.DONE){
			alter("Done");


		}else{
			alter("Fail");
		}
	}

	dirNameInputBox.setAttribute("hidden",true);
	content.removeAttribute("hidden");
	refreshContent();

}

function createDirCancel(){
	//alert(currentPath);
	var content = document.getElementById("contentMain");
	var dirNameInputBox=document.getElementById("dirNameInput");
	dirNameInputBox.setAttribute("hidden",true);
	content.removeAttribute("hidden");
}