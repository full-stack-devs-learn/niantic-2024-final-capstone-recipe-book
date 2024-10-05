export default function TotalTime()
{
    return (
        <div id="prep-time-slider">
                <label htmlFor="customRange1" className="form-label">Total Time</label>
                <input type="range" className="form-range" min="0" max="120" step="10" id="customRange3" />
        </div>
    )
}