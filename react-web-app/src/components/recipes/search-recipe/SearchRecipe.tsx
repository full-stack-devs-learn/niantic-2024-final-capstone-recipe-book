import RecipeCard from "../recipe-card/RecipeCard";
import { useState, useEffect, FormEvent } from "react";
import spoonacularService from "../../../services/spoonacular-service";
import { SearchResults } from "../../../models/search-recipes/search-results";
import './SearchRecipe.css';
import FilterSideBar from "../../filter-side-bar/FilterSideBar";

export default function SearchRecipe() {

    const [recipes, setRecipes] = useState<SearchResults[]>([]);
    const [action, setAction] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {

        loadRecipes();

    }, [action])

    async function loadRecipes() {
        const searchResults = await spoonacularService.getRecipesByUserInput(action + "&number=9&instructionsRequired=true");
        setRecipes(searchResults.results);
    }

    function searchHandler(event: FormEvent) {
        event.preventDefault();
    }

    function buildFilters(filterStr: string) {
        setFilter(filterStr);
        setAction(search + filterStr);
    }

    function buildSearch(searchStr: string) {
        setSearch("&query=" + searchStr);
    }

    return (
        <div className="recipe-container container">
            <FilterSideBar onFiltered={(str: string) => buildFilters(str)} />
            <main>
                <h1>What Are You Cooking Today?</h1>
                <form className="d-flex mt-4" onSubmit={(e) => searchHandler(e)}>
                    <input className="form-control border-secondary me-sm-2" type="search" placeholder="Search" id="queryText" onChange={(e) => buildSearch(e.target.value)} />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit" onClick={() => setAction(search + filter)}>Search</button>
                </form>

                <div className="card-container mt-4">
                    {
                        recipes.map((recipe) => (
                            <RecipeCard key={recipe.id}
                                isCustom={false}
                                title={recipe.title}
                                image={recipe.image}
                                id={recipe.id}
                            ></RecipeCard>
                        ))
                    }
                </div>
            </main>
        </div>
    )
}