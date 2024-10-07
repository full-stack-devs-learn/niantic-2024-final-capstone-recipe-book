package com.niantic.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class MySqlRecipeListDao
{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlRecipeListDao(DataSource dataSource)
    {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public int addRecipeFromExternalAPI(int userId, int apiId)
    {

        String sql = "INSERT INTO recipes_list (user_id, api_id) " +
                " VALUES (?, ?) ";

        // insert a new record and retrieve the generated id
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            statement.setInt(1, userId);
            statement.setInt(2, apiId);

            return statement;
        }, keyHolder);

        int newId = keyHolder.getKey().intValue();

        return newId;
    }
}
