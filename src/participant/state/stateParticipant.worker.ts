import {stateChanged} from "../../actions";
import {createStateStore, initialState, reducer} from "./store";
import {initWorkerParticipant} from "participant";

initWorkerParticipant(dispatch => {
    dispatch(stateChanged({ state: initialState}))
    return event => createStateStore(initialState, reducer)(event)
})
