import React from "react"
import { CircularProgressbar } from 'react-circular-progressbar'

import { usePomodoro } from "../hooks/usePomodoro"

const Timer = () => {
    const { state } = usePomodoro()

    const seconds = state.timerSeconds === 0 ? '00' : 
        state.timerSeconds < 10 ? 
            `0${state.timerSeconds}` : state.timerSeconds

    const color = state.inSession ? 'red' : 'green'
    const styles = {
        path: { stroke: color },
        text: { fill: color },
    }

    const totalTimeInSeconds = state.inSession ? 
        60 * state.sessionLength : 
        60 * state.breakInterval

    const elapsed = 60 * state.timerMinutes + state.timerSeconds
    const percentage = (totalTimeInSeconds - elapsed) / totalTimeInSeconds * 100;

    return (
    <>
        <section className="timer flex flex-column" style={{ color }}>
            <h4>{ state.inSession ? 'Working Session' : 'Break Time!' }</h4>
            <CircularProgressbar 
                styles={styles}
                value={percentage} 
                text={`${state.timerMinutes}:${seconds}`} />
        </section>
        <p>Completed : {state.sessionCount}</p>
    </>
    )
}

export default Timer;