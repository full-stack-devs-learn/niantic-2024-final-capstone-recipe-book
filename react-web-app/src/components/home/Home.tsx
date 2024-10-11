import honeyButterText from '../../assets/honeybutter-text-transparent.png';
import homeCharacters from '../../assets/home-characters.png';
import './Home.css'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div id="parent-home">

            <div id="background">
                <img id="characters" src={homeCharacters} height="930" width="1792" />
            </div>

            <div id="home-text">
                <img id="honey-text" src={honeyButterText} width="880" />
            </div>

            <div id="buttons">
                <Link to={"/recipes"}><button className='btn btn-secondary'>Find A Recipe</button></Link>
            </div>
        </div>
    )
}