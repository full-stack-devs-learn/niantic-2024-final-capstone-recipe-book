package com.niantic.data;

import com.niantic.models.CustomRecipe;
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
                SELECT
                	r.id
                	, r.is_custom
                    , r.custom_id
                    , e.api_id
                    , c.title AS custom_title
                    , e.title AS external_title
                    , c.image AS custom_image
                	, e.image AS external_image
                FROM recipes_list as r
                LEFT JOIN custom_recipes as c ON r.user_id=c.user_id and r.is_custom = 1
                LEFT JOIN external_recipes e ON e.user_id=r.user_id and r.is_custom = 0
                WHERE r.user_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, userId);

        while(row.next())
        {
            boolean isCustom = row.getBoolean("is_custom");
            int customId = row.getInt("custom_id");
            int apiId = row.getInt("api_id");
            String customTitle = row.getString("custom_title");
            String externalTitle = row.getString("external_title");
            String customImage = row.getString("custom_image");
            String externalImage = row.getString("external_image");
            int id = row.getInt("id");

            library.add(new RecipeSearch(id, userId, isCustom, customId, apiId, customTitle, externalTitle, customImage, externalImage));
        }
        return library;
    }

    public CustomRecipe getCustomRecipeById(int id)
    {
        String sql = "SELECT * FROM custom_recipes WHERE id = ?";

        var row = jdbcTemplate.queryForRowSet(sql, id);

        if (row.next())
        {
            int userId = row.getInt("user_id");
            String title = row.getString("title");
            String image = row.getString("image");
            String instructions = row.getString("instructions");
            String ingredients = row.getString("ingredients");

            CustomRecipe customRecipe = new CustomRecipe(id, userId, title, image, instructions, ingredients);

            return customRecipe;
        }
        return null;
    }

    public CustomRecipe addCustomRecipe(int userId, CustomRecipe customRecipe)
    {
        String sql = """
                INSERT INTO custom_recipes (user_id, title, image, instructions, ingredients)
                VALUES (?, ?, ?, ?, ?);
                """;

        String sql2 = """
                INSERT INTO recipes_list (user_id, is_custom, custom_id)
                VALUES (?, ?, ?);
                """;

        // insert a new record and retrieve the generated id
        KeyHolder keyHolder = new GeneratedKeyHolder();
        KeyHolder keyHolder2 = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            statement.setInt(1, userId);
            statement.setString(2, customRecipe.getTitle());
            statement.setString(3, customRecipe.getImage());
            statement.setString(4, customRecipe.getInstructions());
            statement.setString(5, customRecipe.getIngredients());

            return statement;
        }, keyHolder);

        int customId = keyHolder.getKey().intValue();

        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql2, Statement.RETURN_GENERATED_KEYS);

            statement.setInt(1, userId);
            statement.setBoolean(2, true);
            statement.setInt(3, customId);

            return statement;
        }, keyHolder2);

        int newId2 = keyHolder2.getKey().intValue();

        return getCustomRecipeById(customId);
    }
}
