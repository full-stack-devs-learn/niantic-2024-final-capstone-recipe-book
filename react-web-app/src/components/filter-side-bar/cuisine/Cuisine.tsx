import { FormEvent, useState } from "react";

export default function Cuisine(props: {onCuisineApply: any}) {

    const map = new Map<string, boolean>();
    const [cuisineMap, setCuisineMap] = useState<Map<string, boolean>>(map);

    function cuisineQuery(event: FormEvent)
    {
        event.preventDefault();

        let cuisineQueryString = "&cuisine=";

        for (let key of cuisineMap.keys())
        {
            if (cuisineMap.get(key)) cuisineQueryString = cuisineQueryString + key + ','
        }

        if (cuisineQueryString === "&cuisine=") cuisineQueryString = ""

        if (props.onCuisineApply) props.onCuisineApply(cuisineQueryString);
    }
    
    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Cuisine
                </button>
            </h2>
            <form>
            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("african")) cuisineMap.set("african", true);
                            else if (cuisineMap.get("african")) cuisineMap.set("african", false);
                            else cuisineMap.set("african", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            African
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("asian")) cuisineMap.set("asian", true);
                            else if (cuisineMap.get("asian")) cuisineMap.set("asian", false);
                            else cuisineMap.set("asian", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Asian
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("american")) cuisineMap.set("american", true);
                            else if (cuisineMap.get("american")) cuisineMap.set("american", false);
                            else cuisineMap.set("american", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            American
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("british")) cuisineMap.set("british", true);
                            else if (cuisineMap.get("british")) cuisineMap.set("british", false);
                            else cuisineMap.set("british", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            British
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("cajun")) cuisineMap.set("cajun", true);
                            else if (cuisineMap.get("cajun")) cuisineMap.set("cajun", false);
                            else cuisineMap.set("cajun", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Cajun
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("caribbean")) cuisineMap.set("caribbean", true);
                            else if (cuisineMap.get("caribbean")) cuisineMap.set("caribbean", false);
                            else cuisineMap.set("caribbean", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Caribbean
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("chinese")) cuisineMap.set("chinese", true);
                            else if (cuisineMap.get("chinese")) cuisineMap.set("chinese", false);
                            else cuisineMap.set("chinese", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Chinese
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("eastern-european")) cuisineMap.set("eastern-european", true);
                            else if (cuisineMap.get("eastern-european")) cuisineMap.set("eastern-european", false);
                            else cuisineMap.set("eastern-european", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Eastern European
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("european")) cuisineMap.set("european", true);
                            else if (cuisineMap.get("european")) cuisineMap.set("european", false);
                            else cuisineMap.set("european", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            European
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("french")) cuisineMap.set("french", true);
                            else if (cuisineMap.get("french")) cuisineMap.set("french", false);
                            else cuisineMap.set("french", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            French
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("german")) cuisineMap.set("german", true);
                            else if (cuisineMap.get("german")) cuisineMap.set("german", false);
                            else cuisineMap.set("german", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            German
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("greek")) cuisineMap.set("greek", true);
                            else if (cuisineMap.get("greek")) cuisineMap.set("greek", false);
                            else cuisineMap.set("greek", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Greek
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("indian")) cuisineMap.set("indian", true);
                            else if (cuisineMap.get("indian")) cuisineMap.set("indian", false);
                            else cuisineMap.set("indian", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Indian
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("irish")) cuisineMap.set("irish", true);
                            else if (cuisineMap.get("irish")) cuisineMap.set("irish", false);
                            else cuisineMap.set("irish", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Irish
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("italian")) cuisineMap.set("italian", true);
                            else if (cuisineMap.get("italian")) cuisineMap.set("italian", false);
                            else cuisineMap.set("italian", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Italian
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("japanese")) cuisineMap.set("japanese", true);
                            else if (cuisineMap.get("japanese")) cuisineMap.set("japanese", false);
                            else cuisineMap.set("japanese", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Japanese
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("jewish")) cuisineMap.set("jewish", true);
                            else if (cuisineMap.get("jewish")) cuisineMap.set("jewish", false);
                            else cuisineMap.set("jewish", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Jewish
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("korean")) cuisineMap.set("korean", true);
                            else if (cuisineMap.get("korean")) cuisineMap.set("korean", false);
                            else cuisineMap.set("korean", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Korean
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("latin-american")) cuisineMap.set("latin-american", true);
                            else if (cuisineMap.get("latin-american")) cuisineMap.set("latin-american", false);
                            else cuisineMap.set("latin-american", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Latin American
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("mediterranean")) cuisineMap.set("mediterranean", true);
                            else if (cuisineMap.get("mediterranean")) cuisineMap.set("mediterranean", false);
                            else cuisineMap.set("mediterranean", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Mediterranean
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("mexican")) cuisineMap.set("mexican", true);
                            else if (cuisineMap.get("mexican")) cuisineMap.set("mexican", false);
                            else cuisineMap.set("mexican", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Mexican
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("middle-eastern")) cuisineMap.set("middle-eastern", true);
                            else if (cuisineMap.get("middle-eastern")) cuisineMap.set("middle-eastern", false);
                            else cuisineMap.set("middle-eastern", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Middle Eastern
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("nordic")) cuisineMap.set("nordic", true);
                            else if (cuisineMap.get("nordic")) cuisineMap.set("nordic", false);
                            else cuisineMap.set("nordic", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Nordic
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("southern")) cuisineMap.set("southern", true);
                            else if (cuisineMap.get("southern")) cuisineMap.set("southern", false);
                            else cuisineMap.set("southern", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Southern
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("spanish")) cuisineMap.set("spanish", true);
                            else if (cuisineMap.get("spanish")) cuisineMap.set("spanish", false);
                            else cuisineMap.set("spanish", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Spanish
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("thai")) cuisineMap.set("thai", true);
                            else if (cuisineMap.get("thai")) cuisineMap.set("thai", false);
                            else cuisineMap.set("thai", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Thai
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input cuisine-check" type="checkbox" value="" id="flexCheckDefault" 
                        onClick={() => {
                            if (!cuisineMap.has("vietnamese")) cuisineMap.set("vietnamese", true);
                            else if (cuisineMap.get("vietnamese")) cuisineMap.set("vietnamese", false);
                            else cuisineMap.set("vietnamese", true);
                        }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Vietnamese
                        </label>
                    </div>
                </div>
                <button className="submit btn btn-outline-primary" onClick={(event) => cuisineQuery(event)}>Apply Filter</button>
            </div>
            </form>
        </div>
    )
}