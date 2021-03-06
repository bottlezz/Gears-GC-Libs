
//client network layer

//can send data in binary
	//init objects
	// var recievedObject;	  // recieved json object

function GameCenter(port) {
	//console.log(this);
	this.wsPort= port==null?"50000":port.toString();
	this.ip="127.0.0.1";
	this.connected=false;
	this.onConnect=function(){};
	this.eventListener=new Array();
	this.actionPool=new Array();
	//to close connection connection.close();
	this.init = function() {
		//console.log(this);
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

		
		var matches = document.URL.match(/https*:\/\/([\d.]+)[\/:].*/);
		if(matches==null){
			//no match , use localhost
        	this.ip='127.0.0.1';
		}else{
			this.ip = matches[1];
		}
        console.log("IP: " + this.ip);
        var address="ws://" + this.ip + ":" + this.wsPort;

        this.GcObjectList=new Array();

		this.connection = new WebSocket(address);
		this.connection.GcLib=this;

		this.connection.onopen = function(event) { this.GcLib.onConnection() };
		this.connection.onerror = function(error) { this.GcLib.connectionError(error) };
		this.connection.onmessage = function(message) { this.GcLib.receiveMessage(message) };
		this.connection.onclose = function(event) { this.GcLib.onCloseEvent() };

		this.actionPool.push({action:"broadcasting", callback:function(data,gcLib){
			//body = JSON.parse(data.body);
			gcLib.onBroadCast(data.body);
		}});
		this.actionPool.push({action:"SYNC", callback:function(data,gcLib){
			var objectKey=data.variables;
			var gcObj=gcLib.getGcObject(objectKey);
			if(gcObj!=null){
				console.log("not null");
				gcObj.val(body);
			}
		}});
	};
	

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
		//console.log(message);

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
			receivedMessage.body=body;
			receivedMessage.variables=variables;
			console.log(receivedMessage);

			for (var i = this.actionPool.length - 1; i >= 0; i--) {
				var ac=this.actionPool[i];
				if(ac.action==receivedMessage.action){
					ac.callback(receivedMessage,this);
				}
			};
			/*



			if (receivedMessage.action == "broadcasting") {
				onBroadCast(body);

			}else if (receivedMessage.action == "SYNC_LIST"){

			}else if(receivedMessage.action =="SYNC"){
				var objectKey=variables;
	
				var gcObj=this.getGcObject(objectKey);
				if(gcObj!=null){
					console.log("not null");
					gcObj.val(body);
				}

			}
			else {
			}*/

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
		//if(typeof variables != 'string'){
			variables = JSON.stringify(variables);
		//}
		//if(typeof body != 'string'){
			body = JSON.stringify(body);
		//}

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
				if(callback!=null)
					callBack(obj);
				return obj;
			}
			obj= new GcObject(key,this);
			this.GcObjectList.push(obj);
			obj.onRegsiter=callBack;
			obj.sync();
			return obj;
		}

	}
	this.returnObjList=function(){
		return this.GcObjectList;
	}

	this.init();
};

function GcSocket(gcLib){
	this.gcService = gcLib;
	this.wsPort= "50000";
	this.ip="127.0.0.1";
	this.connection = null;
	this.connected=false;
	this.init=function(port, ip){
		if(port!=null)this.wsPort = port;
		if(ip!=null) this.ip= ip;
		this.connection = new WebSocket(address);
		this.connection.gcLib=gcLib;
		this.connection.onopen = function(event) { this.gcLib.onConnection(); };
		this.connection.onerror = function(error) { this.gcLib.connectionError(error) };
		this.connection.onmessage = function(message) { this.gcLib.receiveMessage(message) };
		this.connection.onclose = function(event) { this.gcLib.onCloseEvent() };
	}
};
function GcData(){

};

///Modles
function GcObject(key,gcLib){
		
	// game center;
	this.gcLib=gcLib;
	if(arguments.length==2){
		this.key = key;
		//this.onSync = callBack;

	}else if(arguments.length==1){
		this.key=key;
	}
	
	//this.
	this.onRegsiter=null;
	this.onSync = null;


	this.sync =function(){
		//
		this.value=this.gcLib.getObject(this.key);
		//return value;
	}
	this.val = function(val){
		if(val!=null){
			this.value=val;
		}else{
			return this.value;
		}
	}

	this.setValue = function(val){
		this.value=val;
		this.gcLib.setObject(this.key, this.value);
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

