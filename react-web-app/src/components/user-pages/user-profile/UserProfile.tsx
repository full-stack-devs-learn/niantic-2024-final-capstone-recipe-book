import { Link, useParams } from "react-router-dom";

export default function UserProfile()
{
    const firstName = 'Gregor';
    const lastName = 'Dzierzon';

    let {id} = useParams()

    return (
        <>
        <main>

        <section id="profile-card">
            <h3>User Profile</h3>
            <p>Hello {firstName} {lastName}!</p>
        </section>

        <section id="library-section">
            <h3>Personal Library</h3>
            <Link to={`/user/${id}/library`}><button>See All</button></Link>
            <div>Preview Recipe Cards Here</div>
        </section>
        
        </main>
        </>
    )
}