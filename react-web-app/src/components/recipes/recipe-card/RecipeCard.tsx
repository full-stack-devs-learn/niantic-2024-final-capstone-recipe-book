export default function RecipeCard({title, image}: {title: string; image: string}) {
    return (
        <>
            <div className="card mb-3" style={{width: "250px"}}>
                <h3 className="card-header">{title}</h3>
                <img src={image} className="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" role="img" style={{ fontSize: "1.125rem", textAnchor: "middle" }} />
            </div>
        </>
    )
}