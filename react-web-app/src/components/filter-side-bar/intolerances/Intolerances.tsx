import { FormEvent, useState } from "react";

export default function Intolerances(props: {onIntoleranceApply: any}) {

    const map = new Map<string, boolean>();
    const [intolerancesMap, setIntolerancesMap] = useState<Map<string, boolean>>(map);

    function intoleranceQuery(event: FormEvent)
    {
        event.preventDefault();

        let intoleranceQueryString = "&intolerances=";

        for (let key of intolerancesMap.keys())
        {
            if (intolerancesMap.get(key)) intoleranceQueryString = intoleranceQueryString + key + ','
        }

        if (intoleranceQueryString === "&intolerances=") intoleranceQueryString = ""

        if (props.onIntoleranceApply) props.onIntoleranceApply(intoleranceQueryString);
    }

    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Intolerances
                </button>
            </h2>
            <form>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDairy" 
                        onClick={() => {
                            if (!intolerancesMap.has("dairy")) intolerancesMap.set("dairy", true);
                            else if (intolerancesMap.get("dairy")) intolerancesMap.set("dairy", false);
                            else intolerancesMap.set("dairy", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckDairy">
                            Dairy
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckEgg" 
                        onClick={() => {
                            if (!intolerancesMap.has("egg")) intolerancesMap.set("egg", true);
                            else if (intolerancesMap.get("egg")) intolerancesMap.set("egg", false);
                            else intolerancesMap.set("egg", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckEgg">
                            Egg
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckGluten" 
                        onClick={() => {
                            if (!intolerancesMap.has("gluten")) intolerancesMap.set("gluten", true);
                            else if (intolerancesMap.get("gluten")) intolerancesMap.set("gluten", false);
                            else intolerancesMap.set("gluten", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckGluten">
                            Gluten
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckGrain" 
                        onClick={() => {
                            if (!intolerancesMap.has("grain")) intolerancesMap.set("grain", true);
                            else if (intolerancesMap.get("grain")) intolerancesMap.set("grain", false);
                            else intolerancesMap.set("grain", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckGrain">
                            Grain
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckPeanut" 
                        onClick={() => {
                            if (!intolerancesMap.has("peanut")) intolerancesMap.set("peanut", true);
                            else if (intolerancesMap.get("peanut")) intolerancesMap.set("peanut", false);
                            else intolerancesMap.set("peanut", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckPeanut">
                            Peanut
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckSeafood" 
                        onClick={() => {
                            if (!intolerancesMap.has("seafood")) intolerancesMap.set("seafood", true);
                            else if (intolerancesMap.get("seafood")) intolerancesMap.set("seafood", false);
                            else intolerancesMap.set("seafood", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckSeafood">
                            Seafood
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckSesame" 
                        onClick={() => {
                            if (!intolerancesMap.has("sesame")) intolerancesMap.set("sesame", true);
                            else if (intolerancesMap.get("sesame")) intolerancesMap.set("sesame", false);
                            else intolerancesMap.set("sesame", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckSesame">
                            Sesame
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckShellfish" 
                        onClick={() => {
                            if (!intolerancesMap.has("shellfish")) intolerancesMap.set("shellfish", true);
                            else if (intolerancesMap.get("shellfish")) intolerancesMap.set("shellfish", false);
                            else intolerancesMap.set("shellfish", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckShellfish">
                            Shellfish
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckSoy" 
                        onClick={() => {
                            if (!intolerancesMap.has("soy")) intolerancesMap.set("soy", true);
                            else if (intolerancesMap.get("soy")) intolerancesMap.set("soy", false);
                            else intolerancesMap.set("soy", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckSoy">
                            Soy
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckSulfite" 
                        onClick={() => {
                            if (!intolerancesMap.has("sulfite")) intolerancesMap.set("sulfite", true);
                            else if (intolerancesMap.get("sulfite")) intolerancesMap.set("sulfite", false);
                            else intolerancesMap.set("sulfite", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckSulfite">
                            Sulfite
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckTreeNut" 
                        onClick={() => {
                            if (!intolerancesMap.has("tree-nut")) intolerancesMap.set("tree-nut", true);
                            else if (intolerancesMap.get("tree-nut")) intolerancesMap.set("tree-nut", false);
                            else intolerancesMap.set("tree-nut", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckTreeNut">
                            Tree Nut
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckWheat" 
                        onClick={() => {
                            if (!intolerancesMap.has("wheat")) intolerancesMap.set("wheat", true);
                            else if (intolerancesMap.get("wheat")) intolerancesMap.set("wheat", false);
                            else intolerancesMap.set("wheat", true);
                        }}/>
                        <label className="form-check-label" htmlFor="flexCheckWheat">
                            Wheat
                        </label>
                    </div>
                </div>
                <button className="submit btn btn-primary ms-4 mb-4" onClick={(event) => intoleranceQuery(event)}>Apply Filter</button>
            </div>
            </form>
        </div>
    )
}