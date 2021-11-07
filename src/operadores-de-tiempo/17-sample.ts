import { fromEvent, interval } from "rxjs";
import { sample } from "rxjs/operators";


const interval$ = interval(1000);
const click$ = fromEvent(document, 'click');

interval$.pipe(
    // el operador sample toma el valor del observable cuando se produce un evento
    sample(click$)
)
.subscribe(console.log);