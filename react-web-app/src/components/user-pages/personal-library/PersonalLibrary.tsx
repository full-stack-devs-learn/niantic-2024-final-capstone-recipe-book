import RecipeCard from "../../recipes/recipe-card/RecipeCard";
import recipesListService from "../../../services/recipes-list-service";
import { FormEvent, useEffect, useState } from "react";
import { LibraryRecipeCard } from "../../../models/personal-library/library-recipe-card";

export default function PersonalLibrary() {
    const firstName = 'Gregor';
    const lastName = 'Dzierzon';

    const [library, setLibrary] = useState<LibraryRecipeCard[]>([]);
    const [filteredLibrary, setFilteredLibrary] = useState<LibraryRecipeCard[]>([]);
    const [title, setTitle] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [action, setAction] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    useEffect(() => {

        getLibrary();
        setSearch('')

    }, [action])

    async function getLibrary() {
        const libraryItems = await recipesListService.getUserLibrary();

        setLibrary(libraryItems);
    }

    async function addCustomRecipe(event: FormEvent)
    {
        event.preventDefault();

        const newRecipe = {
            title: title,
            image: imageUrl,
            instructions: instructions,
            extendedIngredients: ingredients
        }

        await recipesListService.addCustomRecipe(newRecipe);

        setFilteredLibrary([])
        setTitle('')
        setInstructions('')
        setIngredients('')
        setImageUrl('')
        setAction(newRecipe.title + newRecipe.extendedIngredients)
        

    }

    async function onSearch(event: FormEvent)
    {
        event?.preventDefault()
        const searchLibrary = library.filter((recipe: LibraryRecipeCard) => 
            (recipe.isCustom && recipe.customTitle?.toLowerCase().includes(search.toLowerCase())) || (recipe.externalTitle?.toLowerCase().includes(search.toLowerCase()))
        )
        setFilteredLibrary(searchLibrary)
        setAction('search')
    }


    return (
        <>
            <h3>{firstName} {lastName}'s Personal Library</h3>

            <main className="container">

                <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Recipe</button>
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Recipe</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"></span>
                                </button>
                            </div>
                            <form>
                            <div className="modal-body">
                                    <div>
                                        <label className="form-label" htmlFor="title">Title</label>
                                        <input className="form-control border-primary" type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="title">Image URL</label>
                                        <input className="form-control border-warning" type="text" name="title" id="title" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} disabled />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="title">Ingredients</label>
                                        <textarea className="form-control border-primary" name="title" id="title" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="title">Instructions</label>
                                        <textarea className="form-control border-primary" name="title" id="title"  value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                                    </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" onClick={(e) => addCustomRecipe(e)} data-bs-dismiss="modal">Save Recipe</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

                <form className="d-flex" >
                    <input type="text" className="form-control me-sm-2" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <button type="submit" className="btn btn-secondary my-2 my-sm-0" onClick={(e) => onSearch(e)}>Search</button>
                </form>

                {
                    filteredLibrary.length == 0 
                    ?
                    library.map((recipe) => (
                        <RecipeCard key={recipe.id}
                            isCustom={recipe.isCustom}
                            title={recipe.isCustom ? recipe.customTitle! : recipe.externalTitle!}
                            image={recipe.isCustom ? recipe.customImage : recipe.externalImage}
                            id={recipe.isCustom ? recipe.customId : recipe.apiId} />
                    ))
                    : 
                    filteredLibrary.map((recipe: LibraryRecipeCard) => (
                        <RecipeCard key={recipe.id}
                            isCustom={recipe.isCustom}
                            title={recipe.isCustom ? recipe.customTitle! : recipe.externalTitle!}
                            image={recipe.isCustom ? recipe.customImage : recipe.externalImage}
                            id={recipe.isCustom ? recipe.customId : recipe.apiId} />
                    ))
                }
            </main>
        </>
    )
}