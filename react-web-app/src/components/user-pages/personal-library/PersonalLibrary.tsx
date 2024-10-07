export default function PersonalLibrary()
{
    const firstName = 'Gregor';
    const lastName = 'Dzierzon';

    return (
        <>
        <h3>{firstName} {lastName}'s Personal Library</h3>

        <main className="container">

        <div>Preview Recipe Cards Here</div>
        <button className="btn btn-info">Add Recipe</button>
        <form className="d-flex" >
            <input type="text" className="form-control me-sm-2" placeholder="Search" />
            <button type="submit" className="btn btn-secondary my-2 my-sm-0">Search</button> 
        </form>

        </main>
        </>
    )
}