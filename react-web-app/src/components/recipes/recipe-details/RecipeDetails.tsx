import { useState, useEffect, FormEvent } from "react";
import spoonacularService from "../../../services/spoonacular-service";
import { Recipe } from "../../../models/recipe";
import { useParams } from "react-router-dom";
import recipesListService from "../../../services/recipes-list-service";

export default function RecipeDetails() {
    const [recipeData, setRecipeData] = useState<Recipe>();
    const [customRecipeData, setCustomRecipeData] = useState<Recipe>();
    const [title, setTitle] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [action, setAction] = useState<string>('');


    const params = useParams();

    const id = params.id ?? 0;
    const custom = params.isCustom ?? 0;

    console.log(custom, " details")

    useEffect(() => {

        getRecipe();

    }, [action])

    async function getRecipe() {
        if (+custom == 0) {
            const selectedRecipe = await spoonacularService.getRecipeById(+id);
            setRecipeData(selectedRecipe);
            
        }
        else {
            const selectedCustomRecipe = await recipesListService.getCustomRecipeById(+id)
            setCustomRecipeData(selectedCustomRecipe);
        } 
    }

    async function editCustomRecipe(event: FormEvent)
    {
        event.preventDefault();

        const newRecipe = {
            id: +id,
            title: title ? title : customRecipeData!.title,
            image: imageUrl ? imageUrl : customRecipeData!.image,
            instructions: instructions ? instructions : customRecipeData!.instructions,
            ingredients: ingredients ? ingredients : customRecipeData!.extendedIngredients,
        }

        await recipesListService.editCustomRecipe(newRecipe);

        setAction(newRecipe.title + newRecipe.ingredients);

    }

    function addRecipeToLibrary(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();

        const addRecipe = {
            apiId: +id,
            title: recipeData?.title,
            image: recipeData?.image
        }
        recipesListService.addRecipeFromExternalAPI(addRecipe)
    }

    return (
        <>
            <h3>{+custom ? customRecipeData?.title : recipeData?.title}</h3>
            <main className="container">
            {
                +custom ?
                    <>
                        <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Recipe</button>
                        <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Recipe</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"></span>
                                        </button>
                                    </div>
                                    <form>
                                        <div className="modal-body">
                                            <div>
                                                <label className="form-label" htmlFor="title">Title</label>
                                                <input className="form-control border-primary" type="text" name="title" id="title" defaultValue={customRecipeData?.title} onChange={(e) => setTitle(e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="form-label" htmlFor="title">Image URL</label>
                                                <input className="form-control border-warning" type="text" name="title" id="title" defaultValue={customRecipeData?.image} onChange={(e) => setImageUrl(e.target.value)} disabled />
                                            </div>
                                            <div>
                                                <label className="form-label" htmlFor="title">Ingredients</label>
                                                <textarea className="form-control border-primary" name="title" id="title" defaultValue={customRecipeData?.extendedIngredients} onChange={(e) => setIngredients(e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="form-label" htmlFor="title">Instructions</label>
                                                <textarea className="form-control border-primary" name="title" id="title" defaultValue={customRecipeData?.instructions} onChange={(e) => setInstructions(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary" onClick={(e) => editCustomRecipe(e)} data-bs-dismiss="modal">Save Recipe</button>
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </form> 
                                </div>
                            </div>
                        </div>
                    </>
                    : <button className="btn btn-info" onClick={(e) => addRecipeToLibrary(e)}>Add Recipe to Library</button>
            }
            <h5>Instructions</h5>
            <p>{+custom ? customRecipeData?.instructions : recipeData?.instructions}</p>
            <img src={+custom ? customRecipeData?.image : recipeData?.image} />
            </main>
        </>
    )
}  
