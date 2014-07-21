
var currentPathArray=[];
function refreshContent(){
	var path=getCurrentPath();
	console.log(path);

}
function getDirContent(path){
	$.ajax({
		url:"/GcFileMan/GetDir?path="+encodeURIComponent(path)
		}).done(function(data){
			console.log(data);
			var listContainer=$('#dirContent');
			listContainer.empty();
	

			var dd=JSON.parse(data);
			console.log(dd);
			var list=dd.data;
			var dirIcon="<span> -D- </span>";
			var fileIcon="<span> -F- </span>";
			for (var i = list.length - 1; i >= 0; i--) {
				if(list[i].type=='d'){
					var item="<li>"+dirIcon+"<button class='btn-link' onclick='openDirButtonClick("+'"'+list[i].filename+'"'+")'>"+list[i].filename+"</button>"+"</li>";
					listContainer.append(item);
				};
				if (list[i].type == 'f') {
					var item="<li>"+fileIcon+list[i].filename+"</li>";	
					listContainer.append(item);			
				};	
			}
		})
    .fail(function() { alert("error"); });
}
function openDirButtonClick(dirName){

	console.log(dirName);
	addNavItem(dirName);
	getDirContent(getCurrentPath());

}
function addNavItem(name){
	currentPathArray.push(name);
	var pathDiv=$('#pathDiv');

	var navItem="<span><button class='btn-link' onclick='navigateTo("+currentPathArray.length+")''>"+name+"</button>/</span>";
	pathDiv.append(navItem);

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
function getDirButtonClick(){
	$.ajax({
		url:"GcFileMan/GetDir?path="+encodeURI(path)
	}).done(function(data){

	});

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