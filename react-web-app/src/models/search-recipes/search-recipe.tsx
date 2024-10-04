import { SearchResults } from "./search-results";

export class SearchRecipe 
{
    offset!: number;
    number!: number;
    results!: SearchResults[];
    totalResults!: number;
}