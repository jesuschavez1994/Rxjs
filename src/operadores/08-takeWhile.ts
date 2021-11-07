import { fromEvent } from "rxjs";
import { map, takeWhile } from "rxjs/operators";

const click$ = fromEvent<MouseEvent>(document, 'click');

click$.pipe(
    map(({x, y}) => ({x, y})),
    // el takeWhile es un operador que funciona mientras se cumplesu condicion, en este caso
    //podemos obtener el ultimo valor que rompe la condicion agregando la condicional true
    takeWhile(({y}) => y <= 150, true)
)
.subscribe({
    next: val => console.log('next:', val),
    complete: () => console.log('complete')
})