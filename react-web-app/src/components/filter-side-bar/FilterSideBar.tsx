import { useEffect, useState } from 'react';
import './FilterSideBar.css';
import TotalTime from './total-time/TotalTime';
import Cuisine from './cuisine/Cuisine';
import Diet from './diet/Diet';
import Intolerances from './intolerances/Intolerances';

export default function FilterSideBar(props: {onFiltered:(value: string) => void})
{
    const [totalTime, setTotalTime] = useState<string>("");
    const [diet, setDiet] = useState<string>("");
    const [cuisine, setCuisine] = useState<string>("");
    const [intolerances, setIntolerances] = useState<string>("");

    function buildQueryString()
    {
        let str = "";

        if (diet)
        {
            str = str + diet;
        } 

        if (intolerances)
        {
            str = str + intolerances;
        }
        
        props.onFiltered(str);
    }

    useEffect(() => {
        buildQueryString();
    }, [diet, intolerances])

    return (
        <aside>
            <h3>Filters</h3>

            <TotalTime />


            <div className="accordion" id="accordionExample">
                <Cuisine />
                <Diet onDietApply={(dietString: string) => 
                    {
                        setDiet(dietString);
                    }} />
                <Intolerances onIntoleranceApply={(intoleranceString: string) =>
                {
                    setIntolerances(intoleranceString);
                }}/>
            </div>

            <button className="submit btn btn-outline-primary">Submit</button>
        </aside>
    )
}