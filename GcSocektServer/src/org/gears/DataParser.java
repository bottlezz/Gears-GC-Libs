package org.gears;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.annotations.Expose;
import com.google.gson.stream.JsonReader;

// Message format to parse
//{
//    "action" : "someAction",
//    "variables" : {"key" : "keyName", "autoSync" : "true/false"},
//    "timeStamp" : "UTC Time",
//    "body" : "Your Real Data"
//}

public class DataParser {
	public static HashMap<String,String> parseData(String data){
		
		HashMap<String,String> dataMap=new HashMap<String,String>();
		
		if(data==null || data.isEmpty()){
			return dataMap;
		}
		
		InputStream is;
		is = new ByteArrayInputStream(data.getBytes());
		
		try{

			JsonReader reader = new JsonReader(new InputStreamReader(is, "UTF-8"));
			reader.beginObject();
			while (reader.hasNext()) {
				 String name=reader.nextName();
				 String val=reader.nextString();
				 System.out.println(name+"::"+val);
			}
			reader.endObject();
			reader.close();
			
		}catch(UnsupportedEncodingException e){
			System.out.println(e.getStackTrace());
		}catch(IOException e){
			System.out.println(e.getStackTrace());
		}
		
		return dataMap;
	}
	public static HashMap<String,String> parseDataVar(String vars){
		HashMap<String,String> dataMap=new HashMap<String,String>();
		return dataMap;
	}
}
