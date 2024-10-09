import { Link } from "react-router-dom";

export default function RecipeCard({ title, image, id, isCustom }: { title: string; image: string; id: number; isCustom: boolean }) {

    console.log(+isCustom, "custom")
    console.log(id, "id")

    return (
        <>
            {
                +isCustom ? <Link to={`/recipes/${id}/details/${+isCustom}`}>
                    <div className="card mb-3" style={{ width: "250px" }}>
                        <h3 className="card-header">{title}</h3>
                        <img src={image} className="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" role="img" style={{ fontSize: "1.125rem", textAnchor: "middle" }} />
                    </div>
                </Link>
                    :
                    <Link to={`/recipes/${id}/details`}>
                        <div className="card mb-3" style={{ width: "250px" }}>
                            <h3 className="card-header">{title}</h3>
                            <img src={image} className="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" role="img" style={{ fontSize: "1.125rem", textAnchor: "middle" }} />
                        </div>
                    </Link>
            }
        </>
    )
}