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

        if (cuisine)
        {
            str = str + cuisine;
        }

        if (totalTime)
        {
            str = str + totalTime;
        }
        
        props.onFiltered(str);
    }

    useEffect(() => {
        buildQueryString();
    }, [diet, intolerances, cuisine, totalTime])

    return (
        <aside>
            <h3>Filters</h3>

            <TotalTime onTotalTimeApply={(totalTimeString: string) => {
                    setTotalTime(totalTimeString);
                }} />


            <div className="accordion" id="accordionExample">
                <Cuisine onCuisineApply={(cuisineString: string) => {
                    setCuisine(cuisineString);
                }} />
                <Diet onDietApply={(dietString: string) => 
                    {
                        setDiet(dietString);
                    }} />
                <Intolerances onIntoleranceApply={(intoleranceString: string) =>
                {
                    setIntolerances(intoleranceString);
                }}/>
            </div>
        </aside>
    )
}