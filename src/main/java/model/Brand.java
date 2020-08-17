package model;

public class Brand {
    private int id;
    private String name;
    private boolean deleted;

    public Brand() {
    }

    public int getId() {
        return id;
    }

    public Brand setId(int id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return name;
    }

    public Brand setName(String name) {
        this.name = name;
        return this;
    }

    public boolean isDeleted() {
        return deleted;
    }

    public Brand setDeleted(boolean deleted) {
        this.deleted = deleted;
        return this;
    }
}
