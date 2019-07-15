import {ActionHandler, Participant} from "participant/src/participant";
import ReactDOM from "react-dom";
import React from "react";
import {MessageComponent} from "./component/MessageComponent";

export const uiParticipant: Participant = (dispatch => {
    let actionHandler: ActionHandler | null = null;
    const handle = (handler: ActionHandler) => {actionHandler = handler}
    ReactDOM.render(<MessageComponent dispatch={dispatch} onAction={handle}/>, document.getElementById('root'));

    return event => {
        if(actionHandler !== null) {
            actionHandler(event)
        }
    }
})
