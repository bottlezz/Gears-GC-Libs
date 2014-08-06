package info.gearsgc.testwebserver;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import info.gearsgc.webserver.GcAssetManager;

public class MyAssetManager implements GcAssetManager {


	
	public MyAssetManager(){
		
	}
	public MyAssetManager(String path){
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
	       // e.printStackTrace();
	        throw(e);
	    }
	    System.out.println(fileName);
	    return is;
	
	}

	@Override
	public InputStream open(String fileName, int accessMode) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}

}
