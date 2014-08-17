package info.gearsgc.webserver;

import java.util.List;

public interface GcUrlRouter {
	public String RoutePath(String path);
	public List<String> AssetAppList();
}
