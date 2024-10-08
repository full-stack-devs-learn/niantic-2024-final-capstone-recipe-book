package com.niantic.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeSearch {

    private String title;
    private String image;
    private int id;
    private int userId;
}
