package com.niantic.controllers;

import com.niantic.data.MySqlRecipeListDao;
import com.niantic.data.UserDao;
import com.niantic.models.CustomRecipe;
import com.niantic.models.ExternalRecipeCard;
import com.niantic.models.RecipeSearch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/recipe-list")
@CrossOrigin
public class RecipeListController
{
    private MySqlRecipeListDao recipeListDao;
    private UserDao userDao;

    @Autowired
    public RecipeListController(MySqlRecipeListDao recipeListDao, UserDao userDao)
    {
        this.recipeListDao = recipeListDao;
        this.userDao = userDao;
    }

    @GetMapping("")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserLibrary(Principal principal)
    {
        int userId = userDao.getIdByUsername(principal.getName());
        List<RecipeSearch> library = recipeListDao.getUserLibrary(userId);

        return ResponseEntity.ok(library);
    }

    @GetMapping("custom/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getCustomRecipeById(Principal principal, @PathVariable int id)
    {
        CustomRecipe recipe = recipeListDao.getCustomRecipeById(id);
        return ResponseEntity.ok(recipe);
    }

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addRecipeFromExternalAPI(Principal principal, @RequestBody ExternalRecipeCard recipeCard)
    {
        int userId = userDao.getIdByUsername(principal.getName());

        if (recipeListDao.checkExistingRecipe(userId, recipeCard.getApiId()))
        {
            return ResponseEntity.ok("This recipe has already been added.");
        }

        int[] body = recipeListDao.addRecipeFromExternalAPI(userId, recipeCard.getApiId(), recipeCard.getTitle(), recipeCard.getImage());
        return ResponseEntity.status(201).body(body);
    }
}
