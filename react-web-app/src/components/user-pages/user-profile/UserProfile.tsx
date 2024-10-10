import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import RecipeCard from "../../recipes/recipe-card/RecipeCard";
import recipesListService from "../../../services/recipes-list-service";
import { useState, useEffect } from "react";
import { LibraryRecipeCard } from "../../../models/personal-library/library-recipe-card";
import './UserProfile.css';

export default function UserProfile() {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication)
    const [preview, setPreview] = useState<LibraryRecipeCard[]>([]);

    let { id } = useParams();

    useEffect(() => {

        getPreview();

    }, [])

    async function getPreview() {
        const libraryItems = (await recipesListService.getUserLibrary()).slice(0, 4);

        setPreview(libraryItems);
    }

    return (
        <>
            <main>

                <section id="profile-card">
                    <h1>Hello {user?.username}!</h1>
                </section>

                <section id="library-section" className="mt-4">
                    <h3>Personal Library</h3>
                    <Link className="link" to={`/user/${id}/library`}><div className="button"><button className="btn btn-info mt-4">See All</button></div></Link>
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