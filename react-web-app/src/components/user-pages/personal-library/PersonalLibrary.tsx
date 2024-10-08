import RecipeCard from "../../recipes/recipe-card/RecipeCard";
import recipesListService from "../../../services/recipes-list-service";
import spoonacularService from "../../../services/spoonacular-service";
import { useEffect, useState } from "react";
import { LibraryRecipeCard } from "../../../models/personal-library/library-recipe-card";

export default function PersonalLibrary() {
    const firstName = 'Gregor';
    const lastName = 'Dzierzon';

    const [library, setLibrary] = useState<LibraryRecipeCard[]>([]);

    useEffect(() => {

        getLibrary();

    }, [])

    async function getLibrary() {
        // internal API call
        const libraryItems = await recipesListService.getUserLibrary();

        setLibrary(libraryItems);

        // external API call

    }

    return (
        <>
            <h3>{firstName} {lastName}'s Personal Library</h3>

            <main className="container">

                <div>Preview Recipe Cards Here</div>

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
                            <div className="modal-body">
                                <form>
                                    <div>
                                        <label className="form-label" htmlFor="title">Title</label>
                                        <input className="form-control border-primary" type="text" name="title" id="title" />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="title">Image URL</label>
                                        <input className="form-control border-warning" type="text" name="title" id="title" disabled />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="title">Ingredients</label>
                                        <textarea className="form-control border-primary" name="title" id="title" />
                                    </div>
                                    <div>
                                        <label className="form-label" htmlFor="title">Instructions</label>
                                        <textarea className="form-control border-primary" name="title" id="title" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save Recipe</button>
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="d-flex" >
                    <input type="text" className="form-control me-sm-2" placeholder="Search" />
                    <button type="submit" className="btn btn-secondary my-2 my-sm-0">Search</button>
                </form>

                {
                    library.map((recipe) => (
                        <RecipeCard key={recipe.id}
                            isCustom={recipe.isCustom}
                            title={recipe.isCustom ? recipe.customTitle : recipe.externalTitle}
                            image={recipe.isCustom ? recipe.customImage : recipe.externalImage}
                            id={recipe.isCustom ? recipe.customId : recipe.apiId} />
                    ))
                }
            </main>
        </>
    )
}