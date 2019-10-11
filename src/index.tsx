import './index.css';
import * as serviceWorker from './serviceWorker';
import {createParticipantGroup} from "participant/src/participant";
import {webWorkerParticipant} from "participant/src/worker";
import {uiParticipant} from "./participant/ui/uiParticipant";

const stateParticipant  = webWorkerParticipant(new Worker("./participant/state/stateParticipant.worker.ts"))
const clickHandlerParticipant = webWorkerParticipant(new Worker("./participant/clickHandlerParticipant.worker.ts"))

createParticipantGroup([
    uiParticipant,
    clickHandlerParticipant,
    stateParticipant,
])

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
