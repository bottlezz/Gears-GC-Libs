package org.gears;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.annotations.Expose;

public class DataObject 
{
	@Expose
	protected String action;
	
	@Expose
	protected String variables;
	
	@Expose
	protected String timestamp;
	
	@Expose
	protected String body;
	
	//@Expose
	//protected int userID;
	
	//@Expose
	//protected String name;
	
	
	
	public String getAction() 
	{
		return action;
	}
	
	public String getTimestamp() 
	{
		return timestamp;
	}
	
	public String getVariables(){
		return variables;
	}
	
//	public int getUserID() 
//	{
//		return userID;
//	}
//	
//	public String getName() 
//	{
//		return name;
//	}
	
	public String getBody() 
	{
		return body;
	}
	
	public void setAction(String action)
	{
		this.action = action;
	}
	
	public void setTimestamp(String timestamp)
	{
		this.timestamp = timestamp;
	}
	
	public void setVariables(String variables){
		this.variables = variables;
	}
	
//	public void setUserID(int userID)
//	{
//		this.userID = userID;
//	}
//	
//	public void setName(String name)
//	{
//		this.name = name;
//	}
	
	public void setBody(String body)
	{
		this.body = body;
	}
	
	public void parseJson(String json)
	{
		Gson gson = new Gson();
		try
		{
			//json = "{\"action\":\"broadcasting\", \"variables\":\"test\", \"timestamp\":\"null\", \"body\":\"testing\"}";
			JsonObject obj = gson.fromJson(json, JsonObject.class);
			this.action = obj.get("action").isJsonNull() ? null: obj.get("action").getAsString();
			this.timestamp = obj.get("timestamp").isJsonNull() ? null : obj.get("timestamp").getAsString();
			this.body = obj.get("body").isJsonNull() ? null : obj.get("body").getAsString();
			this.variables = obj.get("variables").isJsonNull() ? null : obj.get("variables").getAsString();
		}
		catch(JsonSyntaxException jse)
		{
			jse.printStackTrace();
			this.action = null;
			this.timestamp = null;
			//this.name = null;
			//this.userID = -1;
			this.variables = null;
			this.body = null;
			jse.printStackTrace();
		}
		catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public String getJson()
	{
		Gson gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().serializeNulls().create();
		
		try
		{
			return gson.toJson(this);
		}
		catch(JsonSyntaxException jse)
		{
			jse.printStackTrace();
			return null;
		}
	}
}
