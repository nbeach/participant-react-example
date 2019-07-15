import {createActionFactory} from "participant";
import {AppState} from "./participant/state/store";

export interface StateChangedAction {
    state: AppState
}

export const stateChanged = createActionFactory<StateChangedAction>("STATE_CHANGED")


export interface ButtonClickedAction {
}

export const buttonClicked = createActionFactory<ButtonClickedAction>("BUTTON_CLICKED")


export interface ChangeMessageAction {
    message: string
}

export const changeMessage = createActionFactory<ChangeMessageAction>("CHANGE_MESSAGE")
