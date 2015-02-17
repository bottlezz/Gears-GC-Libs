
//client network layer

//can send data in binary
	//init objects
	// var recievedObject;	  // recieved json object

function GameCenter(port) {
	console.log(this);
	this.wsPort= port==null?"50000":port.toString();
	this.ip="127.0.0.1";
	this.connected=false;
	this.onConnect=function(){};

	//to close connection connection.close();
	this.init = function() {
		console.log(this);
		console.log("loading!");
		//check preconditions for web socket support
		if (window.MozWebSocket) {

	        console.log('using MozillaWebSocket');
	        window.WebSocket = window.MozWebSocket;
	    } else if (!window.WebSocket) {

	        console.log('browser does not support websockets!');
	        //alert('browser does not support websockets!');
	        return;
	    }

		
		var matches = document.URL.match(/http:\/\/([\d.]+)[\/:].*/);
        this.ip = matches[1];
        //var ip="localhost";
        console.log("IP: " + this.ip);

        this.GcObjectList=new Array();

		this.connection = new WebSocket("ws://" + this.ip + ":" + this.wsPort);
		this.connection.GcLib=this;

		this.connection.onopen = function(event) { this.GcLib.onConnection() };
		this.connection.onerror = function(error) { this.GcLib.connectionError(error) };
		this.connection.onmessage = function(message) { this.GcLib.receiveMessage(message) };
		this.connection.onclose = function(event) { this.GcLib.onCloseEvent() };
	};
	this.init();

	//connection error handling
	this.connectionError = function(error) {
		console.log("connection error: " + error);
		//alert(error);
		//document.getElementById('test').innerHTML = error;
	}

	//initial connection sequence
	this.onConnection = function() {
		console.log("connected");
		this.connected=true;
		//this.onConnect();
		// sendOut(gameStateObject);
	}

	this.onCloseEvent = function() {
		console.log("closing");
		connected=false;
	}

	this.receiveMessage = function(message) {
		//convert JSON
		console.log(message);

		try {
			var receivedMessage = JSON.parse(message.data);

			console.log("Recevied Message " + receivedMessage);

			console.log("Received action " + receivedMessage.action
						+ " (" + typeof receivedMessage.action + ")");

			console.log("Received variables " + receivedMessage.variables
						+ " (" + typeof receivedMessage.variables + ")");
			var variables = receivedMessage.variables;
			try{
				variables = JSON.parse(variables);
				console.log("Parsed variables " + variables
						+ " (" + typeof variables + ")");
			} catch(e){
				//variables = null;
			}

			console.log("Received timestamp " + receivedMessage.timestamp
						+ " (" + typeof receivedMessage.timestamp + ")");

			console.log("Received body " + receivedMessage.body
						+ " (" + typeof receivedMessage.body + ")");

			var body = receivedMessage.body;

			try{
				body = JSON.parse(body);
				console.log("Parsed body " + body
						+ " (" + typeof body + ")");
			} catch(e){
				//body = null;
			}


			if (receivedMessage.action == "broadcasting") {
				onBroadCast(body);

			}else if (receivedMessage.action == "SYNC_LIST"){

			}else if(receivedMessage.action =="SYNC"){
				var objectKey=variables;
				/*
				console.log(objectKey);
				for (var i = this.GcObjectList.length - 1; i >= 0; i--) {
					var gco = this.GcObjectList[i];
					//console.log("GCObject:"+gco.getkey()+" "+gco.getValue()+" compare:"+gco.getkey().toString());
					if(gco.getkey()==objectKey){
						gco.setValue(body);
						//gco.onUpdate(objectKey,body);
					}
				};*/
				var gcObj=this.getGcObject(objectKey);
				if(gcObj!=null){
					console.log("not null");
					gcObj.setValue(body)
				}

			}
			else {
			}

		} catch(error) {
			console.log('message is not a JSON object' + error);
		}
	};
	this.getGcObject=function(key){
		for (var i = this.GcObjectList.length - 1; i >= 0; i--) {
			if( this.GcObjectList[i].key==key){
				return this.GcObjectList[i];
			}
		}
	}
	this.sendMessage = function(action, variables, body) {
		//UNIX time stamp
		var timestamp = Math.round(new Date().getTime() / 1000)
		if(typeof variables != 'string'){
			variables = JSON.stringify(variables);
		}
		if(typeof body != 'string'){
			body = JSON.stringify(body);
		}

		var message = {
			"action": action,
			"variables": variables,
			"timestamp": timestamp,
			"body": body
		}

		if(this.connection.readyState == 1) {
			this.connection.send(JSON.stringify(message));
			console.log(JSON.stringify(message));
		} else {
			console.log("connection not ready!");
		}
		console.log("SENT");
	}

	this.broadcast= function(body) {
		this.sendMessage("broadcasting", "message", body);
	}

	this.createList = function(listName){

		var vars={key:listName,autoSync:true};
		this.sendMessage("create_list", JSON.stringify(vars), "");
		//sendMessage("create_list",'{"key":"UserProperty", "autoSync":"true"}',"");
	}
	this.appendList = function(listName, item){
		var vars={key:listName,autoSync:true};
		this.sendMessage("push_list_item", JSON.stringify(vars), JSON.stringify(item));
	}
	this.addListItem = function (listName,item){
		var vars={key:listName,index:0,autoSync:true};
		this.sendMessage("add_list_item", JSON.stringify(vars), JSON.stringify(item));
	}
	this.removeListItem = function (listName,item){
		var vars={key:listName,autoSync:true};
		this.sendMessage("remove_list_item", JSON.stringify(vars), JSON.stringify(item));
	}
	this.removeListItemByIndex = function (listName,index){
		var vars={key:listName,autoSync:true};
		this.sendMessage("remove_list_item_by_index", JSON.stringify(vars), JSON.stringify(index));
	}
	this.getList =function(listName){
		var vars={key:listName};
		this.sendMessage("get_list", JSON.stringify(vars), "");
	}
	this.setObject=function(key,obj){
		var vars={key:key,autoSync:true};
		this.sendMessage("set_object", JSON.stringify(vars), JSON.stringify(obj));
	}
	this.getObject=function(key){
		var vars={key:key};

		this.sendMessage("get_object", JSON.stringify(vars), null);
	}


	var alreadySet = "0";

	this.setUser = function(name, property) {

		this.sendMessage("set_user", {}, {"name":name, "property":property});
		this.sendMessage("create_list",{"key":"UserProperty", "autoSync":"true"},{});
	}


	this.registerGcObject = function(key,callBack){

		if(key!=null){
			var obj=this.getGcObject(key);
			if(obj!=null){
				return obj;
			}
			obj= new GcObject(key,this);
			this.GcObjectList.push(obj);
			return obj;
		}

	}
	this.returnObjList=function(){
		return this.GcObjectList;
	}

	function GcObject(key,gcLib){
		
		//var key;
		this.gcLib=gcLib;
		this.onSync = function(){}
		if(arguments.length==2){
			this.key = key;
			//this.onSync = callBack;

		}else if(arguments.length==1){
			this.key=key;
		}

		this.sync =function(){
			this.gcLib.getObject(key);
			//return value;
		}
	
		this.setValue = function(val){
			this.value=val;
		}
		this.getValue = function(){
			return this.value;
		}

		this.getKey=function(){
			return this.key;
		}
		//callBack function


	}
	function GcList(key,callBack){

		this.onSync= function(){}
		if(arguments.length==2){
			key = key;
			this.onSync = callBack();
		}else if(arguments.length==1){
			key=key;
		}
		this.sync = function() {

		}
		this.submit = function(){

		}
		this.pushBack = function (){

		}

	}

}
