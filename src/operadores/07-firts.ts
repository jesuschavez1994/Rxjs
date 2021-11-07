import { fromEvent } from "rxjs";
import { first, tap, map } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>(document, 'click');

click$.pipe(
    tap<MouseEvent>(() => console.log('tap')),
    map( ({clientX, clientY}) => ( { clientX, clientY} ) ),
    // el operador first solo va a emitir el primer valor que cumpla la condicion
    first( event => event.clientY >= 150 )
)
.subscribe(
    next => console.log('next', next),
    null,
    () => console.log('completed')
);