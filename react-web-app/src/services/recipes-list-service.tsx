import axios, { AxiosRequestConfig } from "axios";
import store, { RootState } from "../store/store";
import { SearchResults } from "../models/search-recipes/search-results";

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


    async addRecipeFromExternalAPI(id: number)
    {
        const response = await axios.post<number>(`${this.baseUrl}/api/recipe-list/add`, id, this.createHeaders());
        return response.data;
    }

    async getUserLibrary()
    {
        const response = await axios.get<SearchResults[]>(`${this.baseUrl}/api/recipe-list `, this.createHeaders());
        return response.data;

    }

}

const recipesListService = new RecipesListService();
export default recipesListService;