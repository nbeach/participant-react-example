import {initWorkerParticipant} from "participant/src/worker";
import {changeMessage} from "../actions";
import {asParticipant} from "participant";

initWorkerParticipant(asParticipant(action => {
        if(action.type === "BUTTON_CLICKED") {
            return changeMessage({message: `YOUR NUMBER IS ${Math.random()}`})
        }

        return
    }
))
