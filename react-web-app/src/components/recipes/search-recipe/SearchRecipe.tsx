import RecipeCard from "../recipe-card/RecipeCard";
import {useState, useEffect} from "react";
import SpoonacularService from "./services/spoonacular-service.tsx"

export default function SearchRecipe() {

    const [recipes, setRecipes] = useState<SearchRecipe[]>([]);

    async function loadRecipes()
    {
        const searchResults = await SpoonacularService.getRecipesByUserInput("query=pasta&maxFat=25&number=2");
        setRecipes(searchResults.results);
    }

    useEffect(() => {

        loadRecipes();

    }, [])


    return (
        <>
            <main>
            {
            recipes.map((recipe) => (
                <RecipeCard key={recipe.id}
                    title={recipe.title}
                    image={recipe.image}
                    ></RecipeCard>
            ))
            }
            </main>
            <aside>
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Search" />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
            </aside>
        </>
    )
}   