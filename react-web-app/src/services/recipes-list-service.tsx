import axios, { AxiosRequestConfig } from "axios";
import store, { RootState } from "../store/store";
import { Recipe } from "../models/recipe";
import { LibraryRecipeCard } from "../models/personal-library/library-recipe-card";

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

}

const recipesListService = new RecipesListService();
export default recipesListService;