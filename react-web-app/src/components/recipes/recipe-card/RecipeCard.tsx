import { Link } from "react-router-dom";
import './RecipeCard.css';

export default function RecipeCard({ title, image, id, isCustom }: { title: string; image: string; id: number; isCustom: boolean }) {

    return (
        <>
            {
                +isCustom ? <Link className="card-title" to={`/recipes/${id}/details/${+isCustom}`}>
                    <div className="card border-0 mb-3">
                        <h4 className="card-header">{title}</h4>
                        <div className="image-wrapper">
                            <img src={image} className="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" role="img" style={{ fontSize: "1.125rem", textAnchor: "middle" }} />
                        </div>
                    </div>
                </Link>
                    :
                    <Link className="card-title" to={`/recipes/${id}/details`}>
                        <div className="card border-0 mb-3">
                            <h4 className="card-header">{title}</h4>
                            <div className="image-wrapper">
                                <img src={image} className="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" role="img" style={{ fontSize: "1.125rem", textAnchor: "middle" }} />
                            </div>
                        </div>
                    </Link>
            }
        </>
    )
}