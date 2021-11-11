import React, { createContext, useContext, useReducer, useEffect } from 'react';

const PomodoroContext = createContext();

const INIT = 'INIT'
const PLAY = 'PLAY'
const PAUSE = 'PAUSE'
const SKIP = 'SKIP'
const REFRESH = 'REFRESH'
const TICK = 'TICK'

// Set values
const SET_BREAK_INTERVAL = 'SET_BREAK_INTERVAL'
const SET_SESSION_LENGTH = 'SET_SESSION_LENGTH'

// In minutes

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
                inSession: true,
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

        case SET_BREAK_INTERVAL:
            newState = {
                ...state,
                breakInterval: action.payload,
            }
            break

        case SET_SESSION_LENGTH:
            newState = {
                ...state,
                sessionLength: action.payload,
                timerMinutes: state.status === 'INIT' ? 
                    action.payload : state.timerMinutes
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

    const setBreakInterval = payload => dispatch({ type: SET_BREAK_INTERVAL, payload })
    const setSessionLength = payload => dispatch({ type: SET_SESSION_LENGTH, payload })

    const actions = { 
        play, pause, refresh, skip, tick,
        setBreakInterval, setSessionLength,
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