import './index.css';
import * as serviceWorker from './serviceWorker';
import {createParticipantGroup} from "participant/src/participant";
import {webWorkerParticipant} from "participant/src/worker";
import {uiParticipant} from "./participant/ui/uiParticipant";

createParticipantGroup([
    uiParticipant,
    webWorkerParticipant('stateParticipant.js'),
    webWorkerParticipant('clickHandlerParticipant.js'),
])


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
