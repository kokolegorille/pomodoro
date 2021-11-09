import React from "react";

import PomodoroProvider from "./hooks/usePomodoro";

// Top
import BreakInterval from "./components/BreakInterval";
import SessionLength from "./components/SessionLength";
import Timer from "./components/Timer";
import Actions from "./components/Actions";

// Middle

// Bottom

const App = () => {
    return (
        <main className="pomodoro roboto">
            <h1>Pomodoro Clock</h1>

            <PomodoroProvider>
                <div className="flex">
                    <BreakInterval />
                    <SessionLength />
                </div>
                <Timer />
                <Actions />
            </PomodoroProvider>
        </main>

    )
}

export default App;