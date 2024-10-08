package com.niantic.data;

import com.niantic.models.RecipeSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MySqlRecipeListDao
{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlRecipeListDao(DataSource dataSource)
    {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public int[] addRecipeFromExternalAPI(int userId, int apiId, String title, String image)
    {
        int[] keys = new int[2];

        String sql1 = "INSERT INTO recipes_list (user_id, external_id) " +
                    " VALUES (?, ?);";

        String sql2 = """
                INSERT INTO external_recipes (api_id, user_id, title, image)
                VALUES (?, ?, ?, ?);
                """;

        // insert a new record and retrieve the generated id
        KeyHolder keyHolder1 = new GeneratedKeyHolder();
        KeyHolder keyHolder2 = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql2, Statement.RETURN_GENERATED_KEYS);

            statement.setInt(1, apiId);
            statement.setInt(2, userId);
            statement.setString(3, title);
            statement.setString(4, image);

            return statement;
        }, keyHolder2);

        int newId2 = keyHolder2.getKey().intValue();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql1, Statement.RETURN_GENERATED_KEYS);

            statement.setInt(1, userId);
            statement.setInt(2, newId2);

            return statement;
        }, keyHolder1);

        int newId1 = keyHolder1.getKey().intValue();

        keys[0] = newId1;
        keys[1] = newId2;

        return keys;
    }

    public boolean checkExistingRecipe(int userId, int apiId)
    {
        String sql = """
                SELECT *
                FROM external_recipes
                WHERE api_id = ? AND user_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, apiId, userId);

        if (row.next()) return true;
        else return false;
    }

    public List<RecipeSearch> getUserLibrary(int userId)
    {
        List<RecipeSearch> library = new ArrayList<RecipeSearch>();

        String sql = """
                SELECT * FROM
                recipes_list as r
                INNER JOIN custom_recipes as c ON r.user_id=c.user_id
                WHERE r.user_id = ? AND is_custom = 1;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, userId);

        while(row.next())
        {
            String title = row.getString("title");
            String image = row.getString("image");
            int id = row.getInt("id");
            boolean isCustom = row.getBoolean("is_custom");

            int databaseId;
            if (isCustom) databaseId = row.getInt("custom_id");
            else databaseId = row.getInt("api_id");



            library.add(new RecipeSearch(title, image, id, userId, isCustom, databaseId));
        }
        return library;
    }
}
