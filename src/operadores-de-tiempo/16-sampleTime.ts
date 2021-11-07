import { fromEvent } from "rxjs";
import { map, sampleTime } from 'rxjs/operators';

const click$ = fromEvent<MouseEvent>(document, 'click');

click$.pipe(
    // el operador sampleTime espera un tiempo antes de emitir el siguiente valor
    sampleTime(5000),
    map(({x, y}) => ({x, y})),
)
.subscribe(console.log);