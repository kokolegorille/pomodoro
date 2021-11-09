import React from "react";

import { usePomodoro } from "../hooks/usePomodoro";

const Timer = () => {
    const { state } = usePomodoro()

    const seconds = state.timerSeconds === 0 ? '00' : 
        state.timerSeconds < 10 ? 
            `0${state.timerSeconds}` : state.timerSeconds

    let className = "timer flex flex-column"
    className += state.inSession ? 
        " in-session" :
        " in-break"

    return (
    <section className={className}>
        <h4>{ state.inSession ? 'Working Session' : 'Break Time!' }</h4>
        <p>Completed : {state.sessionCount}</p>
        <p>{ state.timerMinutes}:{ seconds }</p>
    </section>
    )
}

export default Timer;