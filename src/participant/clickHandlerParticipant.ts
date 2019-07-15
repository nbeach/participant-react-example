import {initWorkerParticipant} from "participant/src/worker";
import {asParticipant} from "participant/src/participant";

initWorkerParticipant(asParticipant(action => {
        if(action.type === "BUTTON_CLICKED") {
            return Promise.resolve({ type: "CHANGE_MESSAGE", message: "BUTTON_CLICKED"})
        }

        return
    }
))
