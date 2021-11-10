import React, { createContext, useContext, useReducer, useEffect } from 'react';

const PomodoroContext = createContext();

const INIT = 'INIT'
const PLAY = 'PLAY'
const PAUSE = 'PAUSE'
const SKIP = 'SKIP'
const REFRESH = 'REFRESH'
const TICK = 'TICK'

const UP_BREAK_INTERVAL = 'UP_BREAK_INTERVAL'
const DOWN_BREAK_INTERVAL = 'DOWN_BREAK_INTERVAL'
const UP_SESSION_LENGTH = 'UP_SESSION_LENGTH'
const DOWN_SESSION_LENGTH = 'DOWN_SESSION_LENGTH'

// In minutes
const MIN = 1
const MAX = 59
const BREAK = 5
const SESSION = 25

const defaultState = {
    sessionCount: 0,
    breakInterval: BREAK,
    sessionLength: SESSION,
    timerMinutes: SESSION,
    timerSeconds: 0,
    // in working session, or in break
    inSession: true,
    status: INIT,
}

const reducer = (state, action) => {
    let newState
    let newBreakInterval, newSessionLength
    switch (action.type) {
        case PLAY:
            newState = {
                ...state,
                status: PLAY,
            }
            break
        case PAUSE:
            newState = {
                ...state,
                status: PAUSE,
            }
            break
        case SKIP:
            // Skip to the next state
            const inSession = !state.inSession
            newState = {
                ...state,
                inSession,
                timerMinutes: inSession ? state.sessionLength : state.breakInterval,
                timerSeconds: 0,
            }
            break
        case REFRESH:
            newState = {
                ...state,
                status: INIT,
                timerMinutes: state.sessionLength,
                timerSeconds: 0,
                sessionCount: 0,
            }
            break
        case TICK:
            // console.log('tick...')
            const seconds = state.timerSeconds === 0 ? 59 : state.timerSeconds - 1
            const minutes = seconds === 59 ? state.timerMinutes - 1 : state.timerMinutes
            if(minutes === 0 && seconds === 0) {
                // set new conditional timerMinutes
                // set timerSeconds to 0
                // toggle inSession
                // maybe increment sessionCount
                const inSession = !state.inSession
                newState = {
                    ...state,
                    inSession,
                    timerMinutes: inSession ? 
                        state.sessionLength : 
                        state.breakInterval,
                    timerSeconds: 0,
                    sessionCount: inSession ? 
                        state.sessionCount :
                        state.sessionCount + 1
                }
            } else {
                newState = {
                    ...state,
                    timerMinutes: minutes,
                    timerSeconds: seconds,
                }
            }
            break
        case UP_BREAK_INTERVAL:
            newBreakInterval = Math.min(state.breakInterval + 1, MAX)
            newState = {
                ...state,
                breakInterval: newBreakInterval,
            }
            break
        case DOWN_BREAK_INTERVAL:
            newBreakInterval = Math.max(state.breakInterval - 1, MIN)
            newState = {
                ...state,
                breakInterval: newBreakInterval,
            }
            break
        case UP_SESSION_LENGTH:
            newSessionLength = Math.min(state.sessionLength + 1, MAX)
            newState = {
                ...state,
                sessionLength: newSessionLength,
                timerMinutes: state.status === 'INIT' ? 
                    newSessionLength : 
                    state.timerMinutes
            }
            break
        case DOWN_SESSION_LENGTH:
            newSessionLength = Math.max(state.sessionLength - 1, MIN)
            newState = {
                ...state,
                sessionLength: newSessionLength,
                timerMinutes: state.status === 'INIT' ? 
                    newSessionLength : 
                    state.timerMinutes
            }
            break
        default: 
            newState = Object.assign({}, state)
    }
    // console.log(state, action.type, newState)
    return newState
}

const pomodoroReducer = (initialState = defaultState) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const play = () => dispatch({ type: PLAY })
    const pause = () => dispatch({ type: PAUSE })
    const refresh = () => dispatch({ type: REFRESH })
    const skip = () => dispatch({ type: SKIP })
    const tick = () => dispatch({ type: TICK })

    const upBreakInterval = () => dispatch({ type: UP_BREAK_INTERVAL })
    const downBreakInterval = () => dispatch({ type: DOWN_BREAK_INTERVAL })
    const upSessionLength = () => dispatch({ type: UP_SESSION_LENGTH })
    const downSessionLength = () => dispatch({ type: DOWN_SESSION_LENGTH })

    const actions = { 
        play, pause, refresh, skip, tick,
        upBreakInterval, downBreakInterval,
        upSessionLength, downSessionLength,
    }
    return { state, actions }
}

const PomodoroProvider = ({ children }) => {
    const { state, actions } = pomodoroReducer()

    useEffect(() => {
        if(state.status === 'PLAY') {
            let interval = setInterval(actions.tick, 1000)
            return () => clearInterval(interval)
        }
    }, [state.inSession, state.status])

    return (
        <PomodoroContext.Provider value={{ state, actions }}>
            { children }
        </PomodoroContext.Provider>
    )
}

export default PomodoroProvider;

export const usePomodoro = () => useContext(PomodoroContext)