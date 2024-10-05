import { useState } from 'react';
import './FilterSideBar.css';
import TotalTime from './total-time/TotalTime';
import Cuisine from './cuisine/Cuisine';
import Diet from './diet/Diet';
import Intolerances from './intolerances/Intolerances';

export default function FilterSideBar(props: {onFiltered:(value: string) => void})
{
    const [query, setQuery] = useState<string>("");
    const [totalTime, setTotalTime] = useState<string>("");
    const [diet, setDiet] = useState<string>("");
    const [cuisine, setCuisine] = useState<string>("");
    const [intolerances, setIntolerances] = useState<string>("");

    function buildQueryString()
    {
        // how to pull checkboxes checked after form submission to build query string
        // how to get values from number range slider
    }

    return (
        <aside>
            <h3>Filters</h3>

            {/* <form onSubmit={() => buildQueryString()}> */}

            <TotalTime />


            <div className="accordion" id="accordionExample">
                <Cuisine />
                <Diet />
                <Intolerances />
            </div>

            <button className="submit btn btn-outline-primary">Submit</button>

            {/* </form> */}
        </aside>
    )
}