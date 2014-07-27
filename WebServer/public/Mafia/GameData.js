var mocklist=[{name:"Greg",id:"1",status:1,identity:1},
{name:"Luna",id:"2",status:0,identity:0},
{name:"Effie",id:"3",status:0,identity:0}];

var UserList;
var isHost;

var user = function(name){
	this.name = name;
	this.id = null;
	this.isHost = null;
	this.socket = null;
	this.status = 1;
	this.identity = 0;
}

function detectHost(){
	UserList[0].isHost = "1";
}

function receivedUserlist(receivedMessage){
	var body = receivedMessage.body;
	body = body.split("#SYSTEM#");

	var variables = JSON.parse(receivedMessage.variables);

	if(variables.key == "USERSOCKETS"){
		for(var i=0; i<body.length; i++){
			UserList[i].socket = body[i];
		}
	}
	else if(variables.key == "USERS"){
		UserList = [];
		for(var i=0; i<body.length; i++){
			var currentUser = new user(body[i]);
			UserList.push(currentUser);
		}
		return;
	}

	detectHost();

	//update host info
	for(var i=0; i<UserList.length; i++){
		if(UserList[i]["name"]==myName){
			isHost = UserList[i]["isHost"];
			break;
		}
	}
}

function getPlayerList(){
	return UserList;
}
function getDeathList(){
	var list=getPlayerList();
	var deadList = new Array();
	for(var index in list){
		if(list[index].status==0){
			deadList.push(list[index]);
		}
	}
	return deadList;
}
function getCivilianList(){
	var list=getPlayerList();
	var cList = new Array();
	for(var index in list){
		if(list[index].status==3){
			cList.push(list[index]);
		}
	}
	return cList;
}
function getKillerCount(){
	var list=getPlayerList();
	var cList = new Array();
	for(var index in list){
		if(list[index].identity==1){
			return list[index];
		}
	}
	
}
function getSurvivorList(){
	var list = getPlayerList();
	var sList= new Array();
	for(var index in list){
		if(list[index].status == 1){
			sList.push(list[index]);
		}		
	}
	return sList;
}