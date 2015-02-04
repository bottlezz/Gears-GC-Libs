package org.gears;

import org.gears.network.GCCommunicationServer;

public class GCMain
{
	public static void main(String[] args)
	{
		try
		{
			GCCommunicationServer server = new GCCommunicationServer(50000);
			server.start();
		}
		catch (Exception e)
		{
			e.printStackTrace(); //if you want it.
		    //You could always just System.out.println("Exception occurred.");
		    //Though the above is rather unspecific.
		    System.exit(1);
		}
	}
}
