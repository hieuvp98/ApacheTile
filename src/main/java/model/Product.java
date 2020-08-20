package model;

import java.util.Date;

public class Product {

    private int id;
    private String name;
    private String image;
    private double price;
    private int quantity;
    private String introduction;
    private Date createDate;
    private boolean deleted;
    private int categoryId;
    private int brandId;

    public Product() {
    }

    public int getId() {
        return id;
    }

    public Product setId(int id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Product setName(String name) {
        this.name = name;
        return this;
    }

    public double getPrice() {
        return price;
    }

    public Product setPrice(double price) {
        this.price = price;
        return this;
    }

    public int getQuantity() {
        return quantity;
    }

    public Product setQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public Product setCreateDate(Date createDate) {
        this.createDate = createDate;
        return this;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public Product setDeleted(boolean deleted) {
        this.deleted = deleted;
        return this;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public Product setCategoryId(int categoryId) {
        this.categoryId = categoryId;
        return this;
    }

    public int getBrandId() {
        return brandId;
    }

    public Product setBrandId(int brandId) {
        this.brandId = brandId;
        return this;
    }

    public String getImage() {
        return image;
    }

    public Product setImage(String image) {
        this.image = image;
        return this;
    }

    public String getIntroduction() {
        return introduction;
    }

    public Product setIntroduction(String introduction) {
        this.introduction = introduction;
        return this;
    }
}

