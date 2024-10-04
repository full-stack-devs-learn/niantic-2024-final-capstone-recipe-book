import RecipeCard from "../recipe-card/RecipeCard";
import { useState, useEffect, FormEvent } from "react";
import spoonacularService from "../../../services/spoonacular-service";
import { SearchResults } from "../../../models/search-recipes/search-results";
import './SearchRecipe.css';
import FilterSideBar from "../filter-side-bar/FilterSideBar";

export default function SearchRecipe() {

    const [recipes, setRecipes] = useState<SearchResults[]>([]);
    const [query, setQuery]     = useState<string>("");
    const [action, setAction]   = useState<string>("");

    async function loadRecipes()
    {
        const searchResults = await spoonacularService.getRecipesByUserInput(query + "&number=2");
        setRecipes(searchResults.results);
    }

    function searchHandler(event: FormEvent)
    {
        event.preventDefault();
    }

    useEffect(() => {

        loadRecipes();

    }, [action])


    return (
        <div className="recipe-container container">
            <FilterSideBar />
            <main>
                <form className="d-flex" onSubmit={(e) => searchHandler(e)}>
                    <input className="form-control me-sm-2" type="search" placeholder="Search" id="queryText" onChange={ (e) => setQuery("&query=" + e.target.value) } />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={() => setAction("Search")}>Search</button>
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