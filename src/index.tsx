import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {ActionHandler, createParticipantGroup, Participant, Reaction} from "participant/src/participant";
import {createStateStore, initialState, reducer} from "./store";
import {MessageComponent} from "./MessageComponent";
import {webWorkerParticipant} from "participant/src/worker";
import {stateChanged} from "./actions";

const uiParticipant: Participant = (dispatch => {
    let actionHandler: ActionHandler | null = null;
    const handle = (handler: ActionHandler) => {actionHandler = handler}
    ReactDOM.render(<MessageComponent dispatch={dispatch} onAction={handle}/>, document.getElementById('root'));

    return event => {
        if(actionHandler !== null) {
            actionHandler(event)
        }
    }
})

const storeParticipant: Participant = dispatch => {
    dispatch(stateChanged({ state: initialState}))
    return event => createStateStore(initialState, reducer)(event)
}

const functionAsUrl = (func: any): string => {
    return URL.createObjectURL(new Blob([`(${func})()`]))
}

declare const self: Window
function clickHandlerParticipant() {
    const participant: Participant = (dispatch) => {

        return action => {
            if(action.type === "BUTTON_CLICKED") {
                return Promise.resolve({ type: "CHANGE_MESSAGE", message: "BUTTON_CLICKED"})
            }

            return
        }
    }

    const initWorkerParticipant = (participant: Participant) => {
        const sendMessage = (reaction: Reaction) => self.postMessage(reaction, undefined as any)

        const dispatch = (action: Reaction | Promise<Reaction>) => {
            if (action && (action as any).then !== undefined) {
                (action as any).then(sendMessage)
            } else if (action) {
                sendMessage(action as any)
            }
        }

        const handler = participant(dispatch)
        if (handler !== undefined) {
            self.addEventListener("message", (event) => {
                dispatch(handler(event.data))
            }, false)
        }
    }

    initWorkerParticipant(participant)

}

createParticipantGroup([
    storeParticipant,
    uiParticipant,
    webWorkerParticipant(functionAsUrl(clickHandlerParticipant)),
])



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
