import { useState, useEffect, FormEvent } from "react";
import spoonacularService from "../../../services/spoonacular-service";
import { Recipe } from "../../../models/recipe";
import { useParams } from "react-router-dom";
import recipesListService from "../../../services/recipes-list-service";

export default function RecipeDetails() {
    const [recipeData, setRecipeData] = useState<Recipe>();
    const [customRecipeData, setCustomRecipeData] = useState<Recipe>();

    const params = useParams();

    const id = params.id ?? 0;
    const custom = params.isCustom ?? 0;

    console.log(custom, " details")

    useEffect(() => {

        getRecipe();

    }, [])

    async function getRecipe() {
        if (+custom == 0) {
            const selectedRecipe = await spoonacularService.getRecipeById(+id);
            setRecipeData(selectedRecipe);
        }
        else {
            const selectedCustomRecipe = await recipesListService.getCustomRecipeById(+id)
            setCustomRecipeData(selectedCustomRecipe);
        }
    }

    function addRecipeToLibrary() {
        const addRecipe = {
            apiId: +id,
            title: recipeData?.title,
            image: recipeData?.image
        }
        recipesListService.addRecipeFromExternalAPI(addRecipe)
    }

    return (
        <>
            <h3>{+custom ? customRecipeData?.title : recipeData?.title}</h3>
            {
                +custom ? <></>
                : <button className="btn btn-info" onClick={addRecipeToLibrary}>Add Recipe to Library</button> 
            }
            <h5>Instructions</h5>
            <p>{+custom ? customRecipeData?.instructions : recipeData?.instructions}</p>
            <img src={+custom ? customRecipeData?.image : recipeData?.image} />
        </>
    )
}  