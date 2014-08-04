package info.gearsgc.webserver;

import java.nio.ByteBuffer;

public interface GcFileManager {
	public void close();
	public String getUploadPath();
	
	public java.io.InputStream open(java.lang.String fileName) throws java.io.IOException ;
	
	public java.io.InputStream open(java.lang.String fileName, int accessMode) throws java.io.IOException;
	
	public boolean CreateDir(String subPath,String name);
	
	public String CreateFile(ByteBuffer b, int offset, int len,String subPath,String name);
	
	public String GetDir(String path);
	
	public boolean DeleteFile(String subPath,String name);
	
}
