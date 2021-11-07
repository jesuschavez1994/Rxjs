import { fromEvent } from "rxjs";
import { auditTime, tap, map } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>(document, 'click');

click$.pipe(
    map(({x, y}) => ({x, y})),
    tap(val => console.log('tap', val)),
    // el operador auditTime espera el tiempo que le pasemos como parametro
    // para emitir el ultimo valor
    auditTime(5000)
)
.subscribe(console.log);