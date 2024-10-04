export default function RecipeCard({title, image}) {
    return (
        <>
            <div className="card mb-3">
                <h3 className="card-header">{title}</h3>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                </div>
                <svg xmlns={image} className="d-block user-select-none" width="100%" height="200" aria-label="Placeholder: Image cap" focusable="false" role="img" preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180" style={{ fontSize: "1.125rem", textAnchor: "middle" }}>
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>
                </svg>
            </div>
        </>
    )
}