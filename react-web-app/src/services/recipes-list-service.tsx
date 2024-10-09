import axios, { AxiosRequestConfig } from "axios";
import store, { RootState } from "../store/store";
import { Recipe } from "../models/recipe";
import { LibraryRecipeCard } from "../models/personal-library/library-recipe-card";
import { CustomRecipe } from "../models/personal-library/custom-recipe";

class RecipesListService
{
    baseUrl = `${import.meta.env.VITE_API_BASE_URL}`

    createHeaders(): AxiosRequestConfig
    {
        const state: RootState = store.getState()
        const token = state.authentication.token

        const config: AxiosRequestConfig<any> = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if(token !== null) 
        {
             config.headers!['Authorization'] = `Bearer ${token}`
        }

        return config
        
    }

    async addRecipeFromExternalAPI(externalRecipe: object)
    {
        const response = await axios.post<number>(`${this.baseUrl}/api/recipe-list/add`, externalRecipe, this.createHeaders());
        return response.data;
    }

    async getUserLibrary()
    {
        const response = await axios.get<LibraryRecipeCard[]>(`${this.baseUrl}/api/recipe-list`, this.createHeaders());
        return response.data;

    }

    async getCustomRecipeById(id: number)
    {
        const response = await axios.get<Recipe>(`${this.baseUrl}/api/recipe-list/custom/${id}`, this.createHeaders());
        return response.data;
    }

    async addCustomRecipe(recipe: object)
    {
        const response = await axios.post<CustomRecipe>(`${this.baseUrl}/api/recipe-list/new-recipe`, recipe, this.createHeaders());
        return response.data;
    }

    async editCustomRecipe(recipe: any)
    {
        await axios.put<void>(`${this.baseUrl}/api/recipe-list/edit-recipe/${recipe.id}`, recipe, this.createHeaders());
    }

    async deleteCustomRecipe(recipe: Recipe)
    {
        await axios.delete<void>(`${this.baseUrl}/api/recipe-list/delete-recipe/${recipe.id}`, this.createHeaders());
    }

}

const recipesListService = new RecipesListService();
export default recipesListService;