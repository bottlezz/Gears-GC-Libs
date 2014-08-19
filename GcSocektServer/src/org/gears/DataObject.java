package org.gears;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.annotations.Expose;

public class DataObject 
{
	public JsonObject dataObj;
	@Expose
	protected String action;
	
	@Expose
	protected String variables;
	
	protected JsonObject variablesJson;
	
	@Expose
	protected String timestamp;
	
	@Expose
	protected String body;
	

	
	
	
	public String getAction() 
	{
		return action;
	}
	
	public String getTimestamp() 
	{
		return timestamp;
	}
	
	public String getVariablesAsString(){
		return variables;
	}
	
	public JsonObject getVariablesAsJson(){
		return this.variablesJson;
	}
	
	public String getVariableKey(){
		JsonObject json = getVariablesAsJson();
		return json.get("key").isJsonNull() ? null : json.get("key").getAsString();
	}
	
	public String getVariableAutoSync(){
		JsonObject json = getVariablesAsJson();
		return json.get("autoSync").isJsonNull() ? null : json.get("autoSync").getAsString();
	}
	
	public String getVariableSeparator(){
		JsonObject json = getVariablesAsJson();
		return json.get("separator").isJsonNull() ? null : json.get("separator").getAsString();
	}
	
	public String getVariableIndex(){
		JsonObject json = getVariablesAsJson();
		return json.get("index").isJsonNull() ? null : json.get("index").getAsString();
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
			//temp = obj.get("userID").isJsonNull() ? null : obj.get("userID").getAsString();
			//this.userID = temp == null ? -1 : Integer.parseInt(temp);
			//this.name = obj.get("name").isJsonNull() ? null : obj.get("name").getAsString();
			this.body = obj.get("body").isJsonNull() ? null : obj.get("body").getAsString();
			
			if (obj.get("variables").isJsonObject())
			{
				this.variablesJson = obj.get("variables").isJsonNull()? null : obj.get("variables").getAsJsonObject();
				this.variables = variablesJson.toString();
			}
			else{
				this.variables = obj.get("variables").isJsonNull()? null : obj.get("variables").getAsString();
				this.variablesJson = null;
			}
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
			this.variablesJson = null;
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
			return null;
		}
	}
}
