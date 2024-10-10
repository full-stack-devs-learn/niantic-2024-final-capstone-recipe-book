import { useState, useEffect, FormEvent } from "react";
import spoonacularService from "../../../services/spoonacular-service";
import { Recipe } from "../../../models/recipe";
import { useNavigate, useParams } from "react-router-dom";
import recipesListService from "../../../services/recipes-list-service";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { LibraryRecipeCard } from "../../../models/personal-library/library-recipe-card";
import { Ingredient } from "../../../models/ingredient";
import parse from 'html-react-parser';

export default function RecipeDetails() {
    const [recipeData, setRecipeData] = useState<Recipe>();
    const [customRecipeData, setCustomRecipeData] = useState<Recipe>();
    const [title, setTitle] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [action, setAction] = useState<string>('');
    const { user } = useSelector((state: RootState) => state.authentication);
    const [userExternalLibrary, setUserExternalLibrary] = useState<any[]>([]);
    const [htmlInstructions, setHtmlInstructions] = useState<string>('');


    const params = useParams();
    const navigate = useNavigate();

    const id = params.id ?? 0;
    const custom = params.isCustom ?? 0;

    useEffect(() => {

        getRecipe();


        

    }, [action])

    async function getRecipe() {

        const library = await recipesListService.getUserLibrary();
        const externalLibrary = library.filter((card: LibraryRecipeCard) => !card.isCustom)
                                        .map((card: LibraryRecipeCard) => card.apiId)

        setUserExternalLibrary(externalLibrary)
                                    
        if (+custom == 0) {
            const selectedRecipe = await spoonacularService.getRecipeById(+id);
            setRecipeData(selectedRecipe);
            setHtmlInstructions(selectedRecipe.instructions);

            if (userExternalLibrary.includes(+id))
            {
                setAction('delete')
            }
            else
            {
                setAction('add')
            }            
        }

        else {
            const selectedCustomRecipe = await recipesListService.getCustomRecipeById(+id)
            setCustomRecipeData(selectedCustomRecipe);
            setHtmlInstructions(selectedCustomRecipe.instructions);
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
            extendedIngredients: ingredients ? ingredients : customRecipeData!.extendedIngredients,
        }

        await recipesListService.editCustomRecipe(newRecipe);

        setAction(newRecipe.title + newRecipe.extendedIngredients);

    }

    async function deleteCustomRecipe(event: FormEvent)
    {
        event.preventDefault();

        await recipesListService.deleteCustomRecipe(+id);

        navigate(`/user/${user?.id}/library`);

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
        setAction('delete')
    }

    function deleteExternalRecipe(event: FormEvent) {
        event.preventDefault();
        event.stopPropagation();

        let externalId = 0;
        userExternalLibrary.forEach(
            (item: number[]) => {
                if (item[1] === +id){
                externalId = item[0]
            }})
                
        recipesListService.deleteExternalRecipe(externalId, +id)
        setAction('add')
    }

    return (
        <>
            <h3>{+custom ? customRecipeData?.title : recipeData?.title}</h3>

            <main className="container">
            <div>
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
                                                <textarea className="form-control border-primary" name="title" id="title" 
                                                    defaultValue={typeof customRecipeData?.extendedIngredients === 'string' ? customRecipeData?.extendedIngredients : ''} 
                                                    onChange={(e) => setIngredients(e.target.value)} />
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

                        <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete Recipe</button>
                        <div className="modal fade" id="deleteModal" tabIndex={-1} role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Delete Recipe</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"></span>
                                        </button>
                                    </div>
                                    
                                        <div className="modal-body">
                                            <p>WARNING! Deleting a custom recipe is permanent.</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary" onClick={(e) => deleteCustomRecipe(e)} data-bs-dismiss="modal">Delete Recipe</button>
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        </div>

                                </div>
                            </div>
                        </div>
                    </>
                    : (action == 'add')
                    ?
                    <button className="btn btn-info" onClick={(e) => addRecipeToLibrary(e)}>Add Recipe to Library</button>
                    :
                    <button className="btn btn-danger" onClick={(e) => deleteExternalRecipe(e)}>Remove Recipe from Library</button>
            }
            </div>

            <img src={+custom ? customRecipeData?.image : recipeData?.image} />

            <h5>Ingredients</h5>

            {
                !+custom && Array.isArray(recipeData?.extendedIngredients) 
                ? 
                recipeData.extendedIngredients.map((ingredient: Ingredient) => (
                    <>
                    <ul>
                        <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
                    </ul>
                    </>
                ))
                : <p>{customRecipeData?.extendedIngredients.toString()}</p>
            }

            <h5>Instructions</h5>
            {parse(htmlInstructions!)}
            </main>
        </>
    )
}  
