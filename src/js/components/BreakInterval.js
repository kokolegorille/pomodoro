import React from "react";

import { usePomodoro } from "../hooks/usePomodoro";

const BreakInterval = () => {
    const { state, actions } = usePomodoro()

    return (
    <section className="box flex flex-column">
        <h4>Break Interval : { state.breakInterval }</h4>
        <input 
            type="range" 
            value={state.breakInterval}
            onChange={e => actions.setBreakInterval(e.target.value)}
            min="1" 
            max="60"/>
    </section>
    )
}

export default BreakInterval;