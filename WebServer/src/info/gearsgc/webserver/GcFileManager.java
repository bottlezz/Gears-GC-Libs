package info.gearsgc.webserver;

public interface GcFileManager {
	public void close();
	public String GetUploadPath();
	
	public java.io.InputStream open(java.lang.String fileName) throws java.io.IOException ;
	
	public java.io.InputStream open(java.lang.String fileName, int accessMode) throws java.io.IOException;
	
}
