package org.gears.network;

import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

public class GcSocketServer extends WebSocketServer {
	
	private HashMap<String, String> gcObjects;
	private HashMap<String, ArrayList<String>> gcLists;
	

	public GcSocketServer( int port ) throws UnknownHostException {
		super( new InetSocketAddress( port ) );
		//this.initialize();
	}

	public GcSocketServer( InetSocketAddress address ) {
		super( address );

		this.gcObjects = new HashMap<String, String>();
		this.gcLists = new HashMap<String, ArrayList<String>>();
		
	}
	@Override
	public void onClose(WebSocket arg0, int arg1, String arg2, boolean arg3) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onError(WebSocket arg0, Exception arg1) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onMessage(WebSocket arg0, String arg1) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onOpen(WebSocket arg0, ClientHandshake arg1) {
		// TODO Auto-generated method stub

	}

}
