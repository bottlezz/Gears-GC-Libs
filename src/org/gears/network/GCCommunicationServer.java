package org.gears.network;

import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.SimpleTimeZone;
import java.util.TimeZone;

import org.gears.DataObject;
import org.gears.GCUser;
import org.gears.GCUserList;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class GCCommunicationServer extends WebSocketServer {

	//private HashMap<WebSocket, GCUser> userList;
	private HashMap<String, String> gcObjects;
	private HashMap<String, ArrayList<String>> gcLists;
	
	public GCCommunicationServer( int port ) throws UnknownHostException {
		super( new InetSocketAddress( port ) );
		this.initialize();
	}

	public GCCommunicationServer( InetSocketAddress address ) {
		super( address );
		this.initialize();
	}
	
	private void initialize()
	{
		//this.userList = new HashMap<WebSocket, GCUser>();
		this.gcObjects = new HashMap<String, String>();
		this.gcLists = new HashMap<String, ArrayList<String>>();
	}
	
	@Override
	public void onClose(WebSocket arg0, int arg1, String arg2, boolean arg3)
	{
//		if (this.userList.containsKey(arg0))
//		{
//			this.userList.remove(arg0);
//		}
//		
//		this.broadcastUserList();
		//TODO
		//when user leave the game, i.e. close connection
		//what to do
	}

	@Override
	public void onError(WebSocket arg0, Exception arg1)
	{

	}

	@Override
	public void onMessage(WebSocket sourceSocket, String data)
	{
		//TODO test
		DataObject obj1 = new DataObject();
		obj1.setAction("testAction");
		obj1.setBody("testBody");
		obj1.setTimestamp("bla");
		obj1.setVariables("testVar");
		this.broadcast(sourceSocket, obj1.getJson(), false);
		
		DataObject obj = new DataObject();
		obj.parseJson(data);
		
		if (obj.getAction().equals("broadcasting"))
		{
			this.broadcast(sourceSocket, data, false);
		}
		else if (obj.getAction().equals("set_user") || obj.getAction().equals("add_user"))
		{
			this.addUser(sourceSocket, data);
		}
		else if (obj.getAction().equals("set_object"))
		{
			this.updateGcObjects(sourceSocket, data);
		}
	}
	
	public void updateGcObjects(WebSocket sourceSocket, String data){
		DataObject obj = new DataObject();
		obj.parseJson(data);
		
		String key = obj.getVariableKey();
		String value = obj.getBody();
		
		gcObjects.put(key, value);
		
		if(obj.getVariableAutoSync()=="true"){
			//broadcast
			// TODO
			// broadcast data, not the origin data
			DataObject objBack = new DataObject();
			objBack.setBody(value);
			objBack.setAction("SYNC");
			objBack.setVariables(key);
			SimpleDateFormat f = new SimpleDateFormat("yyyy-MMM-dd HH:mm:ss");
			f.setTimeZone(TimeZone.getTimeZone("UTC"));
			String timestamp = f.format(new Date());
			objBack.setTimestamp(timestamp);
			this.broadcast(sourceSocket, data, false);
		}
	}

	@Override
	public void onOpen(WebSocket arg0, ClientHandshake arg1)
	{
		
	}
	
	private void broadcast(WebSocket sourceSocket, String data, boolean excludeMode)
	{
		Collection<WebSocket> sockets = this.connections();
		for (Iterator<WebSocket> iterator = sockets.iterator(); iterator.hasNext();) 
		{
			WebSocket socket = iterator.next();
			if (socket != sourceSocket || excludeMode == false)
			{
				socket.send(data);
			}
		}
	}
	
//	private void broadcastUserList()
//	{
//		GCUserList list = new GCUserList();
//		list.setUserList(this.userList.values());
//		
//		Collection<WebSocket> sockets = this.connections();
//		for (Iterator<WebSocket> iterator = sockets.iterator(); iterator.hasNext();) 
//		{
//			WebSocket socket = iterator.next();
//			socket.send(list.getJson());
//		}
//	}
	
	private void addUser(WebSocket sourceSocket, String data)
	{
		ArrayList<String> users;
		if (this.gcLists.containsKey("USERS")){
			users = gcLists.get("USERS");
		}
		else{
			users = new ArrayList<String>();
		}
		
		DataObject obj = new DataObject();
		obj.parseJson(data);
		users.add(obj.getBody());
		gcLists.put("USERS", users);
		
		
//		if (!this.userList.containsKey(sourceSocket))
//		{
//			GCUser newUser = new GCUser();
//			this.userList.put(sourceSocket, newUser);
//		}
		
//		GCUser user = this.userList.get(sourceSocket);
//		user.parseJson(data);
		// TODO
		// may need change
		//this.updateHost();
		this.broadcast(sourceSocket, gcLists.get("USERS").toString(), false);
	}
	
//	private void updateHost()
//	{
//		boolean curr = true;
//		Iterator<GCUser> iterator = this.userList.values().iterator();
//		while (iterator.hasNext())
//		{
//			GCUser user = iterator.next();
//			if (curr)
//			{
//				user.setIsHost("1");
//				curr = false;
//			}
//			else
//			{
//				user.setIsHost("0");
//			}
//		}
//	}

}
