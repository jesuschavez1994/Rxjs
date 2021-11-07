import { asyncScheduler, fromEvent } from "rxjs";
import { pluck, distinctUntilChanged, throttleTime } from 'rxjs/operators';

const input = document.createElement("input");
document.querySelector("body").appendChild(input);

const keyups = fromEvent<KeyboardEvent>(input, "keyup");
keyups.pipe(
    // el operador  throttleTime espera un tiempo antes de emitir el siguiente valor
    // con esta configuracion el throttleTime captura el primer valor y pasado los 2 segundos muestra la secuencia 
    // escrita en el campo de texto
    throttleTime(2000, asyncScheduler, {
        leading: true,
        trailing: true
    }),
    // capturamos el valor del input
    pluck<KeyboardEvent, string>("target", "value"),
    // filtramos los valores que no sean iguales
    distinctUntilChanged(),
)
.subscribe(console.log);