package dao;


import util.Utility;

import java.lang.reflect.Field;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public abstract class BasicDAO<T> {
    protected String table;
    protected Class<T> type;

    public BasicDAO(String table, Class<T> type) {
        this.table = table;
        this.type = type;
    }


    protected PreparedStatement prepare(String sql) throws SQLException {
        return DatabaseConnection.connection.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
    }

    protected T getObject(ResultSet rs) {
        try {
            Field[] fields = type.getDeclaredFields();
            T object = (T) type.newInstance();
            for (Field f : fields) {
                f.setAccessible(true);
                f.set(object, rs.getObject(Utility.camelToSnake(f.getName())));
            }
            return object;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<T> getList(ResultSet rs) {
        List<T> data = new ArrayList<>();
        try {
            while (rs.next()) {
                data.add(getObject(rs));
            }
        } catch (SQLException e) {
            //do nothing
        }
        return data;
    }

    //find by id
    public T findById(int id) throws SQLException {
        String sql = "SELECT * FROM " + table + " WHERE id = ? AND deleted = false";
        PreparedStatement prepared = prepare(sql);
        prepared.setInt(1, id);
        ResultSet rs = prepared.executeQuery();
        rs.first();
        return getObject(rs);
    }

    public List<T> findAll() throws SQLException {
        String sql = "SELECT * FROM " + table + " WHERE deleted = false";
        PreparedStatement prepared = prepare(sql);
        ResultSet rs = prepared.executeQuery();
        return getList(rs);
    }

    public T findBy(String field, String value) throws SQLException {
        String sql = "SELECT * FROM " + table + " WHERE " + field + " = ? AND deleted = false";
        PreparedStatement prepared = prepare(sql);
        prepared.setObject(1, value);
        ResultSet rs = prepared.executeQuery();
        rs.first();
        return getObject(rs);
    }

    //TODO sortBy(String field, boolean asc)
    //TODO findByParent(String parent, int parentId)
    
    //insert
    public T insert(T object) throws SQLException {
        PreparedStatement prepared;
        Field[] fields = type.getDeclaredFields();
        int fieldNumber = fields.length;

        StringBuilder sql = new StringBuilder("INSERT INTO " + table + "(");
        for (int i = 1; i < fieldNumber; i++) {
            Field f = fields[i];
            sql.append(Utility.camelToSnake(f.getName())).append(i != fieldNumber - 1 ? "," : ") VALUES(");
        }
        for (int i = 1; i < fieldNumber; i++) {
            Field f = fields[i];
            sql.append(i != fieldNumber - 1 ? "?," : "?)");
        }

        prepared = prepare(String.valueOf(sql));
        try {
            for (int i = 1; i < fieldNumber; i++) {
                Field f = fields[i];
                f.setAccessible(true);
                prepared.setObject(i, f.get(object));
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
            return null;
        }

        int count = prepared.executeUpdate();
        if (count == 1) {
            // find the new record
            PreparedStatement prepare1 = prepare("SELECT * FROM " + table);
            ResultSet rs = prepare1.executeQuery();
            rs.last();
            return getObject(rs);
        } else {
            return null;
        }
    }

    //update
    public boolean update(T object) throws SQLException {
        PreparedStatement prepared;
        Field[] fields = type.getDeclaredFields();
        int fieldNumber = fields.length;

        StringBuilder sql = new StringBuilder("UPDATE " + table + " SET ");
        for (int i = 1; i < fieldNumber; i++) {
            Field f = fields[i];
            sql.append(Utility.camelToSnake(f.getName())).append(i != fieldNumber - 1 ? " = ?, " : " = ? ");
        }
        sql.append(" WHERE ").append(Utility.camelToSnake(fields[0].getName())).append(" = ?");//id field

        prepared = prepare(String.valueOf(sql));
        try {
            for (int i = 1; i < fieldNumber; i++) {
                Field f = fields[i];
                f.setAccessible(true);
                prepared.setObject(i, f.get(object));
            }
            Field f = fields[0];//id field
            f.setAccessible(true);
            prepared.setObject(fieldNumber, f.get(object));
        } catch (IllegalAccessException e) {
            e.printStackTrace();
            return false;
        }

        int count = prepared.executeUpdate();
        return count == 1;
    }

    //delete
    public boolean delete(int id) throws SQLException {
        String sql = "UPDATE " + table + " set deleted = true WHERE id = ?";
        PreparedStatement prepared = prepare(sql);
        prepared.setInt(1, id);
        int count = prepared.executeUpdate();
        return count == 1;
    }
}
