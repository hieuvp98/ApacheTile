package servlet;

import com.google.gson.Gson;
import dao.CategoryDAO;
import dao.ProductDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(urlPatterns = {"/api/public/products"})
public class ProductsServlet extends HttpServlet {

    private ProductDAO productDAO = new ProductDAO();

    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter writer = resp.getWriter();
        int categoryId = req.getParameter("category-id") != null ? Integer.parseInt(req.getParameter("category-id")) : 0 ;
        int brandId = req.getParameter("brand-id") != null ? Integer.parseInt(req.getParameter("brand-id")) : 0 ;
        boolean asc = req.getParameter("name-asc") == null || Boolean.parseBoolean(req.getParameter("name-asc"));
        try {
            writer.println(gson.toJson(productDAO.filter(categoryId, brandId, asc)));
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            resp.setStatus(500);
            writer.println("error: " + throwables);
        }
    }
}
