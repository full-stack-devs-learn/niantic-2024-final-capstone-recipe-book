import RecipeCard from "../recipe-card/RecipeCard";
import { useState, useEffect } from "react";
// import spoonacularService from "../../../services/spoonacular-service";
import { SearchResults } from "../../../models/search-recipes/search-results";
import './SearchRecipe.css';
import FilterSideBar from "../filter-side-bar/FilterSideBar";

export default function SearchRecipe() {

    const [recipes, setRecipes] = useState<SearchResults[]>([]);

    // async function loadRecipes()
    // {
    //     const searchResults = await spoonacularService.getRecipesByUserInput("query=pasta&maxFat=25&number=2");
    //     setRecipes(searchResults.results);
    // }

    // useEffect(() => {

    //     loadRecipes();

    // }, [])


    return (
        <div className="recipe-container container">
            <FilterSideBar />
            <main>
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Search" />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>

                {
                    recipes.map((recipe) => (
                        <RecipeCard key={recipe.id}
                            title={recipe.title}
                            image={recipe.image}
                        ></RecipeCard>
                    ))
                }
                <RecipeCard
                    title="title"
                    image="image" />
                <RecipeCard
                    title="title"
                    image="image" />
                <RecipeCard
                    title="title"
                    image="image" />
            </main>
        </div>
    )
}   