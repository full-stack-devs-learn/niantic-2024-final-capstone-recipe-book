import RecipeCard from "../../recipes/recipe-card/RecipeCard";
import recipesListService from "../../../services/recipes-list-service";
import { FormEvent, useEffect, useState } from "react";
import { LibraryRecipeCard } from "../../../models/personal-library/library-recipe-card";
import './PersonalLibrary.css';
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function PersonalLibrary() {
    const [library, setLibrary] = useState<LibraryRecipeCard[]>([]);
    const [filteredLibrary, setFilteredLibrary] = useState<LibraryRecipeCard[]>([]);
    const [title, setTitle] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [action, setAction] = useState<string>('');
    const [search, setSearch] = useState<string>('');

    const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication)

    useEffect(() => {

        getLibrary();
        setSearch('')

    }, [action])

    async function getLibrary() {
        const libraryItems = await recipesListService.getUserLibrary();

        setLibrary(libraryItems);
    }

    async function addCustomRecipe(event: FormEvent) {
        event.preventDefault();

        let instructionsString = instructions.replace(/\n/g, "<br />\r\n");
        let ingredientsString = ingredients.replace(/\n/g, "<br />\r\n");

        const newRecipe = {
            title: title,
            image: imageUrl,
            instructions: instructionsString,
            extendedIngredients: ingredientsString
        }

        await recipesListService.addCustomRecipe(newRecipe);

        setFilteredLibrary([])
        setTitle('')
        setInstructions('')
        setIngredients('')
        setImageUrl('')
        setAction(newRecipe.title + newRecipe.extendedIngredients)


    }

    async function onSearch(event: FormEvent) {
        event?.preventDefault()
        const searchLibrary = library.filter((recipe: LibraryRecipeCard) =>
            (recipe.isCustom && recipe.customTitle?.toLowerCase().includes(search.toLowerCase())) || (recipe.externalTitle?.toLowerCase().includes(search.toLowerCase()))
        )
        setFilteredLibrary(searchLibrary)
        setAction('search')
    }


    return (
        <>
            <h1 className="greeting">{user?.username}'s Personal Library</h1>

            <main className="container">

                <div id="add-recipe">
                <button className="btn btn-info mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Recipe</button>
                </div>
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
                                        <div className="alert alert-info">
                                            <p className="alert-heading">Please format your ingredients into a list.</p>
                                            <p className="mb-0">
                                                Example <br />
                                                1. 3 Cups of Flour <br />
                                                2. 5 Tbs of Sugar
                                            </p>
                                        </div>
                                        <label className="form-label" htmlFor="title">Ingredients</label>
                                        <textarea className="form-control border-primary" name="title" id="title" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="title">Instructions</label>
                                        <textarea className="form-control border-primary" name="title" id="title" value={instructions} onChange={(e) => setInstructions(e.target.value)} />
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

                <form className="d-flex mt-4" >
                    <input type="text" className="form-control border-secondary me-sm-2" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button type="submit" className="btn btn-secondary my-2 my-sm-0" onClick={(e) => onSearch(e)}>Search</button>
                </form>

                <div className="card-container mt-4">
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
                </div>
            </main>
        </>
    )
}