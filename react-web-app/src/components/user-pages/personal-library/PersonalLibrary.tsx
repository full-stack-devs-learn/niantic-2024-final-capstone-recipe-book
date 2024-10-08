import RecipeCard from "../../recipes/recipe-card/RecipeCard";
import recipesListService from "../../../services/recipes-list-service";
import spoonacularService from "../../../services/spoonacular-service";
import { useEffect, useState } from "react";
import { LibraryRecipeCard } from "../../../models/personal-library/library-recipe-card";

export default function PersonalLibrary()
{
    const firstName = 'Gregor';
    const lastName = 'Dzierzon';

    const [library, setLibrary] = useState<LibraryRecipeCard[]>([]);

    useEffect(() => {

        getLibrary();

    }, [])

    async function getLibrary()
    {
        // internal API call
        const libraryItems = await recipesListService.getUserLibrary();
        setLibrary(libraryItems);

        // external API call

    }

    return (
        <>
        <h3>{firstName} {lastName}'s Personal Library</h3>

        <main className="container">

        <div>Preview Recipe Cards Here</div>
        <button className="btn btn-info">Add Recipe</button>
        <form className="d-flex" >
            <input type="text" className="form-control me-sm-2" placeholder="Search" />
            <button type="submit" className="btn btn-secondary my-2 my-sm-0">Search</button> 
        </form>

        {
            library.map((recipe) => (
                    <RecipeCard key={recipe.id}
                            isCustom={recipe.isCustom}
                            title={recipe.isCustom ? recipe.customTitle : recipe.externalTitle}
                            image={recipe.isCustom ? recipe.customImage : recipe.externalImage}
                            id={recipe.isCustom ? recipe.customId : recipe.apiId} />
            ))
        }
        </main>
        </>
    )
}