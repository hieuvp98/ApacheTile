package dao;

import model.Category;

public class CategoryDAO extends BasicDAO<Category> {
    public CategoryDAO() {
        super("category", Category.class);
    }
}
