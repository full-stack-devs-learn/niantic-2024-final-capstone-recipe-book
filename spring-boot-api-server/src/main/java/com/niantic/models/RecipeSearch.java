package com.niantic.models;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeSearch {

    private int id;
    private int userId;
    @JsonProperty("isCustom")
    private boolean isCustom;
    private int customId;
    private int apiId;
    private String customTitle;
    private String externalTitle;
    private String customImage;
    private String externalImage;
    private int externalId;

    public boolean getIsCustom() {return this.isCustom;}
}
