package info.gearsgc.testwebserver;

import fi.iki.elonen.ServerRunner;
import info.gearsgc.webserver.WebServer;

public class DebugServer {
	public static void main(String[] args) {
		MyFileManager fm=new MyFileManager("/Users/gregoryz/github/Gears-GC-TestServer/WebServer/src/info/gearsgc/testwebserver/public");
		WebServer debugServer=new WebServer(8080,fm);
        ServerRunner.executeInstance(debugServer);
    }
}
