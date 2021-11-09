import React from "react";

import { usePomodoro } from "../hooks/usePomodoro";

const BreakInterval = () => {
    const { state, actions } = usePomodoro()

    return (
    <section className="flex flex-column">
        <h4>Break Interval</h4>
        <div className="flex">
            <button onClick={actions.downBreakInterval}>Down</button>
            <p className="digit">{ state.breakInterval }</p>
            <button onClick={actions.upBreakInterval}>Up</button>
        </div>
    </section>
    )
}

export default BreakInterval;