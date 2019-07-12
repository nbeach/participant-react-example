import React from "react";
import {Dispatch} from "participant"
import {ActionHandler} from "participant/src/participant";
import {isAction} from "participant/src/action";
import {AppState} from "./store";
import {buttonClicked, stateChanged} from "./actions";

interface MessageComponentProps {
    dispatch: Dispatch
    onAction: (actionHandler: ActionHandler) => void
}

export class MessageComponent extends React.Component<MessageComponentProps, AppState> {

    constructor(props: MessageComponentProps) {
        super(props);
        this.state = ({
            message: "COMPONENT_STATE"
        })

        props.onAction(action => {
            if(isAction(stateChanged, action)) {
                this.setState(action.state)
            }
        })
    }


    render() {
        console.log(this.state.message)
        return <div>
            <h1>{this.state.message}</h1>
            <button onClick={() => this.props.dispatch(buttonClicked({}))}>Click Me</button>
        </div>
    }
}
