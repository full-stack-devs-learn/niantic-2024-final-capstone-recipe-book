import axios from "axios";
import { Recipe } from "../models/recipe"
import { SearchRecipe } from "../models/search-recipes/search-recipe";

class SpoonacularService
{
    baseUrl = 'https://api.spoonacular.com/recipes'

    async getRecipesByUserInput(query: string) 
    {
        const response = await axios.get<SearchRecipe[]>(`${this.baseUrl}/complexSearch?${query}`);
        return response.data;
    }

    async getRecipeById(id: number)
    {
        const response = await axios.get<Recipe>(`${this.baseUrl}/${id}/information`);
        return response.data;
    }
}

const spoonacularService = new SpoonacularService();
export default spoonacularService;