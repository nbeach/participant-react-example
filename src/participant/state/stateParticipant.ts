import {Participant} from "participant/src/participant";
import {stateChanged} from "../../actions";
import {createStateStore, initialState, reducer} from "./store";

export const stateParticipant: Participant = dispatch => {
    dispatch(stateChanged({ state: initialState}))
    return event => createStateStore(initialState, reducer)(event)
}
