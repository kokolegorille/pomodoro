import React from "react";

import { usePomodoro } from "../hooks/usePomodoro";

const SessionLength = () => {
    const { state, actions } = usePomodoro()

    return (
    <section className="box flex flex-column">
        <h4>Session Length : { state.sessionLength }</h4>
        <input 
            type="range" 
            value={state.sessionLength}
            onChange={e => actions.setSessionLength(e.target.value)}
            min="1" 
            max="60"/>
    </section>
    )
}

export default SessionLength;