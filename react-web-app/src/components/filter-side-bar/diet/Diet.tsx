import { FormEvent, useState } from "react"

export interface DietProps 
{
    onDietApply?: (query: string) => void
}


export default function Diet({onDietApply}: DietProps) {
    const [glutenFree, setGlutenFree] = useState<boolean>(false);
    const [ketogenic, setKetogenic] = useState<boolean>(false);
    const [vegetarian, setVegetarian] = useState<boolean>(false);
    const [lactoVegetarian, setLactoVegetarian] = useState<boolean>(false);
    const [ovoVegetarian, setOvoVegetarian] = useState<boolean>(false);
    const [vegan, setVegan] = useState<boolean>(false);
    const [pescetarian, setPescetarian] = useState<boolean>(false);
    const [paleo, setPaleo] = useState<boolean>(false);
    const [primal, setPrimal] = useState<boolean>(false);
    const [lowFodMap, setLowFodMap] = useState<boolean>(false);
    const [whole30, setWhole30] = useState<boolean>(false);

    const map = new Map<string, boolean>();
    const [dietMap, setDietMap] = useState<Map<string, boolean>>(map);

    const length = 11;
    const array = Array(length).fill(false);

    const [dietList, setDietList] = useState<boolean[]>(array);

    function dietQuery(event: FormEvent)
    {
        event.preventDefault();

        let dietQueryString = "&diet=";

        for (let key of dietMap.keys())
        {
            if (dietMap.get(key)) dietQueryString = dietQueryString + key + ','
        }

        console.log(dietQueryString)
        
        if (onDietApply) onDietApply(dietQueryString);
    }

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Diet
                </button>
            </h2>
            <form>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    // individual variable
                                    if (glutenFree) setGlutenFree(false);
                                    else setGlutenFree(true)
                                    
                                    // map 
                                    if (!dietMap.has("glutenFree")) dietMap.set("glutenFree", true);
                                    else if (dietMap.get("glutenFree")) dietMap.set("glutenFree", false);
                                    else dietMap.set("glutenFree", true);
                                    
                                    // array
                                    if (dietList[0]) dietList[0] = false;
                                    else dietList[0] = true;
                                    console.log(dietList[0])

                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Gluten Free
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    if (ketogenic) setKetogenic(false);
                                    else setKetogenic(true)

                                    if (!dietMap.has("ketogenic")) dietMap.set("ketogenic", true);
                                    else if (dietMap.get("ketogenic")) dietMap.set("ketogenic", false);
                                    else dietMap.set("ketogenic", true);

                                    let list = dietList;
                                    
                                    if (list[1]) list[1] = false;
                                    else list[1] = true;

                                    setDietList(list);
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Ketogenic
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    if (vegetarian) setVegetarian(false);
                                    else setVegetarian(true)

                                    if (!dietMap.has("vegetarian")) dietMap.set("vegetarian", true);
                                    else if (dietMap.get("vegetarian")) dietMap.set("vegetarian", false);
                                    else dietMap.set("vegetarian", true);

                                    let list = dietList;
                                    
                                    if (list[2]) list[2] = false;
                                    else list[2] = true;

                                    setDietList(list);
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Vegetarian
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    if (lactoVegetarian) setLactoVegetarian(false);
                                    else setLactoVegetarian(true)

                                    if (!dietMap.has("lacto-vegetarian")) dietMap.set("lacto-vegetarian", true);
                                    else if (dietMap.get("lacto-vegetarian")) dietMap.set("lacto-vegetarian", false);
                                    else dietMap.set("lacto-vegetarian", true);

                                    let list = dietList;
                                    
                                    if (list[3]) list[3] = false;
                                    else list[3] = true;

                                    setDietList(list);
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Lacto-Vegetarian
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    if (ovoVegetarian) setOvoVegetarian(false);
                                    else setOvoVegetarian(true)

                                    if (!dietMap.has("ovo-vegetarian")) dietMap.set("ovo-vegetarian", true);
                                    else if (dietMap.get("ovo-vegetarian")) dietMap.set("ovo-vegetarian", false);
                                    else dietMap.set("ovo-vegetarian", true);

                                    let list = dietList;
                                    
                                    if (list[4]) list[4] = false;
                                    else list[4] = true;

                                    setDietList(list);
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Ovo-Vegetarian
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    if (vegan) setVegan(false);
                                    else setVegan(true)

                                    if (!dietMap.has("vegan")) dietMap.set("vegan", true);
                                    else if (dietMap.get("vegan")) dietMap.set("vegan", false);
                                    else dietMap.set("vegan", true);

                                    let list = dietList;
                                    
                                    if (list[5]) list[5] = false;
                                    else list[5] = true;

                                    setDietList(list);
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Vegan
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    if (pescetarian) setPescetarian(false);
                                    else setPescetarian(true)

                                    if (!dietMap.has("pescetarian")) dietMap.set("pescetarian", true);
                                    else if (dietMap.get("pescetarian")) dietMap.set("pescetarian", false);
                                    else dietMap.set("pescetarian", true);

                                    let list = dietList;
                                    
                                    if (list[6]) list[6] = false;
                                    else list[6] = true;

                                    setDietList(list);
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Pescetarian
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    if (paleo) setPaleo(false);
                                    else setPaleo(true)

                                    if (!dietMap.has("paleo")) dietMap.set("paleo", true);
                                    else if (dietMap.get("paleo")) dietMap.set("paleo", false);
                                    else dietMap.set("paleo", true);

                                    let list = dietList;
                                    
                                    if (list[7]) list[7] = false;
                                    else list[7] = true;

                                    setDietList(list);
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Paleo
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    if (primal) setPrimal(false);
                                    else setPrimal(true)

                                    if (!dietMap.has("primal")) dietMap.set("primal", true);
                                    else if (dietMap.get("primal")) dietMap.set("primal", false);
                                    else dietMap.set("primal", true);

                                    let list = dietList;
                                    
                                    if (list[8]) list[8] = false;
                                    else list[8] = true;

                                    setDietList(list);
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Primal
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    if (lowFodMap) setLowFodMap(false);
                                    else setLowFodMap(true)

                                    if (!dietMap.has("lowFodMap")) dietMap.set("lowFodMap", true);
                                    else if (dietMap.get("lowFodMap")) dietMap.set("lowFodMap", false);
                                    else dietMap.set("lowFodMap", true);

                                    let list = dietList;
                                    
                                    if (list[9]) list[9] = false;
                                    else list[9] = true;

                                    setDietList(list);
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Low FODMAP
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
                                onClick={() => {
                                    if (whole30) setWhole30(false);
                                    else setWhole30(true)

                                    if (!dietMap.has("whole30")) dietMap.set("whole30", true);
                                    else if (dietMap.get("whole30")) dietMap.set("whole30", false);
                                    else dietMap.set("whole30", true);

                                    let list = dietList;
                                    
                                    if (list[10]) list[10] = false;
                                    else list[10] = true;

                                    setDietList(list);
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            WHOLE30
                        </label>
                    </div>
                </div>

                <button className="submit btn btn-outline-primary" onClick={(event) => dietQuery(event)}>Apply Filter</button>
            </div>
            </form>
        </div>
    )
}