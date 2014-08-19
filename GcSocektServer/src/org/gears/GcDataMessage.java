package org.gears;

import com.google.gson.JsonObject;

public class GcDataMessage {
//	{
//	    "action" : "someAction",
//	    "variables" : {"key" : "keyName", "autoSync" : "true/false"},
//	    "timeStamp" : "UTC Time",
//	    "body" : JSON.Stringify(object)
//	}
	String action;
	JsonObject variables;
	int timeStamp;
	Object body;
	
	GcDataMessage(String dataStr){
		
	}
	
}
