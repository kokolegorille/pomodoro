import React from "react";

import { usePomodoro } from "../hooks/usePomodoro";

const SessionLength = () => {
    const { state, actions } = usePomodoro()

    return (
    <section className="flex flex-column">
        <h4>Session Length</h4>
        <div className="flex">
            <button onClick={actions.downSessionLength}>Down</button>
            <p className="digit">{ state.sessionLength }</p>
            <button onClick={actions.upSessionLength}>Up</button>
        </div>
    </section>
    )
}

export default SessionLength;