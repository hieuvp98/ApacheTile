package dao;

import model.Product;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class ProductDAO extends BasicDAO<Product> {
    public ProductDAO() {
        super("product", Product.class);
    }

    public List<Product> filter(int categoryId, int brandId, boolean asc) throws SQLException {
        String sql = "SELECT * FROM " + table + " WHERE (? = 0 or category_id = ?) and (? = 0 or brand_id = ?) and deleted = false";
        if (asc)
            sql += " order by name asc";
        else sql += " order by name desc";

        PreparedStatement prepared = prepare(sql);
        prepared.setInt(1,categoryId);
        prepared.setInt(2,categoryId);
        prepared.setInt(3,brandId);
        prepared.setInt(4,brandId);
        ResultSet rs = prepared.executeQuery();
        return getList(rs);
    }
}
