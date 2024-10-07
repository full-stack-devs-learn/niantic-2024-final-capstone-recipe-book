package com.niantic.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeListModel
{
    private int recipeId;
    private int userId;
    private boolean isCustom;
    private int customid;
    private int apiId;
}
