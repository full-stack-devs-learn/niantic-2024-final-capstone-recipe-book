package com.niantic.controllers;

import com.niantic.data.MySqlRecipeListDao;
import com.niantic.data.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

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

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addRecipeFromExternalAPI(Principal principal, @RequestBody Integer recipeId)
    {
        int userId = userDao.getIdByUsername(principal.getName());
        int body = recipeListDao.addRecipeFromExternalAPI(userId, recipeId);

        return ResponseEntity.ok(body);
    }
}
