import {Action, isAction} from "participant/src/action";
import {ActionHandler} from "participant/src/participant";
import {changeMessage, stateChanged} from "../../actions";

export type Reducer<S, E> = (state: S, event: E) => S


export const createStateStore = (initialState: AppState, reducer: Reducer<AppState, Action>): ActionHandler => {
    let state = initialState

    return (event: Action) => {
        const newState = reducer(state, event)
        if(newState !== state) {
            state = newState
            return stateChanged({ state })
        }
    }
}


export interface AppState {
    message: string
}

export const initialState: AppState = {
    message: "INITIAL_STATE"
}

export const reducer = (state: AppState, action: Action) => {
    if(isAction(changeMessage, action)) {
        return {
            ...state,
            message: action.message
        }
    }

    return state
}
