package com.niantic.controllers;

import com.niantic.data.MySqlRecipeListDao;
import com.niantic.data.UserDao;
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

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addRecipeFromExternalAPI(Principal principal, @RequestBody Integer recipeId)
    {
        int userId = userDao.getIdByUsername(principal.getName());
        int body = recipeListDao.addRecipeFromExternalAPI(userId, recipeId);

        return ResponseEntity.ok(body);
    }
}
