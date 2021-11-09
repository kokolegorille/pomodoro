import React from "react";

import { usePomodoro } from "../hooks/usePomodoro";

const Actions = () => {
    const { state, actions } = usePomodoro()

    return (
    <section className="flex">
        <button onClick={actions.play} disabled={state.status === 'PLAY'}>Play</button>
        <button onClick={actions.pause} disabled={state.status !== 'PLAY'}>Stop</button>
        <button onClick={actions.skip}>Skip</button>
        <button onClick={actions.refresh}>Refresh</button>
    </section>
    )
}

export default Actions
