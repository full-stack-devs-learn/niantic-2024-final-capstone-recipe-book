import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import RecipeCard from "../../recipes/recipe-card/RecipeCard";
import recipesListService from "../../../services/recipes-list-service";
import { useState, useEffect } from "react";
import { LibraryRecipeCard } from "../../../models/personal-library/library-recipe-card";
import './UserProfile.css';
import defaultProfilePic from '../../../assets/default-profile-pic-mint.png';

export default function UserProfile() {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication)
    const [preview, setPreview] = useState<LibraryRecipeCard[]>([]);
    const [numCustomRecipes, setNumCustomRecipes] = useState<number>(0);

    let { id } = useParams();

    useEffect(() => {

        getPreview();

    }, [])

    async function getPreview() {
        const libraryItems = await recipesListService.getUserLibrary();
        const filteredCustomRecipes = libraryItems.filter((recipe: LibraryRecipeCard) => recipe.isCustom);
        const slicedLibrary = libraryItems.slice(0, 4)

        setNumCustomRecipes(filteredCustomRecipes.length);
        setPreview(slicedLibrary);
    }

    return (
        <>
            <main>

                <section id="profile-card" className="container mt-5">
                    <div>
                        <img id="profile-pic" src={defaultProfilePic} width="300" height="300" />
                    </div>

                    <div id="user-info">
                        <h1 id="user-name">Hello {user?.username}!</h1>
                        <p id="user-stats"><strong>Role:</strong> User <br />
                        {numCustomRecipes} Custom Recipes</p>
                        <h6>About Me</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida nulla odio, sit amet condimentum quam congue quis. Integer ut diam faucibus, suscipit lacus semper, faucibus est. Aenean lacinia mattis ante nec fermentum. Pellentesque vitae lobortis risus. Phasellus pharetra mattis leo, a sagittis quam euismod sit amet. Aliquam sit amet nibh nisl.</p>
                    </div>
                </section>

                <section id="library-section" className="container mt-5">
                    <h3>Personal Library</h3>
                    <Link className="link" to={`/user/${id}/library`}><div className="button"><button className="btn btn-secondary mt-3">See All Recipes</button></div></Link>
                    <div className="mt-4" id="preview">
                        {
                            preview.map((recipe) => (
                                <RecipeCard key={recipe.id}
                                    isCustom={recipe.isCustom}
                                    title={recipe.isCustom ? recipe.customTitle! : recipe.externalTitle!}
                                    image={recipe.isCustom ? recipe.customImage : recipe.externalImage}
                                    id={recipe.isCustom ? recipe.customId : recipe.apiId} />
                            ))
                        }
                        
                    </div>
                </section>

            </main>
        </>
    )
}