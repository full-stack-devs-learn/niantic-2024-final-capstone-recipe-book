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
import './RecipeDetails.css';

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
    const [htmlIngredients, setHtmlIngredients] = useState<string>('');


    const params = useParams();
    const navigate = useNavigate();

    const id = params.id ?? 0;
    const custom = params.isCustom ?? 0;

    useEffect(() => {

        getRecipe();
        console.log("START: ", action)

    }, [action])

    async function getRecipe() {

        const library = await recipesListService.getUserLibrary();
        const externalLibrary = library.filter((card: LibraryRecipeCard) => !card.isCustom)
            .map((card: LibraryRecipeCard) => [card.id, card.apiId])

        setUserExternalLibrary(externalLibrary)

        if (+custom == 0) {
            const selectedRecipe = await spoonacularService.getRecipeById(+id);
            setRecipeData(selectedRecipe);
            setHtmlInstructions(selectedRecipe.instructions);

            const isThere = userExternalLibrary.filter((idList: number[]) => idList[1] === +id)

            if (isThere.length > 0)
            {
                setAction('delete')
                console.log("delete start")
            }
            else {
                setAction('add')
                console.log("add start")
            }
        }

        else {
            const selectedCustomRecipe = await recipesListService.getCustomRecipeById(+id)
            setCustomRecipeData(selectedCustomRecipe);
            setHtmlInstructions(selectedCustomRecipe.instructions);
            setHtmlIngredients(typeof selectedCustomRecipe.extendedIngredients === "string" ? selectedCustomRecipe.extendedIngredients : "no ingredients")
        }
    }

    async function editCustomRecipe(event: FormEvent) {
        event.preventDefault();

        let instructionsString = instructions.replace(/\n/g, "<br />\r\n");
        let ingredientsString = ingredients.replace(/\n/g, "<br />\r\n");

        const newRecipe = {
            id: +id,
            title: title ? title : customRecipeData!.title,
            image: imageUrl ? imageUrl : customRecipeData!.image,
            instructions: instructions ? instructionsString : customRecipeData!.instructions,
            extendedIngredients: ingredients ? ingredientsString : customRecipeData!.extendedIngredients,
        }

        await recipesListService.editCustomRecipe(newRecipe);

        setAction(newRecipe.title + newRecipe.instructions + newRecipe.image + newRecipe.extendedIngredients);

    }

    async function deleteCustomRecipe(event: FormEvent) {
        event.preventDefault();

        await recipesListService.deleteCustomRecipe(+id);

        navigate(`/user/${user?.id}/library`);

    }

    function addRecipeToLibrary(event: FormEvent) {
        event.preventDefault();
        // event.stopPropagation();

        const addRecipe = {
            apiId: +id,
            title: recipeData?.title,
            image: recipeData?.image
        }

        console.log("add recipe to lib")

        recipesListService.addRecipeFromExternalAPI(addRecipe)
        setAction('delete')
    }

    function deleteExternalRecipe(event: FormEvent) {
        event.preventDefault();
        // event.stopPropagation();

        let externalId = 0;
        userExternalLibrary.forEach(
            (item: number[]) => {
                if (item[1] === +id) {
                    externalId = item[0]
                }
        })

        console.log("1")


        recipesListService.deleteExternalRecipe(externalId, +id)
        setAction('delete recipe to lib')
    }

    return (
        <>
            <h1>{+custom ? customRecipeData?.title : recipeData?.title}</h1>

            <main className="container">
                <div>
                    {
                        +custom ?
                            <>
                                <div className="buttons">
                                    <button className="btn btn-primary m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Recipe</button>
                                    <button className="btn btn-secondary m-1" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete Recipe</button>
                                </div>
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
                                                    <div className="alert alert-info">
                                                        <p className="alert-heading">Please format your ingredients into a list.</p>
                                                        <p className="mb-0">
                                                            Example <br />
                                                            1. 3 Cups of Flour <br />
                                                            2. 5 Tbs of Sugar
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <label className="form-label" htmlFor="title">Title</label>
                                                        <input className="form-control border-primary" type="text" name="title" id="title" defaultValue={customRecipeData?.title} onChange={(e) => setTitle(e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <label className="form-label" htmlFor="title">Image URL</label>
                                                        <input className="form-control border-primary" type="text" name="title" id="title" defaultValue={customRecipeData?.image} onChange={(e) => setImageUrl(e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <label className="form-label" htmlFor="title">Ingredients</label>
                                                        <textarea className="form-control border-primary" name="title" id="title"
                                                            defaultValue={typeof customRecipeData?.extendedIngredients === 'string' ? customRecipeData?.extendedIngredients.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, "") : ''}
                                                            onChange={(e) => setIngredients(e.target.value)} />
                                                    </div>
                                                    <div>
                                                        <label className="form-label" htmlFor="title">Instructions</label>
                                                        <textarea className="form-control border-primary" name="title" id="title" defaultValue={customRecipeData?.instructions.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, "")} onChange={(e) => setInstructions(e.target.value)} />
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
                                <div className="buttons">
                                    <button className="btn btn-primary" onClick={(e) => addRecipeToLibrary(e)}>Add Recipe to Library</button>
                                </div>
                                :
                                <div className="buttons">
                                    <button className="btn btn-secondary" onClick={(e) => deleteExternalRecipe(e)}>Remove Recipe from Library</button>
                                </div>
                    }
                </div>

                <div className="image mt-3">
                    <img src={+custom ? customRecipeData?.image : recipeData?.image} />
                </div>

                <section className="mt-4 details">
                    <h3 className="details-title">Ingredients</h3>

                    <div className="details-body">
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
                                : <p>{parse(htmlIngredients)}</p>
                        }
                    </div>
                </section>

                <section className="mt-4 details">
                    <h3 className="details-title">Instructions</h3>
                    <div className="details-body">
                        {parse(htmlInstructions!)}
                    </div>
                </section>
            </main>
        </>
    )
}  
