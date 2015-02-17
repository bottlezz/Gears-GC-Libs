var connect=new GameCenter();

function testGcObject(key,value){
	var globalName=connect.registerGcObject(key,function(obj){obj.getValue()});
	if(globalName.getValue()!=null){
		console.log("current value "+globalName.getValue());

	}else{
		if(value!=null){
			globalName.setValue(value);
			//globalName.sync();
			console.log("value changed to "+value)

		}
	}

}