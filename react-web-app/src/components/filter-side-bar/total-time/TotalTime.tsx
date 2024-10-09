import { FormEvent, useState } from 'react';

export default function TotalTime(props: {onTotalTimeApply: any}) {

  const [ value, setValue ] = useState(0);

  function totalTimeQuery(event: FormEvent)
  {
      event.preventDefault();

      let totalTimeQueryString = "&maxReadyTime=" + value;

      if (totalTimeQueryString === "&maxReadyTime=") totalTimeQueryString = ""

      if (props.onTotalTimeApply) props.onTotalTimeApply(totalTimeQueryString);
  };

  return (
        <form>
        <div id="prep-time-slider">
                <label htmlFor="customRange1" className="form-label">Total Time</label>
                <p>Time: {value} minutes</p>
                <input type="range" className="form-range" min="0" max="120" step="10" defaultValue={0} id="totalTimeRange" onChange={(e) => {
                    setValue(+e.target.value)
                    
                }
                }/>
                <output id="totalTimeOutput"></output>
        </div>
        <button className="submit btn btn-outline-primary" onClick={(event) => totalTimeQuery(event)}>Apply</button>
        </form>
    )

};

