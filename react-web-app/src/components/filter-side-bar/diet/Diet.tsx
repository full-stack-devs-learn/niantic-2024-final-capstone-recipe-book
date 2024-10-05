import { useState } from "react"

export default function Diet() {
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
                                    if (glutenFree) setGlutenFree(false);
                                    else setGlutenFree(true)
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
                                }} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            WHOLE30
                        </label>
                    </div>
                </div>

                <button className="submit btn btn-outline-primary">Apply Filter</button>
            </div>
            </form>
        </div>
    )
}