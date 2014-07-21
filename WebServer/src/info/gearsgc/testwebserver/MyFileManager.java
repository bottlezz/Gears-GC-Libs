package info.gearsgc.testwebserver;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

import info.gearsgc.webserver.GcFileManager;

public class MyFileManager implements GcFileManager{
	public MyFileManager(){
		
	}
	public MyFileManager(String path){
		localFolder=path;
	}
	private String localFolder;
	
	@Override
	public void close() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public InputStream open(String fileName) throws IOException {
		// TODO Auto-generated method stub
	    InputStream is = null;

	    try {
	        is = new FileInputStream(localFolder+"/"+fileName);

	    
	    } catch (FileNotFoundException e) {
	        // TODO Auto-generated catch block
	        e.printStackTrace();
	    }
	    System.out.println(fileName);
	    return is;
	
	}

	@Override
	public InputStream open(String fileName, int accessMode) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String getUploadPath() {
		// TODO Auto-generated method stub
		return localFolder+"/";
	}
	@Override
	public boolean CreateDir(String subPath,String name) {
		// TODO Auto-generated method stub
		String path=localFolder+"/"+subPath+name;
		new File(path).mkdir();
		return false;
	}

	public String GetDir(String filePath){
				String JSONFile = "{\"data\":[";
				String path=localFolder+filePath;
		File file = new File(path);
		for ( File fileEntry : file.listFiles()) {
	        if (fileEntry.isDirectory()) {
	        	String format = "{\"filename\":\""+ fileEntry.getName() +"\",\"type\":"+"\"d\"},";
	            JSONFile += format;
	        } else {
	        	String format = "{\"filename\":\""+ fileEntry.getName() +"\",\"type\":"+"\"f\"},";
	            JSONFile += format;
	        }
    	}
    	JSONFile = JSONFile.substring(0, JSONFile.length()-1); 
    	JSONFile += "]}";
		return JSONFile;
	}
	
	public boolean DeleteFile(String Path){
		return false;
	}
	
	
	
}
