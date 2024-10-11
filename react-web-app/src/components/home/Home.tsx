import honeyButterText from '../../assets/honeybutter-text-transparent.png';
import homeCharacters from '../../assets/home-characters.png';
import './Home.css'
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div id="parent-home">
            {/* <div id="background" style={{backgroundImage: `url('${backgroundImage}')`, backgroundSize: 'cover'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet feugiat lectus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus tincidunt efficitur maximus. Praesent venenatis enim sit amet diam rhoncus, at blandit arcu dapibus. Integer iaculis, mi vitae ultricies cursus, urna ligula iaculis justo, pretium auctor metus lacus non tellus. Suspendisse potenti. Suspendisse porta, urna non convallis dictum, libero nisi sodales risus, eget efficitur nisi elit at odio. Mauris neque odio, accumsan vel erat et, luctus tincidunt augue. In id lectus bibendum, interdum ex mollis, consequat nisl. Nulla a sollicitudin enim, vitae consectetur diam. Nullam non enim in est cursus ultricies. Cras non urna leo. Etiam mi risus, auctor in ante id, volutpat dapibus metus. Duis ullamcorper vitae diam vel luctus. Integer gravida euismod libero vel varius. Phasellus imperdiet urna quis diam posuere condimentum.
        </div> */}

            <div id="background">
                <img id="characters" src={homeCharacters} height="930" width="1790" />
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