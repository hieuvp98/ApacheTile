package config;

import org.apache.tiles.web.util.TilesDispatchServlet;

import javax.servlet.annotation.WebServlet;

@WebServlet(urlPatterns = {"*.tiles"})
public class TileDispatch extends TilesDispatchServlet {
}
